<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VehicleApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test listing vehicles
     */
    public function test_can_list_vehicles(): void
    {
        $user = User::factory()->create(['role' => 'dealer']);
        Vehicle::factory()->count(5)->create([
            'user_id' => $user->id,
            'is_published' => true,
        ]);

        $response = $this->getJson('/api/v1/vehicles');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'make',
                        'model',
                        'year',
                        'price',
                        'slug',
                    ],
                ],
                'meta',
                'links',
            ]);
    }

    /**
     * Test filtering vehicles by make
     */
    public function test_can_filter_vehicles_by_make(): void
    {
        $user = User::factory()->create(['role' => 'dealer']);
        
        Vehicle::factory()->create([
            'user_id' => $user->id,
            'make' => 'BMW',
            'is_published' => true,
        ]);
        
        Vehicle::factory()->create([
            'user_id' => $user->id,
            'make' => 'Audi',
            'is_published' => true,
        ]);

        $response = $this->getJson('/api/v1/vehicles?make=BMW');

        $response->assertStatus(200);
        
        $this->assertEquals(1, count($response->json('data')));
        $this->assertEquals('BMW', $response->json('data.0.make'));
    }

    /**
     * Test filtering vehicles by price range
     */
    public function test_can_filter_vehicles_by_price_range(): void
    {
        $user = User::factory()->create(['role' => 'dealer']);
        
        Vehicle::factory()->create([
            'user_id' => $user->id,
            'price' => 10000,
            'is_published' => true,
        ]);
        
        Vehicle::factory()->create([
            'user_id' => $user->id,
            'price' => 30000,
            'is_published' => true,
        ]);

        $response = $this->getJson('/api/v1/vehicles?price_min=25000&price_max=35000');

        $response->assertStatus(200);
        
        $this->assertEquals(1, count($response->json('data')));
    }

    /**
     * Test viewing a single vehicle
     */
    public function test_can_view_single_vehicle(): void
    {
        $user = User::factory()->create(['role' => 'dealer']);
        $vehicle = Vehicle::factory()->create([
            'user_id' => $user->id,
            'is_published' => true,
        ]);

        $response = $this->getJson('/api/v1/vehicles/' . $vehicle->slug);

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $vehicle->id,
                    'slug' => $vehicle->slug,
                ],
            ]);
    }

    /**
     * Test creating a vehicle as dealer
     */
    public function test_dealer_can_create_vehicle(): void
    {
        $user = User::factory()->create(['role' => 'dealer']);
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/vehicles', [
                'make' => 'BMW',
                'model' => 'X5',
                'year' => 2023,
                'price' => 50000,
                'mileage' => 5000,
                'fuel' => 'petrol',
                'transmission' => 'automatic',
                'condition' => 'used',
                'title' => ['en' => 'BMW X5 2023'],
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => ['id', 'make', 'model', 'slug'],
                'message',
            ]);

        $this->assertDatabaseHas('vehicles', [
            'make' => 'BMW',
            'model' => 'X5',
        ]);
    }

    /**
     * Test regular user cannot create vehicle
     */
    public function test_regular_user_cannot_create_vehicle(): void
    {
        $user = User::factory()->create(['role' => 'buyer']);
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/vehicles', [
                'make' => 'BMW',
                'model' => 'X5',
                'year' => 2023,
                'price' => 50000,
                'mileage' => 5000,
                'fuel' => 'petrol',
                'transmission' => 'automatic',
                'condition' => 'used',
                'title' => ['en' => 'BMW X5 2023'],
            ]);

        $response->assertStatus(403);
    }

    /**
     * Test updating own vehicle
     */
    public function test_owner_can_update_vehicle(): void
    {
        $user = User::factory()->create(['role' => 'dealer']);
        $vehicle = Vehicle::factory()->create(['user_id' => $user->id]);
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/v1/vehicles/' . $vehicle->id, [
                'price' => 55000,
            ]);

        $response->assertStatus(200);
        
        $this->assertDatabaseHas('vehicles', [
            'id' => $vehicle->id,
            'price' => 55000,
        ]);
    }

    /**
     * Test cannot update someone else's vehicle
     */
    public function test_cannot_update_other_users_vehicle(): void
    {
        $owner = User::factory()->create(['role' => 'dealer']);
        $otherUser = User::factory()->create(['role' => 'dealer']);
        
        $vehicle = Vehicle::factory()->create(['user_id' => $owner->id]);
        $token = $otherUser->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/v1/vehicles/' . $vehicle->id, [
                'price' => 55000,
            ]);

        $response->assertStatus(403);
    }

    /**
     * Test deleting own vehicle
     */
    public function test_owner_can_delete_vehicle(): void
    {
        $user = User::factory()->create(['role' => 'dealer']);
        $vehicle = Vehicle::factory()->create(['user_id' => $user->id]);
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/v1/vehicles/' . $vehicle->id);

        $response->assertStatus(200);
        
        $this->assertSoftDeleted('vehicles', [
            'id' => $vehicle->id,
        ]);
    }
}
