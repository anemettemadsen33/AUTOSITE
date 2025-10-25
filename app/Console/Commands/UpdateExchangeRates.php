<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\ExchangeRate;

class UpdateExchangeRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'exchange:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch and store latest EUR exchange rates from exchangerate.host (ECB)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Fetching latest exchange rates...');

        $endpoint = config('services.exchange_rates.endpoint', 'https://api.exchangerate.host/latest?base=EUR');

        $response = Http::timeout(15)->get($endpoint);
        if (! $response->ok()) {
            $this->error('Failed to fetch rates: '.$response->status());
            return self::FAILURE;
        }

        $payload = $response->json();
        if (! isset($payload['rates'])) {
            $this->error('Invalid payload from provider.');
            return self::FAILURE;
        }

        ExchangeRate::create([
            'base_currency' => $payload['base'] ?? 'EUR',
            'rates' => $payload['rates'],
            'rates_date' => isset($payload['date']) ? date('Y-m-d', strtotime($payload['date'])) : null,
            'fetched_at' => now(),
        ]);

        $this->info('Exchange rates updated.');
        return self::SUCCESS;
    }
}
