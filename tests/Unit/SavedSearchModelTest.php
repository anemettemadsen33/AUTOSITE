<?php

use App\Models\SavedSearch;
use App\Models\User;
use App\Models\Vehicle;

test('saved search belongs to user', function () {
    $user = User::factory()->create();
    $search = SavedSearch::factory()->create(['user_id' => $user->id]);

    expect($search->user->id)->toBe($user->id);
});

test('saved search stores criteria as array', function () {
    $search = SavedSearch::factory()->create([
        'criteria' => ['make' => 'Toyota', 'model' => 'Camry']
    ]);

    expect($search->criteria)->toBeArray()
        ->toHaveKey('make', 'Toyota')
        ->toHaveKey('model', 'Camry');
});

test('saved search can find matching vehicles', function () {
    $user = User::factory()->create();
    $search = SavedSearch::factory()->create([
        'user_id' => $user->id,
        'criteria' => [
            'make' => 'Toyota',
            'year_from' => 2020,
            'year_to' => 2024,
        ]
    ]);

    Vehicle::factory()->create([
        'make' => 'Toyota',
        'model' => 'Camry',
        'year' => 2023,
    ]);

    Vehicle::factory()->create([
        'make' => 'Honda',
        'model' => 'Accord',
        'year' => 2023,
    ]);

    $matches = $search->getMatchingVehicles();

    expect($matches)->toHaveCount(1)
        ->first()->make->toBe('Toyota');
});

test('saved search has notify flag', function () {
    $search = SavedSearch::factory()->create(['notify' => true]);

    expect($search->notify)->toBeTrue();
});
