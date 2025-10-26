<?php

use App\Services\CurrencyService;
use App\Models\ExchangeRate;

test('currency service can convert between currencies', function () {
    // Create exchange rates
    ExchangeRate::create([
        'base_currency' => 'EUR',
        'rates' => [
            'USD' => 1.10,
            'RON' => 4.95,
            'GBP' => 0.85,
        ],
        'rates_date' => now(),
        'fetched_at' => now(),
    ]);

    $service = new CurrencyService();
    
    $result = $service->convert(100, 'EUR', 'USD');
    
    expect($result)->toBeGreaterThan(100);
});

test('can get exchange rates from API', function () {
    ExchangeRate::create([
        'base_currency' => 'EUR',
        'rates' => [
            'USD' => 1.10,
            'RON' => 4.95,
            'GBP' => 0.85,
        ],
        'rates_date' => now(),
        'fetched_at' => now(),
    ]);

    $response = $this->getJson('/api/exchange-rates');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'base_currency',
            'rates',
            'supported_currencies',
        ]);
});

test('can convert currency via API', function () {
    ExchangeRate::create([
        'base_currency' => 'EUR',
        'rates' => [
            'USD' => 1.10,
            'RON' => 4.95,
            'GBP' => 0.85,
        ],
        'rates_date' => now(),
        'fetched_at' => now(),
    ]);

    $response = $this->postJson('/api/currency/convert', [
        'amount' => 100,
        'from' => 'EUR',
        'to' => 'USD',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'original_amount',
            'from_currency',
            'to_currency',
            'converted_amount',
            'formatted',
        ]);
});
