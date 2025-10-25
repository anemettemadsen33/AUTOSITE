<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $favorites = Favorite::with(['vehicle.dealer', 'vehicle.images'])
            ->where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(function ($favorite) {
                return [
                    'id' => $favorite->id,
                    'vehicle' => $favorite->vehicle,
                    'created_at' => $favorite->created_at,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $favorites
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id'
        ]);

        $user = Auth::user();
        
        // Check if already favorited
        $exists = Favorite::where('user_id', $user->id)
            ->where('vehicle_id', $request->vehicle_id)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Vehicle already in favorites'
            ], 400);
        }

        $favorite = Favorite::create([
            'user_id' => $user->id,
            'vehicle_id' => $request->vehicle_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Vehicle added to favorites',
            'data' => $favorite
        ], 201);
    }

    public function destroy($vehicleId)
    {
        $user = Auth::user();
        
        $favorite = Favorite::where('user_id', $user->id)
            ->where('vehicle_id', $vehicleId)
            ->first();

        if (!$favorite) {
            return response()->json([
                'success' => false,
                'message' => 'Favorite not found'
            ], 404);
        }

        $favorite->delete();

        return response()->json([
            'success' => true,
            'message' => 'Vehicle removed from favorites'
        ]);
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id'
        ]);

        $user = Auth::user();
        
        $favorite = Favorite::where('user_id', $user->id)
            ->where('vehicle_id', $request->vehicle_id)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json([
                'success' => true,
                'is_favorited' => false,
                'message' => 'Vehicle removed from favorites'
            ]);
        } else {
            Favorite::create([
                'user_id' => $user->id,
                'vehicle_id' => $request->vehicle_id,
            ]);
            return response()->json([
                'success' => true,
                'is_favorited' => true,
                'message' => 'Vehicle added to favorites'
            ], 201);
        }
    }

    public function check($vehicleId)
    {
        $user = Auth::user();
        
        $isFavorited = Favorite::where('user_id', $user->id)
            ->where('vehicle_id', $vehicleId)
            ->exists();

        return response()->json([
            'success' => true,
            'is_favorited' => $isFavorited
        ]);
    }
}
