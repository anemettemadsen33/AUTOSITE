<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PriceAlert extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'make', 'model', 'year_from', 'year_to', 'target_price', 'condition', 'active', 'last_triggered_at'];

    protected $casts = [
        'target_price' => 'decimal:2',
        'active' => 'boolean',
        'last_triggered_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function checkForMatches()
    {
        $query = Vehicle::query()->where('status', 'available');
        if ($this->make) $query->where('make', $this->make);
        if ($this->model) $query->where('model', $this->model);
        if ($this->year_from) $query->where('year', '>=', $this->year_from);
        if ($this->year_to) $query->where('year', '<=', $this->year_to);
        
        if ($this->condition === 'below') {
            $query->where('price', '<=', $this->target_price);
        } else {
            $query->where('price', '>=', $this->target_price);
        }
        
        return $query->get();
    }
}
