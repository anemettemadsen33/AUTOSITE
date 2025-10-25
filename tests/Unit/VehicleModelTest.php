<?php

use App\Models\Vehicle;
use App\Models\User;

test('vehicle belongs to user', function () {
    $user = User::factory()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $user->id]);

    expect($vehicle->user->id)->toBe($user->id);
});

test('vehicle has searchable trait', function () {
    $vehicle = Vehicle::factory()->create();

    expect($vehicle)->toHaveMethod('toSearchableArray')
        ->and($vehicle->toSearchableArray())->toBeArray()
        ->and($vehicle->toSearchableArray())->toHaveKeys([
            'id', 'make', 'model', 'year', 'price'
        ]);
});

test('vehicle to searchable array returns correct data', function () {
    $vehicle = Vehicle::factory()->create([
        'make' => 'Toyota',
        'model' => 'Camry',
        'year' => 2024,
        'price' => 25000,
    ]);

    $searchable = $vehicle->toSearchableArray();

    expect($searchable)->toHaveKey('make', 'Toyota')
        ->and($searchable)->toHaveKey('model', 'Camry')
        ->and($searchable)->toHaveKey('year', 2024)
        ->and($searchable)->toHaveKey('price', 25000);
});

test('vehicle has required attributes', function () {
    $vehicle = Vehicle::factory()->create();

    expect($vehicle->make)->not->toBeNull()
        ->and($vehicle->model)->not->toBeNull()
        ->and($vehicle->year)->not->toBeNull()
        ->and($vehicle->price)->not->toBeNull();
});

test('vehicle can be featured', function () {
    $vehicle = Vehicle::factory()->create(['featured' => true]);

    expect($vehicle->featured)->toBeTrue();
});

test('vehicle has status', function () {
    $vehicle = Vehicle::factory()->create(['status' => 'available']);

    expect($vehicle->status)->toBe('available');
});
