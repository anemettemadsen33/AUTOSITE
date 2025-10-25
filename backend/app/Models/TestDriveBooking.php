<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestDriveBooking extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'vehicle_id',
        'dealer_id',
        'preferred_date',
        'preferred_time',
        'status',
        'contact_name',
        'contact_phone',
        'contact_email',
        'notes',
        'dealer_notes',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'preferred_date' => 'datetime',
        ];
    }

    /**
     * Booking belongs to user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Booking belongs to vehicle
     */
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Booking belongs to dealer
     */
    public function dealer()
    {
        return $this->belongsTo(Dealer::class);
    }

    /**
     * Scope: Pending bookings
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope: Confirmed bookings
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }
}
