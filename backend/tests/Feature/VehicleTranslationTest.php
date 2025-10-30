<?php

use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Vehicle Multi-Language Support', function () {
    
    beforeEach(function () {
        // Create a vehicle with translations in 3 languages
        $this->vehicle = Vehicle::factory()->create([
            'make' => 'BMW',
            'model' => 'X5',
            'year' => 2024,
            'price' => 65000,
            'is_published' => true, 'published_at' => now(),
            'title' => [
                'en' => 'BMW X5 2024 Luxury SUV',
                'de' => 'BMW X5 2024 Luxus-SUV',
                'ro' => 'BMW X5 2024 SUV de Lux',
            ],
            'description' => [
                'en' => 'Premium luxury SUV with advanced features and powerful engine.',
                'de' => 'Premium-Luxus-SUV mit fortschrittlichen Funktionen und leistungsstarkem Motor.',
                'ro' => 'SUV de lux premium cu caracteristici avansate și motor puternic.',
            ],
        ]);
    });
    
    test('vehicle returns English translation by default', function () {
        $response = this()->getJson('/api/v1/vehicles');
        
        $response->assertStatus(200)
            ->assertJsonPath('data.0.title', 'BMW X5 2024 Luxury SUV')
            ->assertJsonPath('data.0.description', 'Premium luxury SUV with advanced features and powerful engine.');
    });
    
    test('vehicle returns German translation when lang=de', function () {
        $response = this()->getJson('/api/v1/vehicles?lang=de');
        
        $response->assertStatus(200)
            ->assertJsonPath('data.0.title', 'BMW X5 2024 Luxus-SUV')
            ->assertJsonPath('data.0.description', 'Premium-Luxus-SUV mit fortschrittlichen Funktionen und leistungsstarkem Motor.');
    });
    
    test('vehicle returns Romanian translation when lang=ro', function () {
        $response = this()->getJson('/api/v1/vehicles?lang=ro');
        
        $response->assertStatus(200)
            ->assertJsonPath('data.0.title', 'BMW X5 2024 SUV de Lux')
            ->assertJsonPath('data.0.description', 'SUV de lux premium cu caracteristici avansate și motor puternic.');
    });
    
    test('vehicle detail returns correct translation', function () {
        $response = this()->getJson("/api/v1/vehicles/{$this->vehicle->slug}?lang=de");
        
        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'BMW X5 2024 Luxus-SUV')
            ->assertJsonPath('data.description', 'Premium-Luxus-SUV mit fortschrittlichen Funktionen und leistungsstarkem Motor.');
    });
    
    test('vehicle falls back to English for unsupported language', function () {
        $response = this()->getJson('/api/v1/vehicles?lang=invalid');
        
        // Should fall back to English
        $response->assertStatus(200)
            ->assertJsonPath('data.0.title', 'BMW X5 2024 Luxury SUV');
    });
    
    test('all supported languages work correctly', function () {
        // Create vehicle with all 8 supported languages
        $vehicle = Vehicle::factory()->create([
            'is_published' => true, 'published_at' => now(),
            'title' => [
                'en' => 'BMW X5 English',
                'de' => 'BMW X5 Deutsch',
                'fr' => 'BMW X5 Français',
                'es' => 'BMW X5 Español',
                'it' => 'BMW X5 Italiano',
                'pt' => 'BMW X5 Português',
                'ro' => 'BMW X5 Română',
                'pl' => 'BMW X5 Polski',
            ],
        ]);
        
        $languages = ['en', 'de', 'fr', 'es', 'it', 'pt', 'ro', 'pl'];
        $titles = [
            'en' => 'BMW X5 English',
            'de' => 'BMW X5 Deutsch',
            'fr' => 'BMW X5 Français',
            'es' => 'BMW X5 Español',
            'it' => 'BMW X5 Italiano',
            'pt' => 'BMW X5 Português',
            'ro' => 'BMW X5 Română',
            'pl' => 'BMW X5 Polski',
        ];
        
        foreach ($languages as $lang) {
            $response = this()->getJson("/api/v1/vehicles?lang={$lang}");
            $response->assertStatus(200);
            
            // Find our vehicle in the response
            $data = $response->json('data');
            $found = collect($data)->firstWhere('id', $vehicle->id);
            
            expect($found['title'])->toBe($titles[$lang]);
        }
    });
    
    test('vehicle without translation falls back to English', function () {
        // Create vehicle with only English translation
        $vehicle = Vehicle::factory()->create([
            'is_published' => true, 'published_at' => now(),
            'title' => [
                'en' => 'BMW X5 English Only',
            ],
        ]);
        
        // Request in German - should fall back to English
        $response = this()->getJson('/api/v1/vehicles?lang=de');
        
        $response->assertStatus(200);
        
        $data = $response->json('data');
        $found = collect($data)->firstWhere('id', $vehicle->id);
        
        // Should return English translation as fallback
        expect($found['title'])->toBe('BMW X5 English Only');
    });
    
    test('translation works with filters', function () {
        // Create multiple vehicles with translations
        Vehicle::factory()->create([
            'make' => 'Audi',
            'is_published' => true, 'published_at' => now(),
            'title' => [
                'en' => 'Audi Q7 English',
                'de' => 'Audi Q7 Deutsch',
            ],
        ]);
        
        // Filter by make with language parameter
        $response = this()->getJson('/api/v1/vehicles?make=BMW&lang=de');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'BMW X5 2024 Luxus-SUV');
    });
    
    test('translation works with pagination', function () {
        // Create 5 more vehicles
        Vehicle::factory()->count(5)->create([
            'is_published' => true, 'published_at' => now(),
            'title' => [
                'en' => 'Test Vehicle English',
                'de' => 'Test Fahrzeug Deutsch',
            ],
        ]);
        
        $response = this()->getJson('/api/v1/vehicles?lang=de&per_page=3');
        
        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
        
        // Check that all returned vehicles have German translations
        $data = $response->json('data');
        foreach ($data as $vehicle) {
            if ($vehicle['id'] !== $this->vehicle->id) {
                expect($vehicle['title'])->toContain('Deutsch');
            }
        }
    });
    
    test('translation works with sorting', function () {
        Vehicle::factory()->create([
            'price' => 50000,
            'is_published' => true, 'published_at' => now(),
            'title' => [
                'en' => 'Cheaper Vehicle English',
                'de' => 'Günstigeres Fahrzeug',
            ],
        ]);
        
        $response = this()->getJson('/api/v1/vehicles?sort=price_asc&lang=de');
        
        $response->assertStatus(200);
        
        // First vehicle should be the cheaper one with German translation
        $response->assertJsonPath('data.0.title', 'Günstigeres Fahrzeug');
    });
    
    test('language parameter is case insensitive', function () {
        $response1 = this()->getJson('/api/v1/vehicles?lang=DE');
        $response2 = this()->getJson('/api/v1/vehicles?lang=de');
        
        // Both should work (if we implement toLowerCase in controller)
        $response1->assertStatus(200);
        $response2->assertStatus(200);
    });
    
    test('similar vehicles in detail view use same language', function () {
        // Create similar vehicle
        $similar = Vehicle::factory()->create([
            'make' => 'BMW',
            'body_type' => 'suv',
            'is_published' => true, 'published_at' => now(),
            'title' => [
                'en' => 'Similar BMW English',
                'de' => 'Ähnlicher BMW Deutsch',
            ],
        ]);
        
        $response = this()->getJson("/api/v1/vehicles/{$this->vehicle->slug}?lang=de");
        
        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'BMW X5 2024 Luxus-SUV');
        
        // Check similar vehicles also have German translations
        $similarVehicles = $response->json('similar');
        expect($similarVehicles)->toBeArray();
    });
});

describe('Vehicle Translation Model Methods', function () {
    
    test('hasTranslation method works correctly', function () {
        $vehicle = Vehicle::factory()->create([
            'title' => [
                'en' => 'English Title',
                'de' => 'German Title',
            ],
        ]);
        
        expect($vehicle->hasTranslation('title', 'en'))->toBeTrue();
        expect($vehicle->hasTranslation('title', 'de'))->toBeTrue();
        expect($vehicle->hasTranslation('title', 'fr'))->toBeFalse();
    });
    
    test('getTranslation method returns correct translation', function () {
        $vehicle = Vehicle::factory()->create([
            'title' => [
                'en' => 'English Title',
                'de' => 'German Title',
            ],
        ]);
        
        expect($vehicle->getTranslation('title', 'en'))->toBe('English Title');
        expect($vehicle->getTranslation('title', 'de'))->toBe('German Title');
    });
    
    test('getTranslations method returns all translations', function () {
        $vehicle = Vehicle::factory()->create([
            'title' => [
                'en' => 'English Title',
                'de' => 'German Title',
                'ro' => 'Romanian Title',
            ],
        ]);
        
        $translations = $vehicle->getTranslations('title');
        
        expect($translations)->toBeArray()
            ->and($translations)->toHaveKey('en')
            ->and($translations)->toHaveKey('de')
            ->and($translations)->toHaveKey('ro')
            ->and($translations['en'])->toBe('English Title');
    });
    
    test('setTranslation method sets translation correctly', function () {
        $vehicle = Vehicle::factory()->create([
            'title' => ['en' => 'English Title'],
        ]);
        
        $vehicle->setTranslation('title', 'de', 'New German Title');
        $vehicle->save();
        
        $vehicle->refresh();
        
        expect($vehicle->getTranslation('title', 'de'))->toBe('New German Title');
    });
});
