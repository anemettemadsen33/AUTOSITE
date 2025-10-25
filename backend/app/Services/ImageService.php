<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    private ImageManager $manager;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
    }

    /**
     * Allowed image extensions
     */
    private const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

    /**
     * Image sizes configuration
     */
    private const SIZES = [
        'thumb' => ['width' => 300, 'height' => 200],
        'medium' => ['width' => 800, 'height' => 600],
        'large' => ['width' => 1200, 'height' => 900],
    ];

    /**
     * Validate image file
     */
    public function validateImage(UploadedFile $file): bool
    {
        if (!$file->isValid()) {
            return false;
        }

        $extension = strtolower($file->getClientOriginalExtension());
        if (!in_array($extension, self::ALLOWED_EXTENSIONS)) {
            return false;
        }

        $mimeType = $file->getMimeType();
        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!in_array($mimeType, $allowedMimeTypes)) {
            return false;
        }

        if ($file->getSize() > 10 * 1024 * 1024) {
            return false;
        }

        return true;
    }

    /**
     * Process and optimize image
     */
    public function processImage(UploadedFile $file, string $directory = 'vehicles'): array
    {
        if (!$this->validateImage($file)) {
            throw new \InvalidArgumentException('Invalid image file');
        }

        $filename = Str::random(40);
        $paths = [];

        $image = $this->manager->read($file->getRealPath());

        foreach (self::SIZES as $size => $dimensions) {
            $resized = clone $image;
            
            $resized->scale(width: $dimensions['width'], height: $dimensions['height']);

            $path = "{$directory}/{$size}/{$filename}.webp";
            $webpData = $resized->toWebp(quality: 85);
            Storage::disk('public')->put($path, (string) $webpData);
            $paths[$size] = $path;

            $originalExt = strtolower($file->getClientOriginalExtension());
            if ($originalExt !== 'webp') {
                $originalPath = "{$directory}/{$size}/{$filename}.{$originalExt}";
                
                if ($originalExt === 'jpg' || $originalExt === 'jpeg') {
                    $originalData = $resized->toJpeg(quality: 85);
                    Storage::disk('public')->put($originalPath, (string) $originalData);
                } else if ($originalExt === 'png') {
                    $originalData = $resized->toPng();
                    Storage::disk('public')->put($originalPath, (string) $originalData);
                }
                
                if (isset($originalData)) {
                    $paths[$size . '_original'] = $originalPath;
                }
            }
        }

        return $paths;
    }

    /**
     * Get allowed extensions
     */
    public static function getAllowedExtensions(): array
    {
        return self::ALLOWED_EXTENSIONS;
    }
}
