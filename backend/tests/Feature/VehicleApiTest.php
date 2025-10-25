<?php

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Dealer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use function Pest\Laravel\{actingAs, postJson, getJson, putJson, deleteJson};

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create permissions
    Permission::create(['name' => 'view-vehicles']);
    Permission::create(['name' => 'create-vehicles']);
    Permission::create(['name' => 'edit-vehicles']);
    Permission::create(['name' => 'delete-vehicles']);
    
    // Create roles
    $adminRole = Role::create(['name' => 'admin']);
    $adminRole->givePermissionTo(Permission::all());
    
    $dealerRole = Role::create(['name' => 'dealer']);
    $dealerRole->givePermissionTo(['view-vehicles', 'create-vehicles', 'edit-vehicles']);
    
    $buyerRole = Role::create(['name' => 'buyer']);
    $buyerRole->givePermissionTo(['view-vehicles']);
});

test('admin can create vehicle', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    
    $dealer = Dealer::factory()->create(['user_id' => $admin->id]);
    
    actingAs($admin, 'sanctum');
    
    $response = postJson('/api/v1/vehicles', [
        'title' => ['en' => 'Test BMW X5'],
        'make' => 'BMW',
        'model' => 'X5',
        'year' => 2024,
        'price' => 65000,
        'mileage' => 0,
        'fuel' => 'diesel',
        'transmission' => 'automatic',
        'body_type' => 'suv',
        'condition' => 'new',
        'location_country' => 'DE',
        'location_city' => 'Munich',
    ]);
    
    $response->assertStatus(201);
    expect(Vehicle::count())->toBe(1);
});

test('dealer can create own vehicle', function () {
    $dealer = User::factory()->create();
    $dealer->assignRole('dealer');
    
    $dealerProfile = Dealer::factory()->create(['user_id' => $dealer->id]);
    
    actingAs($dealer, 'sanctum');
    
    $response = postJson('/api/v1/vehicles', [
        'title' => ['en' => 'Mercedes C-Class'],
        'make' => 'Mercedes-Benz',
        'model' => 'C-Class',
        'year' => 2023,
        'price' => 45000,
        'mileage' => 15000,
        'fuel' => 'petrol',
        'transmission' => 'automatic',
        'body_type' => 'sedan',
        'condition' => 'used',
        'location_country' => 'DE',
        'location_city' => 'Berlin',
    ]);
    
    $response->assertStatus(201);
});

test('buyer cannot create vehicle', function () {
    $buyer = User::factory()->create();
    $buyer->assignRole('buyer');
    
    actingAs($buyer, 'sanctum');
    
    $response = postJson('/api/v1/vehicles', [
        'title' => ['en' => 'Audi A4'],
        'make' => 'Audi',
        'model' => 'A4',
        'year' => 2023,
        'price' => 40000,
    ]);
    
    $response->assertStatus(403);
});

test('anyone can view vehicles without auth', function () {
    Vehicle::factory()->count(5)->create();
    
    $response = getJson('/api/v1/vehicles');
    
    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'make', 'model', 'price']
            ]
        ]);
});

test('dealer can only edit own vehicles', function () {
    $dealer1 = User::factory()->create();
    $dealer1->assignRole('dealer');
    $dealerProfile1 = Dealer::factory()->create(['user_id' => $dealer1->id]);
    
    $dealer2 = User::factory()->create();
    $dealer2->assignRole('dealer');
    $dealerProfile2 = Dealer::factory()->create(['user_id' => $dealer2->id]);
    
    $vehicle = Vehicle::factory()->create(['user_id' => $dealer1->id]);
    
    actingAs($dealer2, 'sanctum');
    
    $response = putJson("/api/v1/vehicles/{$vehicle->id}", [
        'price' => 50000,
    ]);
    
    $response->assertStatus(403);
});

test('admin can edit any vehicle', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');
    
    $dealer = User::factory()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $dealer->id]);
    
    actingAs($admin, 'sanctum');
    
    $response = putJson("/api/v1/vehicles/{$vehicle->id}", [
        'price' => 70000,
    ]);
    
    $response->assertStatus(200);
});

test('unauthenticated user cannot create vehicle', function () {
    $response = postJson('/api/v1/vehicles', [
        'title' => ['en' => 'Test Vehicle'],
        'make' => 'BMW',
        'price' => 50000,
    ]);
    
    $response->assertStatus(401);
});
