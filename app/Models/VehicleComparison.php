<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleComparison extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'session_id', 'vehicle_ids', 'last_accessed_at'];

    protected $casts = [
        'vehicle_ids' => 'array',
        'last_accessed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vehicles()
    {
        return Vehicle::whereIn('id', $this->vehicle_ids ?? [])->get();
    }
}
