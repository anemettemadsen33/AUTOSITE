<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['vehicle', 'dealer', 'user'])
            ->when(Auth::check() && Auth::user()->role !== 'admin', function($query) {
                $query->where('user_id', Auth::id())
                      ->orWhere('email', Auth::user()->email);
            })
            ->latest()
            ->paginate(20);

        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'dealer_id' => 'nullable|exists:dealers,id',
            'booking_type' => 'required|in:test_drive,viewing,service,consultation',
            'booking_date' => 'required|date|after:now',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'notes' => 'nullable|string|max:1000',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'pending';

        $booking = Booking::create($validated);

        // Send confirmation email
        try {
            // Mail::to($booking->email)->send(new BookingConfirmation($booking));
        } catch (\Exception $e) {
            // Log error but don't fail the booking
        }

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking->load(['vehicle', 'dealer']),
        ], 201);
    }

    public function show(Booking $booking)
    {
        if (Auth::check() && Auth::user()->role !== 'admin' && 
            $booking->user_id !== Auth::id() && 
            $booking->email !== Auth::user()->email) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($booking->load(['vehicle', 'dealer', 'user']));
    }

    public function update(Request $request, Booking $booking)
    {
        if (Auth::check() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed',
            'notes' => 'nullable|string|max:1000',
        ]);

        $booking->update($validated);

        return response()->json([
            'message' => 'Booking updated successfully',
            'booking' => $booking->load(['vehicle', 'dealer']),
        ]);
    }

    public function destroy(Booking $booking)
    {
        if (Auth::check() && Auth::user()->role !== 'admin' && 
            $booking->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $booking->delete();

        return response()->json(['message' => 'Booking cancelled successfully']);
    }

    public function getAvailableSlots(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'dealer_id' => 'nullable|exists:dealers,id',
        ]);

        $date = $validated['date'];
        $dealerId = $validated['dealer_id'] ?? null;

        $bookedSlots = Booking::whereDate('booking_date', $date)
            ->when($dealerId, function($query) use ($dealerId) {
                $query->where('dealer_id', $dealerId);
            })
            ->pluck('booking_date')
            ->map(function($dateTime) {
                return $dateTime->format('H:i');
            })
            ->toArray();

        $allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
        $availableSlots = array_diff($allSlots, $bookedSlots);

        return response()->json([
            'date' => $date,
            'available_slots' => array_values($availableSlots),
            'booked_slots' => $bookedSlots,
        ]);
    }
}
