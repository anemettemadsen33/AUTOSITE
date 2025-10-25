<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'base_currency',
        'target_currency',
        'rate',
        'date',
        'source',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'rate' => 'decimal:6',
            'date' => 'date',
        ];
    }

    /**
     * Scope: Latest rates
     */
    public function scopeLatest($query)
    {
        return $query->whereDate('date', now()->toDateString());
    }

    /**
     * Scope: By currency pair
     */
    public function scopeCurrencyPair($query, $base, $target)
    {
        return $query->where('base_currency', $base)
            ->where('target_currency', $target);
    }

    /**
     * Convert amount from base to target currency
     */
    public static function convert($amount, $from, $to)
    {
        if ($from === $to) {
            return $amount;
        }

        $rate = static::latest()
            ->currencyPair($from, $to)
            ->first();

        if (! $rate) {
            return $amount;
        }

        return $amount * $rate->rate;
    }
}
