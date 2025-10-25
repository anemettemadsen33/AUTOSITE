<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comparison extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'vehicle_id',
        'order',
    ];

    /**
     * Comparison belongs to user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Comparison belongs to vehicle
     */
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
