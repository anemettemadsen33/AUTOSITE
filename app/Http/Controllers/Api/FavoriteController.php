<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FavoriteController extends Controller
{
    /**
     * Get all favorites for authenticated user
     */
    public function index(Request $request): JsonResponse
    {
        $favorites = $request->user()
            ->favorites()
            ->with('vehicle.user', 'vehicle.dealer')
            ->latest()
            ->get()
            ->map(fn($fav) => $fav->vehicle);

        return response()->json([
            'data' => $favorites,
        ]);
    }

    /**
     * Toggle favorite (add if not exists, remove if exists)
     */
    public function toggle(Request $request): JsonResponse
    {
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
        ]);

        $user = $request->user();
        $vehicleId = $request->vehicle_id;

        $favorite = Favorite::where('user_id', $user->id)
            ->where('vehicle_id', $vehicleId)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json([
                'message' => 'Vehicle removed from favorites',
                'is_favorited' => false,
            ]);
        }

        Favorite::create([
            'user_id' => $user->id,
            'vehicle_id' => $vehicleId,
        ]);

        return response()->json([
            'message' => 'Vehicle added to favorites',
            'is_favorited' => true,
        ]);
    }

    /**
     * Check if vehicle is favorited
     */
    public function check(Request $request, int $vehicleId): JsonResponse
    {
        $isFavorited = Favorite::where('user_id', $request->user()->id)
            ->where('vehicle_id', $vehicleId)
            ->exists();

        return response()->json([
            'is_favorited' => $isFavorited,
        ]);
    }
}
