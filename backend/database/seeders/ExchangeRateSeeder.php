<?php

namespace Database\Seeders;

use App\Models\ExchangeRate;
use Illuminate\Database\Seeder;

class ExchangeRateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $today = now()->toDateString();
        
        $rates = [
            ['base_currency' => 'EUR', 'target_currency' => 'USD', 'rate' => 1.095600, 'date' => $today, 'source' => 'ECB'],
            ['base_currency' => 'EUR', 'target_currency' => 'GBP', 'rate' => 0.856700, 'date' => $today, 'source' => 'ECB'],
            ['base_currency' => 'EUR', 'target_currency' => 'RON', 'rate' => 4.975000, 'date' => $today, 'source' => 'ECB'],
            ['base_currency' => 'EUR', 'target_currency' => 'CHF', 'rate' => 0.936200, 'date' => $today, 'source' => 'ECB'],
            ['base_currency' => 'EUR', 'target_currency' => 'JPY', 'rate' => 163.450000, 'date' => $today, 'source' => 'ECB'],
            ['base_currency' => 'EUR', 'target_currency' => 'PLN', 'rate' => 4.325000, 'date' => $today, 'source' => 'ECB'],
            ['base_currency' => 'EUR', 'target_currency' => 'CZK', 'rate' => 25.180000, 'date' => $today, 'source' => 'ECB'],
            ['base_currency' => 'EUR', 'target_currency' => 'HUF', 'rate' => 393.500000, 'date' => $today, 'source' => 'ECB'],
        ];

        foreach ($rates as $rate) {
            ExchangeRate::updateOrCreate(
                [
                    'base_currency' => $rate['base_currency'],
                    'target_currency' => $rate['target_currency'],
                    'date' => $rate['date']
                ],
                $rate
            );
        }
    }
}
