<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WebhookCall extends Model
{
    use HasFactory;

    protected $fillable = ['webhook_id', 'event', 'payload', 'response_status', 'response_body', 'called_at'];

    protected $casts = [
        'payload' => 'array',
        'called_at' => 'datetime',
    ];

    public function webhook(): BelongsTo
    {
        return $this->belongsTo(Webhook::class);
    }
}
