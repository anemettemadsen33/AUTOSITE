<?php

namespace App\Services;

use App\Models\ExchangeRate;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class CurrencyService
{
    /**
     * Supported currencies
     */
    const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'RON', 'GBP', 'CHF', 'DKK', 'SEK', 'PLN'];

    /**
     * Convert amount from one currency to another
     */
    public function convert(float $amount, string $fromCurrency, string $toCurrency): float
    {
        if ($fromCurrency === $toCurrency) {
            return $amount;
        }

        $rates = $this->getLatestRates();

        if (!isset($rates[$fromCurrency]) || !isset($rates[$toCurrency])) {
            throw new \Exception("Currency not supported");
        }

        // Convert to base currency (EUR) first, then to target currency
        $amountInEur = $amount / $rates[$fromCurrency];
        return $amountInEur * $rates[$toCurrency];
    }

    /**
     * Get latest exchange rates
     */
    public function getLatestRates(): array
    {
        $exchangeRate = ExchangeRate::latest('fetched_at')->first();

        if (!$exchangeRate || $exchangeRate->fetched_at->lt(now()->subDay())) {
            $this->updateRates();
            $exchangeRate = ExchangeRate::latest('fetched_at')->first();
        }

        $rates = $exchangeRate->rates ?? [];
        
        // Ensure EUR is included with rate 1.0
        $rates['EUR'] = 1.0;

        return $rates;
    }

    /**
     * Update exchange rates from ECB
     */
    public function updateRates(): bool
    {
        try {
            // Fetch from European Central Bank
            $response = Http::timeout(10)->get('https://api.exchangerate-api.com/v4/latest/EUR');

            if ($response->successful()) {
                $data = $response->json();

                ExchangeRate::create([
                    'base_currency' => 'EUR',
                    'rates' => $data['rates'] ?? [],
                    'rates_date' => now(),
                    'fetched_at' => now(),
                ]);

                return true;
            }

            return false;
        } catch (\Exception $e) {
            \Log::error('Failed to update exchange rates: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get all supported currencies with their symbols
     */
    public function getSupportedCurrencies(): array
    {
        return [
            'EUR' => ['name' => 'Euro', 'symbol' => '€'],
            'USD' => ['name' => 'US Dollar', 'symbol' => '$'],
            'RON' => ['name' => 'Romanian Leu', 'symbol' => 'RON'],
            'GBP' => ['name' => 'British Pound', 'symbol' => '£'],
            'CHF' => ['name' => 'Swiss Franc', 'symbol' => 'CHF'],
            'DKK' => ['name' => 'Danish Krone', 'symbol' => 'DKK'],
            'SEK' => ['name' => 'Swedish Krona', 'symbol' => 'SEK'],
            'PLN' => ['name' => 'Polish Złoty', 'symbol' => 'PLN'],
        ];
    }

    /**
     * Format currency amount
     */
    public function format(float $amount, string $currency): string
    {
        $currencies = $this->getSupportedCurrencies();
        $symbol = $currencies[$currency]['symbol'] ?? $currency;

        return $symbol . ' ' . number_format($amount, 2, '.', ',');
    }
}
