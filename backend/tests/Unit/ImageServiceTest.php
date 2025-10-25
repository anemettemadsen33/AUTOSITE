<?php

namespace Tests\Unit;

use App\Services\ImageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageServiceTest extends TestCase
{
    protected ImageService $imageService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->imageService = new ImageService();
        Storage::fake('public');
    }

    /**
     * Test that service validates allowed extensions
     */
    public function test_validates_allowed_extensions(): void
    {
        // Valid extensions
        $validFile = UploadedFile::fake()->image('test.jpg');
        $this->assertTrue($this->imageService->validateImage($validFile));

        $validFile2 = UploadedFile::fake()->image('test.png');
        $this->assertTrue($this->imageService->validateImage($validFile2));

        // Invalid extension
        $invalidFile = UploadedFile::fake()->create('test.gif', 100);
        $this->assertFalse($this->imageService->validateImage($invalidFile));
    }

    /**
     * Test that service rejects oversized files
     */
    public function test_rejects_oversized_files(): void
    {
        // File larger than 10MB
        $largeFile = UploadedFile::fake()->create('large.jpg', 11000); // 11MB
        $this->assertFalse($this->imageService->validateImage($largeFile));
    }

    /**
     * Test image processing creates multiple sizes
     */
    public function test_processes_image_into_multiple_sizes(): void
    {
        $file = UploadedFile::fake()->image('test.jpg', 2000, 2000);
        
        $paths = $this->imageService->processImage($file);

        // Should have thumb, medium, and large
        $this->assertArrayHasKey('thumb', $paths);
        $this->assertArrayHasKey('medium', $paths);
        $this->assertArrayHasKey('large', $paths);

        // Check files exist
        foreach ($paths as $path) {
            Storage::disk('public')->assertExists($path);
        }
    }

    /**
     * Test that WebP conversion is created
     */
    public function test_creates_webp_versions(): void
    {
        $file = UploadedFile::fake()->image('test.jpg', 1000, 1000);
        
        $paths = $this->imageService->processImage($file);

        // All paths should be WebP
        foreach (['thumb', 'medium', 'large'] as $size) {
            $this->assertStringEndsWith('.webp', $paths[$size]);
        }
    }

    /**
     * Test that allowed extensions are correctly defined
     */
    public function test_allowed_extensions_are_correct(): void
    {
        $allowed = ImageService::getAllowedExtensions();
        
        $this->assertContains('jpg', $allowed);
        $this->assertContains('jpeg', $allowed);
        $this->assertContains('png', $allowed);
        $this->assertContains('webp', $allowed);
        $this->assertCount(4, $allowed);
    }
}
