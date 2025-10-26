<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleConfiguration extends Model
{
    protected $fillable = [
        'user_id',
        'vehicle_id',
        'exterior_color',
        'interior_color',
        'wheels',
        'options',
        'total_price',
        'session_id',
    ];

    protected $casts = [
        'options' => 'array',
        'total_price' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}
