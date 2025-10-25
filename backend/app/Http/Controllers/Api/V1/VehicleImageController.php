<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class VehicleImageController extends Controller
{
    /**
     * Upload multiple images for a vehicle
     */
    public function upload(Request $request, Vehicle $vehicle)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array|max:10',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check authorization
        if ($vehicle->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $uploadedMedia = [];

        foreach ($request->file('images') as $image) {
            try {
                $media = $vehicle->addMedia($image)
                    ->toMediaCollection('images');
                
                $uploadedMedia[] = [
                    'id' => $media->id,
                    'uuid' => $media->uuid,
                    'name' => $media->name,
                    'file_name' => $media->file_name,
                    'mime_type' => $media->mime_type,
                    'size' => $media->size,
                    'url' => $media->getUrl(),
                    'thumb_url' => $media->getUrl('thumb'),
                    'large_url' => $media->getUrl('large'),
                ];
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Failed to upload image',
                    'error' => $e->getMessage(),
                ], 500);
            }
        }

        return response()->json([
            'message' => 'Images uploaded successfully',
            'data' => $uploadedMedia,
            'total_images' => count($uploadedMedia),
        ], 201);
    }

    /**
     * Get all images for a vehicle
     */
    public function index(Vehicle $vehicle)
    {
        $media = $vehicle->getMedia('images')->map(function ($item) {
            return [
                'id' => $item->id,
                'uuid' => $item->uuid,
                'name' => $item->name,
                'file_name' => $item->file_name,
                'mime_type' => $item->mime_type,
                'size' => $item->size,
                'order' => $item->order_column,
                'url' => $item->getUrl(),
                'thumb_url' => $item->getUrl('thumb'),
                'large_url' => $item->getUrl('large'),
                'created_at' => $item->created_at,
            ];
        });

        return response()->json([
            'data' => $media,
            'count' => $media->count(),
        ]);
    }

    /**
     * Delete a specific image
     */
    public function destroy(Vehicle $vehicle, $mediaId)
    {
        // Check authorization
        if ($vehicle->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $media = $vehicle->getMedia('images')->find($mediaId);

        if (!$media) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        try {
            $media->delete();

            return response()->json([
                'message' => 'Image deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete image',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Reorder images
     */
    public function reorder(Request $request, Vehicle $vehicle)
    {
        $validator = Validator::make($request->all(), [
            'order' => 'required|array',
            'order.*' => 'required|integer|exists:media,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check authorization
        if ($vehicle->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        try {
            $media = $vehicle->getMedia('images');

            foreach ($request->order as $index => $mediaId) {
                $item = $media->find($mediaId);
                if ($item) {
                    $item->order_column = $index + 1;
                    $item->save();
                }
            }

            return response()->json([
                'message' => 'Images reordered successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to reorder images',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Set primary image (first in order)
     */
    public function setPrimary(Request $request, Vehicle $vehicle, $mediaId)
    {
        // Check authorization
        if ($vehicle->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $media = $vehicle->getMedia('images')->find($mediaId);

        if (!$media) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        try {
            // Set this image as first (order 1)
            $media->order_column = 0;
            $media->save();

            // Reorder other images
            $allMedia = $vehicle->getMedia('images')->sortBy('order_column');
            $order = 1;
            foreach ($allMedia as $item) {
                if ($item->id !== $media->id) {
                    $item->order_column = $order++;
                    $item->save();
                }
            }

            return response()->json([
                'message' => 'Primary image set successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to set primary image',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Upload single image (alternative endpoint)
     */
    public function uploadSingle(Request $request, Vehicle $vehicle)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check authorization
        if ($vehicle->user_id !== auth()->id() && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        try {
            $media = $vehicle->addMedia($request->file('image'))
                ->toMediaCollection('images');

            return response()->json([
                'message' => 'Image uploaded successfully',
                'data' => [
                    'id' => $media->id,
                    'uuid' => $media->uuid,
                    'url' => $media->getUrl(),
                    'thumb_url' => $media->getUrl('thumb'),
                    'large_url' => $media->getUrl('large'),
                ],
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to upload image',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
