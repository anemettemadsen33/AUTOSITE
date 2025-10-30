<?php

use App\Models\Vehicle;
use App\Models\User;
use App\Models\Dealer;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Vehicle Filtering', function () {
    
    test('vehicles can be filtered by make', function () {
        Vehicle::factory()->create(['make' => 'BMW', 'status' => 'published']);
        Vehicle::factory()->create(['make' => 'Audi', 'status' => 'published']);
        Vehicle::factory()->create(['make' => 'Mercedes-Benz', 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?make=BMW');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.make', 'BMW');
    });
    
    test('vehicles can be filtered by model', function () {
        Vehicle::factory()->create(['make' => 'BMW', 'model' => 'X5', 'status' => 'published']);
        Vehicle::factory()->create(['make' => 'BMW', 'model' => 'X3', 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?model=X5');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by price range', function () {
        Vehicle::factory()->create(['price' => 30000, 'status' => 'published']);
        Vehicle::factory()->create(['price' => 50000, 'status' => 'published']);
        Vehicle::factory()->create(['price' => 70000, 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?price_min=40000&price_max=60000');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by year range', function () {
        Vehicle::factory()->create(['year' => 2020, 'status' => 'published']);
        Vehicle::factory()->create(['year' => 2022, 'status' => 'published']);
        Vehicle::factory()->create(['year' => 2024, 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?year_min=2021&year_max=2023');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by mileage range', function () {
        Vehicle::factory()->create(['mileage' => 10000, 'status' => 'published']);
        Vehicle::factory()->create(['mileage' => 50000, 'status' => 'published']);
        Vehicle::factory()->create(['mileage' => 100000, 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?mileage_max=60000');
        
        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    });
    
    test('vehicles can be filtered by fuel type', function () {
        Vehicle::factory()->create(['fuel' => 'petrol', 'status' => 'published']);
        Vehicle::factory()->create(['fuel' => 'diesel', 'status' => 'published']);
        Vehicle::factory()->create(['fuel' => 'electric', 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?fuel=electric');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by transmission', function () {
        Vehicle::factory()->create(['transmission' => 'manual', 'status' => 'published']);
        Vehicle::factory()->create(['transmission' => 'automatic', 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?transmission=automatic');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by body type', function () {
        Vehicle::factory()->create(['body_type' => 'sedan', 'status' => 'published']);
        Vehicle::factory()->create(['body_type' => 'suv', 'status' => 'published']);
        Vehicle::factory()->create(['body_type' => 'coupe', 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?body_type=suv');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by condition', function () {
        Vehicle::factory()->create(['condition' => 'new', 'status' => 'published']);
        Vehicle::factory()->create(['condition' => 'used', 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?condition=new');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by location', function () {
        Vehicle::factory()->create(['location_country' => 'DE', 'location_city' => 'Berlin', 'status' => 'published']);
        Vehicle::factory()->create(['location_country' => 'DE', 'location_city' => 'Munich', 'status' => 'published']);
        Vehicle::factory()->create(['location_country' => 'FR', 'location_city' => 'Paris', 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?location_country=DE');
        
        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    });
    
    test('vehicles can be filtered by power range', function () {
        Vehicle::factory()->create(['power_hp' => 150, 'status' => 'published']);
        Vehicle::factory()->create(['power_hp' => 250, 'status' => 'published']);
        Vehicle::factory()->create(['power_hp' => 350, 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?power_min=200&power_max=300');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be filtered by multiple criteria', function () {
        Vehicle::factory()->create([
            'make' => 'BMW',
            'fuel' => 'diesel',
            'transmission' => 'automatic',
            'price' => 50000,
            'status' => 'published'
        ]);
        
        Vehicle::factory()->create([
            'make' => 'BMW',
            'fuel' => 'petrol',
            'transmission' => 'automatic',
            'price' => 45000,
            'status' => 'published'
        ]);
        
        Vehicle::factory()->create([
            'make' => 'Audi',
            'fuel' => 'diesel',
            'transmission' => 'automatic',
            'price' => 55000,
            'status' => 'published'
        ]);
        
        $response = getJson('/api/v1/vehicles?make=BMW&fuel=diesel&price_min=45000');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be searched by query', function () {
        Vehicle::factory()->create([
            'make' => 'BMW',
            'model' => 'X5',
            'status' => 'published'
        ]);
        
        Vehicle::factory()->create([
            'make' => 'Audi',
            'model' => 'Q7',
            'status' => 'published'
        ]);
        
        $response = getJson('/api/v1/vehicles?query=BMW');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('vehicles can be sorted by price ascending', function () {
        Vehicle::factory()->create(['price' => 60000, 'status' => 'published']);
        Vehicle::factory()->create(['price' => 40000, 'status' => 'published']);
        Vehicle::factory()->create(['price' => 50000, 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?sort=price_asc');
        
        $response->assertStatus(200);
        $data = $response->json('data');
        
        expect($data[0]['price'])->toBe(40000)
            ->and($data[1]['price'])->toBe(50000)
            ->and($data[2]['price'])->toBe(60000);
    });
    
    test('vehicles can be sorted by price descending', function () {
        Vehicle::factory()->create(['price' => 40000, 'status' => 'published']);
        Vehicle::factory()->create(['price' => 60000, 'status' => 'published']);
        Vehicle::factory()->create(['price' => 50000, 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?sort=price_desc');
        
        $response->assertStatus(200);
        $data = $response->json('data');
        
        expect($data[0]['price'])->toBe(60000)
            ->and($data[1]['price'])->toBe(50000)
            ->and($data[2]['price'])->toBe(40000);
    });
    
    test('pagination works correctly', function () {
        Vehicle::factory()->count(20)->create(['status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?per_page=5');
        
        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonPath('meta.per_page', 5)
            ->assertJsonPath('meta.total', 20);
    });
    
    test('only published vehicles are returned', function () {
        Vehicle::factory()->create(['status' => 'published']);
        Vehicle::factory()->create(['status' => 'draft']);
        Vehicle::factory()->create(['status' => 'archived']);
        
        $response = getJson('/api/v1/vehicles');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
    
    test('featured vehicles can be filtered', function () {
        Vehicle::factory()->create(['is_featured' => true, 'status' => 'published']);
        Vehicle::factory()->create(['is_featured' => false, 'status' => 'published']);
        Vehicle::factory()->create(['is_featured' => false, 'status' => 'published']);
        
        $response = getJson('/api/v1/vehicles?is_featured=1');
        
        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    });
});
