<?php

namespace App\Http\Controllers;

use App\Models\ExchangeRate;
use App\Services\CurrencyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExchangeRateController extends Controller
{
    protected $currencyService;

    public function __construct(CurrencyService $currencyService)
    {
        $this->currencyService = $currencyService;
    }

    /**
     * Get latest exchange rates
     */
    public function index(): JsonResponse
    {
        $rates = $this->currencyService->getLatestRates();

        return response()->json([
            'base_currency' => 'EUR',
            'rates' => $rates,
            'supported_currencies' => $this->currencyService->getSupportedCurrencies(),
        ]);
    }

    /**
     * Convert currency
     */
    public function convert(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'from' => 'required|string|size:3',
            'to' => 'required|string|size:3',
        ]);

        try {
            $convertedAmount = $this->currencyService->convert(
                $validated['amount'],
                strtoupper($validated['from']),
                strtoupper($validated['to'])
            );

            return response()->json([
                'original_amount' => $validated['amount'],
                'from_currency' => strtoupper($validated['from']),
                'to_currency' => strtoupper($validated['to']),
                'converted_amount' => $convertedAmount,
                'formatted' => $this->currencyService->format($convertedAmount, strtoupper($validated['to'])),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update exchange rates manually
     */
    public function update(): JsonResponse
    {
        $success = $this->currencyService->updateRates();

        if ($success) {
            return response()->json([
                'message' => 'Exchange rates updated successfully',
            ]);
        }

        return response()->json([
            'message' => 'Failed to update exchange rates',
        ], 500);
    }
}
