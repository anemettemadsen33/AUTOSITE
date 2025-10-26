<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleImageController extends Controller
{
    /**
     * Get all images for a vehicle
     */
    public function index(Vehicle $vehicle): JsonResponse
    {
        $images = $vehicle->getMedia('images')->map(function ($media) {
            return [
                'id' => $media->id,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'size' => $media->size,
                'mime_type' => $media->mime_type,
                'url' => $media->getUrl(),
                'thumbnail' => $media->getUrl('thumb'),
                'created_at' => $media->created_at,
            ];
        });

        return response()->json([
            'data' => $images,
        ]);
    }

    /**
     * Upload new images to a vehicle
     */
    public function store(Request $request, Vehicle $vehicle): JsonResponse
    {
        // Check if user owns the vehicle
        if ($vehicle->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'images' => 'required|array|max:10',
            'images.*' => 'required|image|mimes:jpeg,jpg,png,webp|max:5120', // Max 5MB per image
        ]);

        $uploadedImages = [];

        foreach ($request->file('images') as $image) {
            $media = $vehicle->addMedia($image)
                ->toMediaCollection('images');

            $uploadedImages[] = [
                'id' => $media->id,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'url' => $media->getUrl(),
                'thumbnail' => $media->getUrl('thumb'),
            ];
        }

        return response()->json([
            'message' => 'Images uploaded successfully',
            'data' => $uploadedImages,
        ], 201);
    }

    /**
     * Delete a specific image
     */
    public function destroy(Request $request, Vehicle $vehicle, int $mediaId): JsonResponse
    {
        // Check if user owns the vehicle
        if ($vehicle->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $media = $vehicle->getMedia('images')->find($mediaId);

        if (!$media) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $media->delete();

        return response()->json([
            'message' => 'Image deleted successfully',
        ]);
    }

    /**
     * Reorder images
     */
    public function reorder(Request $request, Vehicle $vehicle): JsonResponse
    {
        // Check if user owns the vehicle
        if ($vehicle->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'order' => 'required|array',
            'order.*' => 'required|integer|exists:media,id',
        ]);

        $media = $vehicle->getMedia('images');
        
        foreach ($request->order as $index => $mediaId) {
            $item = $media->find($mediaId);
            if ($item) {
                $item->order_column = $index;
                $item->save();
            }
        }

        return response()->json([
            'message' => 'Images reordered successfully',
        ]);
    }
}
