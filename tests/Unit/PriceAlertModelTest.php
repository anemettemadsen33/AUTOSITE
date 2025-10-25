<?php

use App\Models\PriceAlert;
use App\Models\User;
use App\Models\Vehicle;

test('price alert belongs to user', function () {
    $user = User::factory()->create();
    $alert = PriceAlert::factory()->create(['user_id' => $user->id]);

    expect($alert->user->id)->toBe($user->id);
});

test('price alert finds vehicles below target price', function () {
    $user = User::factory()->create();
    $alert = PriceAlert::factory()->create([
        'user_id' => $user->id,
        'make' => 'Toyota',
        'target_price' => 25000,
        'condition' => 'below',
    ]);

    Vehicle::factory()->create([
        'make' => 'Toyota',
        'model' => 'Camry',
        'price' => 22000,
    ]);

    Vehicle::factory()->create([
        'make' => 'Toyota',
        'model' => 'Highlander',
        'price' => 30000,
    ]);

    $matches = $alert->checkForMatches();

    expect($matches)->toHaveCount(1)
        ->first()->price->toBeLessThan(25000);
});

test('price alert finds vehicles above target price', function () {
    $user = User::factory()->create();
    $alert = PriceAlert::factory()->create([
        'user_id' => $user->id,
        'make' => 'Toyota',
        'target_price' => 25000,
        'condition' => 'above',
    ]);

    Vehicle::factory()->create([
        'make' => 'Toyota',
        'model' => 'Camry',
        'price' => 22000,
    ]);

    Vehicle::factory()->create([
        'make' => 'Toyota',
        'model' => 'Highlander',
        'price' => 30000,
    ]);

    $matches = $alert->checkForMatches();

    expect($matches)->toHaveCount(1)
        ->first()->price->toBeGreaterThan(25000);
});

test('price alert can be activated and deactivated', function () {
    $alert = PriceAlert::factory()->create(['active' => true]);
    expect($alert->active)->toBeTrue();

    $alert->update(['active' => false]);
    expect($alert->fresh()->active)->toBeFalse();
});
