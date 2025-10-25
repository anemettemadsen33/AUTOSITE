<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedSearch extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'criteria',
        'notify',
        'last_notified_at',
    ];

    protected $casts = [
        'criteria' => 'array',
        'notify' => 'boolean',
        'last_notified_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get matching vehicles based on search criteria
     */
    public function getMatchingVehicles()
    {
        $query = Vehicle::query()->where('status', 'available');

        $criteria = $this->criteria;

        if (isset($criteria['make'])) {
            $query->where('make', $criteria['make']);
        }

        if (isset($criteria['model'])) {
            $query->where('model', $criteria['model']);
        }

        if (isset($criteria['year_from'])) {
            $query->where('year', '>=', $criteria['year_from']);
        }

        if (isset($criteria['year_to'])) {
            $query->where('year', '<=', $criteria['year_to']);
        }

        if (isset($criteria['price_min'])) {
            $query->where('price', '>=', $criteria['price_min']);
        }

        if (isset($criteria['price_max'])) {
            $query->where('price', '<=', $criteria['price_max']);
        }

        if (isset($criteria['fuel_type'])) {
            $query->where('fuel_type', $criteria['fuel_type']);
        }

        if (isset($criteria['transmission'])) {
            $query->where('transmission', $criteria['transmission']);
        }

        if (isset($criteria['mileage_max'])) {
            $query->where('mileage', '<=', $criteria['mileage_max']);
        }

        return $query->get();
    }
}
