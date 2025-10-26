<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TestDriveAppointment;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestDriveAppointmentController extends Controller
{
    /**
     * Display a listing of appointments for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $query = TestDriveAppointment::query()
            ->with(['vehicle', 'dealer'])
            ->where(function ($q) use ($request) {
                $q->where('user_id', $request->user()->id)
                  ->orWhere('dealer_id', $request->user()->id);
            });

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $appointments = $query->orderBy('appointment_date', 'desc')->get();

        return response()->json([
            'data' => $appointments,
        ]);
    }

    /**
     * Store a newly created appointment.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'appointment_date' => 'required|date|after:now',
            'preferred_time' => 'nullable|string|max:255',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'message' => 'nullable|string',
        ]);

        $vehicle = Vehicle::findOrFail($validated['vehicle_id']);
        
        $appointment = TestDriveAppointment::create([
            'user_id' => $request->user()->id,
            'vehicle_id' => $validated['vehicle_id'],
            'dealer_id' => $vehicle->user_id,
            'appointment_date' => $validated['appointment_date'],
            'preferred_time' => $validated['preferred_time'] ?? null,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'message' => $validated['message'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'data' => $appointment->load(['vehicle', 'dealer']),
            'message' => 'Test drive appointment created successfully',
        ], 201);
    }

    /**
     * Display the specified appointment.
     */
    public function show(Request $request, TestDriveAppointment $appointment): JsonResponse
    {
        // Check if user has permission to view this appointment
        if ($appointment->user_id !== $request->user()->id && 
            $appointment->dealer_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'data' => $appointment->load(['vehicle', 'dealer', 'user']),
        ]);
    }

    /**
     * Update the specified appointment.
     */
    public function update(Request $request, TestDriveAppointment $appointment): JsonResponse
    {
        // Check if user has permission to update this appointment
        if ($appointment->user_id !== $request->user()->id && 
            $appointment->dealer_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'appointment_date' => 'sometimes|date|after:now',
            'preferred_time' => 'nullable|string|max:255',
            'customer_name' => 'sometimes|string|max:255',
            'customer_email' => 'sometimes|email|max:255',
            'customer_phone' => 'sometimes|string|max:20',
            'message' => 'nullable|string',
            'dealer_notes' => 'nullable|string',
            'status' => 'sometimes|in:pending,confirmed,cancelled,completed',
        ]);

        $appointment->update($validated);

        return response()->json([
            'data' => $appointment->load(['vehicle', 'dealer']),
            'message' => 'Appointment updated successfully',
        ]);
    }

    /**
     * Remove the specified appointment.
     */
    public function destroy(Request $request, TestDriveAppointment $appointment): JsonResponse
    {
        // Only the customer can delete their appointment
        if ($appointment->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $appointment->delete();

        return response()->json([
            'message' => 'Appointment deleted successfully',
        ]);
    }

    /**
     * Confirm an appointment (dealer only).
     */
    public function confirm(Request $request, TestDriveAppointment $appointment): JsonResponse
    {
        // Only the dealer can confirm
        if ($appointment->dealer_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $appointment->confirm();

        return response()->json([
            'data' => $appointment->load(['vehicle', 'dealer']),
            'message' => 'Appointment confirmed successfully',
        ]);
    }

    /**
     * Cancel an appointment.
     */
    public function cancel(Request $request, TestDriveAppointment $appointment): JsonResponse
    {
        // Both customer and dealer can cancel
        if ($appointment->user_id !== $request->user()->id && 
            $appointment->dealer_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $appointment->cancel();

        return response()->json([
            'data' => $appointment->load(['vehicle', 'dealer']),
            'message' => 'Appointment cancelled successfully',
        ]);
    }

    /**
     * Mark appointment as completed (dealer only).
     */
    public function complete(Request $request, TestDriveAppointment $appointment): JsonResponse
    {
        // Only the dealer can mark as completed
        if ($appointment->dealer_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $appointment->complete();

        return response()->json([
            'data' => $appointment->load(['vehicle', 'dealer']),
            'message' => 'Appointment marked as completed',
        ]);
    }
}
