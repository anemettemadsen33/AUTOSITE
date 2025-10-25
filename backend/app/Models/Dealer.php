<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Dealer extends Model
{
    use HasFactory, SoftDeletes, HasTranslations, LogsActivity;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'company_name',
        'description',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'phone',
        'website',
        'vat',
        'logo',
        'verified',
        'verification_date',
    ];

    /**
     * The attributes that are translatable.
     */
    public $translatable = ['description'];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'verified' => 'boolean',
            'verification_date' => 'datetime',
        ];
    }

    /**
     * Dealer belongs to user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Dealer has many vehicles
     */
    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }

    /**
     * Dealer has many reviews
     */
    public function reviews()
    {
        return $this->hasMany(DealerReview::class);
    }

    /**
     * Dealer has many test drive bookings
     */
    public function testDriveBookings()
    {
        return $this->hasMany(TestDriveBooking::class);
    }

    /**
     * Get average rating
     */
    public function averageRating()
    {
        return $this->reviews()->where('status', 'approved')->avg('rating');
    }

    /**
     * Scope: Verified dealers
     */
    public function scopeVerified($query)
    {
        return $query->where('verified', true);
    }
    
    /**
     * Activity Log Configuration
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['company_name', 'verified', 'phone', 'city', 'country'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Dealer {$eventName}");
    }
}
