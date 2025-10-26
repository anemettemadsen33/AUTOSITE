<?php

namespace App\Http\Controllers;

use App\Models\VehicleConfiguration;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VehicleConfigurationController extends Controller
{
    public function index()
    {
        $configurations = VehicleConfiguration::with(['vehicle', 'user'])
            ->when(Auth::check() && Auth::user()->role !== 'admin', function($query) {
                $query->where('user_id', Auth::id());
            })
            ->latest()
            ->paginate(20);

        return response()->json($configurations);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'exterior_color' => 'nullable|string|max:50',
            'interior_color' => 'nullable|string|max:50',
            'wheels' => 'nullable|string|max:50',
            'options' => 'nullable|array',
            'total_price' => 'nullable|numeric|min:0',
            'session_id' => 'nullable|string',
        ]);

        $validated['user_id'] = Auth::id();

        $configuration = VehicleConfiguration::create($validated);

        return response()->json([
            'message' => 'Configuration saved successfully',
            'configuration' => $configuration->load('vehicle'),
        ], 201);
    }

    public function show(VehicleConfiguration $vehicleConfiguration)
    {
        if (Auth::check() && Auth::user()->role !== 'admin' && $vehicleConfiguration->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($vehicleConfiguration->load(['vehicle', 'user']));
    }

    public function update(Request $request, VehicleConfiguration $vehicleConfiguration)
    {
        if (Auth::check() && Auth::user()->role !== 'admin' && $vehicleConfiguration->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'exterior_color' => 'nullable|string|max:50',
            'interior_color' => 'nullable|string|max:50',
            'wheels' => 'nullable|string|max:50',
            'options' => 'nullable|array',
            'total_price' => 'nullable|numeric|min:0',
        ]);

        $vehicleConfiguration->update($validated);

        return response()->json([
            'message' => 'Configuration updated successfully',
            'configuration' => $vehicleConfiguration->load('vehicle'),
        ]);
    }

    public function destroy(VehicleConfiguration $vehicleConfiguration)
    {
        if (Auth::check() && Auth::user()->role !== 'admin' && $vehicleConfiguration->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $vehicleConfiguration->delete();

        return response()->json(['message' => 'Configuration deleted successfully']);
    }

    public function getOptions(Vehicle $vehicle)
    {
        return response()->json([
            'exterior_colors' => ['Black', 'White', 'Silver', 'Red', 'Blue', 'Gray'],
            'interior_colors' => ['Black', 'Beige', 'Brown', 'Gray'],
            'wheels' => ['18" Standard', '19" Sport', '20" Premium', '21" Performance'],
            'additional_options' => [
                'Sunroof',
                'Navigation System',
                'Premium Audio',
                'Leather Seats',
                'Heated Seats',
                'Parking Sensors',
                'Backup Camera',
                'Adaptive Cruise Control',
            ],
        ]);
    }
}
