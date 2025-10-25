<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PartnerToken extends Model
{
    protected $fillable = [
        'name',
        'token',
        'is_active',
        'last_used_at',
        'description',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'last_used_at' => 'datetime',
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->token)) {
                $model->token = self::generateToken();
            }
        });
    }

    /**
     * Generate a unique token
     */
    public static function generateToken(): string
    {
        do {
            $token = Str::random(64);
        } while (self::where('token', $token)->exists());

        return $token;
    }

    /**
     * Verify token is valid and active
     */
    public static function verify(string $token): ?self
    {
        $partnerToken = self::where('token', $token)
            ->where('is_active', true)
            ->first();

        if ($partnerToken) {
            $partnerToken->update(['last_used_at' => now()]);
        }

        return $partnerToken;
    }

    /**
     * Check if token is active
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }
}
