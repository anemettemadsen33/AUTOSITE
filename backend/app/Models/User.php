<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'avatar',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    /**
     * User can have many vehicles
     */
    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }

    /**
     * User can have one dealer profile
     */
    public function dealer()
    {
        return $this->hasOne(Dealer::class);
    }

    /**
     * User favorites
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    /**
     * User comparisons
     */
    public function comparisons()
    {
        return $this->hasMany(Comparison::class);
    }

    /**
     * Sent messages
     */
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Received messages
     */
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    /**
     * Test drive bookings
     */
    public function testDriveBookings()
    {
        return $this->hasMany(TestDriveBooking::class);
    }

    /**
     * Dealer reviews
     */
    public function reviews()
    {
        return $this->hasMany(DealerReview::class);
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is dealer
     */
    public function isDealer(): bool
    {
        return $this->role === 'dealer';
    }

    /**
     * Check if user is buyer
     */
    public function isBuyer(): bool
    {
        return $this->role === 'buyer';
    }
}
