<?php

use App\Models\User;
use App\Models\Vehicle;
use App\Models\SavedSearch;
use App\Models\PriceAlert;
use App\Models\Webhook;
use App\Models\VehicleComparison;

test('user has vehicles relationship', function () {
    $user = User::factory()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $user->id]);

    expect($user->vehicles)->toHaveCount(1)
        ->and($user->vehicles->first()->id)->toBe($vehicle->id);
});

test('user has saved searches relationship', function () {
    $user = User::factory()->create();
    $search = SavedSearch::factory()->create(['user_id' => $user->id]);

    expect($user->savedSearches)->toHaveCount(1)
        ->and($user->savedSearches->first()->id)->toBe($search->id);
});

test('user has price alerts relationship', function () {
    $user = User::factory()->create();
    $alert = PriceAlert::factory()->create(['user_id' => $user->id]);

    expect($user->priceAlerts)->toHaveCount(1)
        ->and($user->priceAlerts->first()->id)->toBe($alert->id);
});

test('user has webhooks relationship', function () {
    $user = User::factory()->create();
    $webhook = Webhook::factory()->create(['user_id' => $user->id]);

    expect($user->webhooks)->toHaveCount(1)
        ->and($user->webhooks->first()->id)->toBe($webhook->id);
});

test('user has vehicle comparisons relationship', function () {
    $user = User::factory()->create();
    $comparison = VehicleComparison::factory()->create(['user_id' => $user->id]);

    expect($user->vehicleComparisons)->toHaveCount(1)
        ->and($user->vehicleComparisons->first()->id)->toBe($comparison->id);
});

test('user can have role assigned', function () {
    $user = User::factory()->create(['role' => 'dealer']);

    expect($user->role)->toBe('dealer');
});

test('user has two factor authentication trait', function () {
    $user = User::factory()->create();

    expect($user)->toHaveMethod('enableTwoFactorAuthentication')
        ->and($user)->toHaveMethod('disableTwoFactorAuthentication');
});
