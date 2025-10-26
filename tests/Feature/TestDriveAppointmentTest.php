<?php

use App\Models\User;
use App\Models\Vehicle;
use App\Models\TestDriveAppointment;

test('user can create a test drive appointment', function () {
    $user = User::factory()->create();
    $vehicle = Vehicle::factory()->create([
        'status' => 'published',
        'user_id' => User::factory()->create()->id, // Create dealer
    ]);

    $response = $this->actingAs($user)
        ->postJson('/api/test-drive-appointments', [
            'vehicle_id' => $vehicle->id,
            'appointment_date' => now()->addDays(3)->format('Y-m-d H:i:s'),
            'preferred_time' => '10:00 AM',
            'customer_name' => 'John Doe',
            'customer_email' => 'john@example.com',
            'customer_phone' => '+1234567890',
            'message' => 'I would like to test drive this vehicle.',
        ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'data' => [
                'id',
                'vehicle_id',
                'appointment_date',
                'status',
            ],
        ]);

    $this->assertDatabaseHas('test_drive_appointments', [
        'user_id' => $user->id,
        'vehicle_id' => $vehicle->id,
        'status' => 'pending',
    ]);
});

test('user can view their test drive appointments', function () {
    $user = User::factory()->create();
    $vehicle = Vehicle::factory()->create(['status' => 'published']);
    
    TestDriveAppointment::factory()->create([
        'user_id' => $user->id,
        'vehicle_id' => $vehicle->id,
    ]);

    $response = $this->actingAs($user)
        ->getJson('/api/test-drive-appointments');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => ['id', 'vehicle_id', 'status'],
            ],
        ]);
});

test('dealer can confirm a test drive appointment', function () {
    $dealer = User::factory()->create();
    $customer = User::factory()->create();
    $vehicle = Vehicle::factory()->create([
        'user_id' => $dealer->id,
        'status' => 'published',
    ]);
    
    $appointment = TestDriveAppointment::factory()->create([
        'user_id' => $customer->id,
        'vehicle_id' => $vehicle->id,
        'dealer_id' => $dealer->id,
        'status' => 'pending',
    ]);

    $response = $this->actingAs($dealer)
        ->postJson("/api/test-drive-appointments/{$appointment->id}/confirm");

    $response->assertStatus(200);

    $this->assertDatabaseHas('test_drive_appointments', [
        'id' => $appointment->id,
        'status' => 'confirmed',
    ]);
});
