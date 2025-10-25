<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExchangeRate;
use Illuminate\Http\Request;

class ExchangeRateController extends Controller
{
    /**
     * Get latest exchange rates
     */
    public function latest(Request $request)
    {
        $rates = ExchangeRate::latest()
            ->get()
            ->mapWithKeys(function ($rate) {
                return [$rate->target_currency => $rate->rate];
            });

        return response()->json([
            'data' => [
                'base' => 'EUR',
                'rates' => $rates,
                'date' => now()->toDateString(),
            ],
        ]);
    }

    /**
     * Convert amount between currencies
     */
    public function convert(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'from' => 'required|string|size:3',
            'to' => 'required|string|size:3',
        ]);

        $converted = ExchangeRate::convert(
            $validated['amount'],
            $validated['from'],
            $validated['to']
        );

        return response()->json([
            'data' => [
                'from' => $validated['from'],
                'to' => $validated['to'],
                'original_amount' => $validated['amount'],
                'converted_amount' => round($converted, 2),
            ],
        ]);
    }
}
