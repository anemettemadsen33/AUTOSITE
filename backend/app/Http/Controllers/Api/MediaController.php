<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class MediaController extends Controller
{
    /**
     * Upload multiple images for a vehicle
     */
    public function uploadVehicleImages(Request $request, Vehicle $vehicle)
    {
        $request->validate([
            'images' => 'required|array|max:20',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:10240', // 10MB max
        ]);

        $uploadedImages = [];

        foreach ($request->file('images') as $index => $image) {
            // Add to media library
            $media = $vehicle->addMedia($image)
                ->usingFileName(uniqid() . '.' . $image->getClientOriginalExtension())
                ->toMediaCollection('images');

            $uploadedImages[] = [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'thumbnail' => $media->getUrl('thumb'),
                'order' => $index,
            ];
        }

        return response()->json([
            'message' => 'Images uploaded successfully',
            'images' => $uploadedImages,
        ]);
    }

    /**
     * Delete a vehicle image
     */
    public function deleteVehicleImage(Vehicle $vehicle, $mediaId)
    {
        $media = $vehicle->getMedia('images')->where('id', $mediaId)->first();

        if (!$media) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $media->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }

    /**
     * Reorder vehicle images
     */
    public function reorderVehicleImages(Request $request, Vehicle $vehicle)
    {
        $request->validate([
            'order' => 'required|array',
            'order.*' => 'integer|exists:media,id',
        ]);

        foreach ($request->order as $index => $mediaId) {
            $vehicle->getMedia('images')
                ->where('id', $mediaId)
                ->first()
                ?->setCustomProperty('order', $index)
                ->save();
        }

        return response()->json(['message' => 'Images reordered successfully']);
    }

    /**
     * Upload dealer logo
     */
    public function uploadDealerLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
        ]);

        $dealer = $request->user()->dealer;

        if (!$dealer) {
            return response()->json(['message' => 'Dealer not found'], 404);
        }

        // Delete old logo
        $dealer->clearMediaCollection('logo');

        // Add new logo
        $media = $dealer->addMedia($request->file('logo'))
            ->usingFileName('logo-' . $dealer->id . '.' . $request->file('logo')->getClientOriginalExtension())
            ->toMediaCollection('logo');

        return response()->json([
            'message' => 'Logo uploaded successfully',
            'logo' => [
                'url' => $media->getUrl(),
                'thumbnail' => $media->getUrl('thumb'),
            ],
        ]);
    }

    /**
     * Upload user avatar
     */
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = $request->user();

        // Delete old avatar
        $user->clearMediaCollection('avatar');

        // Add new avatar
        $media = $user->addMedia($request->file('avatar'))
            ->usingFileName('avatar-' . $user->id . '.' . $request->file('avatar')->getClientOriginalExtension())
            ->toMediaCollection('avatar');

        return response()->json([
            'message' => 'Avatar uploaded successfully',
            'avatar' => [
                'url' => $media->getUrl(),
                'thumbnail' => $media->getUrl('thumb'),
            ],
        ]);
    }

    /**
     * Get vehicle images
     */
    public function getVehicleImages(Vehicle $vehicle)
    {
        $images = $vehicle->getMedia('images')->map(function ($media) {
            return [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'thumbnail' => $media->getUrl('thumb'),
                'order' => $media->getCustomProperty('order', 0),
            ];
        })->sortBy('order')->values();

        return response()->json(['images' => $images]);
    }
}
