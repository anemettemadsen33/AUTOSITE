<?php

use App\Models\Vehicle;
use App\Models\User;
use App\Models\Dealer;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Vehicle Filtering', function () {
    
    test('vehicles can be filtered by make', function () {
        Vehicle::factory()->create(['make' => 'BMW', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['make' => 'Audi', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['make' => 'Mercedes-Benz', 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?make=BMW');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.make', 'BMW');
    });
    
    test('vehicles can be filtered by model', function () {
        Vehicle::factory()->create(['make' => 'BMW', 'model' => 'X5', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['make' => 'BMW', 'model' => 'X3', 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?model=X5');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by price range', function () {
        Vehicle::factory()->create(['price' => 30000, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['price' => 50000, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['price' => 70000, 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?price_min=40000&price_max=60000');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by year range', function () {
        Vehicle::factory()->create(['year' => 2020, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['year' => 2022, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['year' => 2024, 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?year_min=2021&year_max=2023');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by mileage range', function () {
        Vehicle::factory()->create(['mileage' => 10000, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['mileage' => 50000, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['mileage' => 100000, 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?mileage_max=60000');
        
        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    });
    
    test('vehicles can be filtered by fuel type', function () {
        Vehicle::factory()->create(['fuel' => 'petrol', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['fuel' => 'diesel', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['fuel' => 'electric', 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?fuel=electric');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by transmission', function () {
        Vehicle::factory()->create(['transmission' => 'manual', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['transmission' => 'automatic', 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?transmission=automatic');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by body type', function () {
        Vehicle::factory()->create(['body_type' => 'sedan', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['body_type' => 'suv', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['body_type' => 'coupe', 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?body_type=suv');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by condition', function () {
        Vehicle::factory()->create(['condition' => 'new', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['condition' => 'used', 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?condition=new');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by location', function () {
        Vehicle::factory()->create(['location_country' => 'DE', 'location_city' => 'Berlin', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['location_country' => 'DE', 'location_city' => 'Munich', 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['location_country' => 'FR', 'location_city' => 'Paris', 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?location_country=DE');
        
        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    });
    
    test('vehicles can be filtered by power range', function () {
        Vehicle::factory()->create(['power_hp' => 150, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['power_hp' => 250, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['power_hp' => 350, 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?power_min=200&power_max=300');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by multiple criteria', function () {
        Vehicle::factory()->create([
            'make' => 'BMW',
            'fuel' => 'diesel',
            'transmission' => 'automatic',
            'price' => 50000,
            'is_published' => true, 'published_at' => now()
        ]);
        
        Vehicle::factory()->create([
            'make' => 'BMW',
            'fuel' => 'petrol',
            'transmission' => 'automatic',
            'price' => 45000,
            'is_published' => true, 'published_at' => now()
        ]);
        
        Vehicle::factory()->create([
            'make' => 'Audi',
            'fuel' => 'diesel',
            'transmission' => 'automatic',
            'price' => 55000,
            'is_published' => true, 'published_at' => now()
        ]);
        
        $response = this()->getJson('/api/v1/vehicles?make=BMW&fuel=diesel&price_min=45000');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be searched by query', function () {
        Vehicle::factory()->create([
            'make' => 'BMW',
            'model' => 'X5',
            'is_published' => true, 'published_at' => now()
        ]);
        
        Vehicle::factory()->create([
            'make' => 'Audi',
            'model' => 'Q7',
            'is_published' => true, 'published_at' => now()
        ]);
        
        $response = this()->getJson('/api/v1/vehicles?query=BMW');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be sorted by price ascending', function () {
        Vehicle::factory()->create(['price' => 60000, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['price' => 40000, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['price' => 50000, 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?sort=price_asc');
        
        $response->assertStatus(200);
        $data = $response->json('data');
        
        expect($data[0]['price'])->toBe(40000)
            ->and($data[1]['price'])->toBe(50000)
            ->and($data[2]['price'])->toBe(60000);
    });
    
    test('vehicles can be sorted by price descending', function () {
        Vehicle::factory()->create(['price' => 40000, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['price' => 60000, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['price' => 50000, 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?sort=price_desc');
        
        $response->assertStatus(200);
        $data = $response->json('data');
        
        expect($data[0]['price'])->toBe(60000)
            ->and($data[1]['price'])->toBe(50000)
            ->and($data[2]['price'])->toBe(40000);
    });
    
    test('pagination works correctly', function () {
        Vehicle::factory()->count(20)->create(['is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?per_page=5');
        
        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonPath('meta.per_page', 5)
            ->assertJsonPath('meta.total', 20);
    });
    
    test('only published vehicles are returned', function () {
        Vehicle::factory()->create(['is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['is_published' => false, 'published_at' => null]);
        Vehicle::factory()->create(['is_published' => false, 'published_at' => null]);
        
        $response = this()->getJson('/api/v1/vehicles');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('featured vehicles can be filtered', function () {
        Vehicle::factory()->create(['is_featured' => true, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['is_featured' => false, 'is_published' => true, 'published_at' => now()]);
        Vehicle::factory()->create(['is_featured' => false, 'is_published' => true, 'published_at' => now()]);
        
        $response = this()->getJson('/api/v1/vehicles?is_featured=1');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
});
