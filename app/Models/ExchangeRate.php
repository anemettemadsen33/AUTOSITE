<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class ExchangeRate extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $fillable = [
        'base_currency',
        'rates',
        'rates_date',
        'fetched_at',
    ];

    protected $casts = [
        'rates' => 'array',
        'rates_date' => 'date',
        'fetched_at' => 'datetime',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('exchange_rates')
            ->logFillable()
            ->logOnlyDirty();
    }

    public function activities(): MorphMany
    {
        return $this->morphMany(\Spatie\Activitylog\Models\Activity::class, 'subject');
    }
}
