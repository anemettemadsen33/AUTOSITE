<?php

use App\Models\User;
use App\Models\Vehicle;
use Laravel\Sanctum\Sanctum;

test('user can generate vehicle pdf', function () {
    $user = User::factory()->create();
    $vehicle = Vehicle::factory()->create();
    
    Sanctum::actingAs($user);

    $response = $this->get("/api/vehicles/{$vehicle->id}/pdf");

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'application/pdf');
});

test('user can generate vehicle qr code', function () {
    $user = User::factory()->create();
    $vehicle = Vehicle::factory()->create();
    
    Sanctum::actingAs($user);

    $response = $this->get("/api/vehicles/{$vehicle->id}/qrcode");

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'image/png');
});

test('guest can generate vehicle pdf', function () {
    $vehicle = Vehicle::factory()->create();

    $response = $this->get("/api/vehicles/{$vehicle->id}/pdf");

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'application/pdf');
});

test('pdf generation respects rate limiting', function () {
    $vehicle = Vehicle::factory()->create();

    // Make 25 requests (limit is 20/minute for PDF)
    for ($i = 0; $i < 25; $i++) {
        $response = $this->get("/api/vehicles/{$vehicle->id}/pdf");
        
        if ($i < 20) {
            $response->assertStatus(200);
        } else {
            $response->assertStatus(429); // Too Many Requests
        }
    }
});
