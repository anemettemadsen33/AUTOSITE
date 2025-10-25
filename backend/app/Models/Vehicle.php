<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Vehicle extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, HasTranslations, InteractsWithMedia, LogsActivity;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'dealer_id',
        'slug',
        'vin',
        'make',
        'model',
        'year',
        'category',
        'price',
        'currency',
        'mileage',
        'fuel',
        'transmission',
        'body_type',
        'power_hp',
        'doors',
        'seats',
        'engine_size',
        'exterior_color',
        'interior_color',
        'color',
        'condition',
        'title',
        'description',
        'features',
        'location_country',
        'location_city',
        'location',
        'is_featured',
        'is_published',
        'published_at',
        'views_count',
    ];

    /**
     * The attributes that are translatable.
     */
    public $translatable = ['title', 'description'];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'price' => 'decimal:2',
            'engine_size' => 'decimal:1',
        ];
    }

    /**
     * Vehicle belongs to user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Vehicle belongs to dealer (optional)
     */
    public function dealer()
    {
        return $this->belongsTo(Dealer::class);
    }

    /**
     * Vehicle favorites
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    /**
     * Vehicle comparisons
     */
    public function comparisons()
    {
        return $this->hasMany(Comparison::class);
    }

    /**
     * Messages about this vehicle
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * Test drive bookings
     */
    public function testDriveBookings()
    {
        return $this->hasMany(TestDriveBooking::class);
    }

    /**
     * Register media collections
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->useFallbackUrl('/images/placeholder-vehicle.jpg')
            ->useFallbackPath(public_path('/images/placeholder-vehicle.jpg'));
    }

    /**
     * Scope: Published vehicles
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope: Featured vehicles
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Increment views count
     */
    public function incrementViews()
    {
        $this->increment('views_count');
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
    
    /**
     * Activity Log Configuration
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['make', 'model', 'year', 'price', 'mileage', 'is_published'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(fn(string $eventName) => "Vehicle {$eventName}");
    }
}
