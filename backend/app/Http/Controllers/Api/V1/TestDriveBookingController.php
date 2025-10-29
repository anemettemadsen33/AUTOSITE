<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\TestDriveBooking;
use App\Models\Vehicle;
use App\Mail\TestDriveConfirmation;
use App\Notifications\TestDriveConfirmationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class TestDriveBookingController extends Controller
{
    /**
     * Book a test drive
     * 
     * POST /api/v1/test-drives
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'preferred_date' => 'required|date|after:today',
            'preferred_time' => 'required|date_format:H:i',
            'contact_name' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:20',
            'contact_email' => 'required|email|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Get vehicle and dealer
        $vehicle = Vehicle::with('dealer')->findOrFail($validated['vehicle_id']);
        
        // Check for booking conflicts (same vehicle, same date/time)
        $datetime = Carbon::parse($validated['preferred_date'])->format('Y-m-d') . ' ' . $validated['preferred_time'];
        $conflict = TestDriveBooking::where('vehicle_id', $validated['vehicle_id'])
            ->where('preferred_date', $datetime)
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($conflict) {
            return response()->json([
                'message' => 'This time slot is already booked. Please select a different time.',
                'error' => 'booking_conflict'
            ], 409);
        }

        // Create booking
        $booking = TestDriveBooking::create([
            'user_id' => Auth::id(),
            'vehicle_id' => $validated['vehicle_id'],
            'dealer_id' => $vehicle->dealer_id,
            'preferred_date' => $datetime,
            'preferred_time' => $validated['preferred_time'],
            'status' => 'pending',
            'contact_name' => $validated['contact_name'],
            'contact_phone' => $validated['contact_phone'],
            'contact_email' => $validated['contact_email'],
            'notes' => $validated['notes'] ?? null,
        ]);

        // Load relationships
        $booking->load(['vehicle', 'dealer', 'user']);

        // Send email notification to user
        if ($booking->user) {
            Mail::to($booking->user->email)
                ->queue(new TestDriveConfirmation($booking));
        }

        // Notify dealer (if dealer has notification settings)
        if ($vehicle->dealer && $vehicle->dealer->user) {
            $vehicle->dealer->user->notify(
                new TestDriveConfirmationNotification($booking)
            );
        }

        return response()->json([
            'message' => 'Test drive booked successfully. You will receive a confirmation email shortly.',
            'booking' => $booking
        ], 201);
    }

    /**
     * List user's test drive bookings
     * 
     * GET /api/v1/test-drives
     */
    public function index(Request $request)
    {
        $query = TestDriveBooking::with(['vehicle', 'dealer'])
            ->where('user_id', Auth::id());

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->has('from_date')) {
            $query->where('preferred_date', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->where('preferred_date', '<=', $request->to_date);
        }

        // Sort by date (newest first by default)
        $sortOrder = $request->get('sort', 'desc');
        $query->orderBy('preferred_date', $sortOrder);

        // Paginate results
        $perPage = $request->get('per_page', 15);
        $bookings = $query->paginate($perPage);

        return response()->json($bookings);
    }

    /**
     * Get specific booking details
     * 
     * GET /api/v1/test-drives/{id}
     */
    public function show($id)
    {
        $booking = TestDriveBooking::with(['vehicle', 'dealer', 'user'])
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json($booking);
    }

    /**
     * Reschedule a test drive booking
     * 
     * PUT /api/v1/test-drives/{id}
     */
    public function update(Request $request, $id)
    {
        $booking = TestDriveBooking::where('user_id', Auth::id())
            ->findOrFail($id);

        // Only allow rescheduling if status is pending or confirmed
        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return response()->json([
                'message' => 'Cannot reschedule a ' . $booking->status . ' booking.',
                'error' => 'invalid_status'
            ], 422);
        }

        $validated = $request->validate([
            'preferred_date' => 'required|date|after:today',
            'preferred_time' => 'required|date_format:H:i',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Check for conflicts with new datetime
        $datetime = Carbon::parse($validated['preferred_date'])->format('Y-m-d') . ' ' . $validated['preferred_time'];
        $conflict = TestDriveBooking::where('vehicle_id', $booking->vehicle_id')
            ->where('id', '!=', $booking->id)
            ->where('preferred_date', $datetime)
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($conflict) {
            return response()->json([
                'message' => 'This time slot is already booked. Please select a different time.',
                'error' => 'booking_conflict'
            ], 409);
        }

        // Update booking
        $booking->update([
            'preferred_date' => $datetime,
            'preferred_time' => $validated['preferred_time'],
            'notes' => $validated['notes'] ?? $booking->notes,
        ]);

        // Reload relationships
        $booking->load(['vehicle', 'dealer', 'user']);

        // Send rescheduling notification
        if ($booking->user) {
            Mail::to($booking->user->email)
                ->queue(new TestDriveConfirmation($booking, 'rescheduled'));
        }

        return response()->json([
            'message' => 'Test drive rescheduled successfully.',
            'booking' => $booking
        ]);
    }

    /**
     * Cancel a test drive booking
     * 
     * DELETE /api/v1/test-drives/{id}
     */
    public function destroy($id)
    {
        $booking = TestDriveBooking::where('user_id', Auth::id())
            ->findOrFail($id);

        // Only allow cancellation if status is pending or confirmed
        if (!in_array($booking->status, ['pending', 'confirmed'])) {
            return response()->json([
                'message' => 'Cannot cancel a ' . $booking->status . ' booking.',
                'error' => 'invalid_status'
            ], 422);
        }

        // Update status to cancelled instead of deleting
        $booking->update(['status' => 'cancelled']);

        // Send cancellation email
        if ($booking->user) {
            Mail::to($booking->user->email)
                ->queue(new TestDriveConfirmation($booking, 'cancelled'));
        }

        return response()->json([
            'message' => 'Test drive booking cancelled successfully.'
        ]);
    }

    /**
     * Get available time slots for a vehicle
     * 
     * GET /api/v1/vehicles/{vehicleId}/available-slots
     */
    public function availableSlots(Request $request, $vehicleId)
    {
        $vehicle = Vehicle::findOrFail($vehicleId);

        $validated = $request->validate([
            'date' => 'required|date|after:today',
        ]);

        $date = Carbon::parse($validated['date']);

        // Get all bookings for this vehicle on this date
        $bookedSlots = TestDriveBooking::where('vehicle_id', $vehicleId)
            ->whereDate('preferred_date', $date->format('Y-m-d'))
            ->whereIn('status', ['pending', 'confirmed'])
            ->pluck('preferred_time')
            ->toArray();

        // Generate time slots (9:00 AM to 6:00 PM, 1-hour intervals)
        $availableSlots = [];
        $workingHours = [
            '09:00', '10:00', '11:00', '12:00', 
            '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
        ];

        foreach ($workingHours as $time) {
            $availableSlots[] = [
                'time' => $time,
                'available' => !in_array($time, $bookedSlots)
            ];
        }

        return response()->json([
            'vehicle_id' => $vehicleId,
            'date' => $date->format('Y-m-d'),
            'slots' => $availableSlots,
            'booked_count' => count($bookedSlots),
            'available_count' => count($workingHours) - count($bookedSlots)
        ]);
    }
}
