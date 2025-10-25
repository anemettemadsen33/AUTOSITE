<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DealerReview extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'dealer_id',
        'rating',
        'comment',
        'status',
        'moderated_at',
        'moderated_by',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'moderated_at' => 'datetime',
        ];
    }

    /**
     * Review belongs to user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Review belongs to dealer
     */
    public function dealer()
    {
        return $this->belongsTo(Dealer::class);
    }

    /**
     * Review moderated by user
     */
    public function moderatedBy()
    {
        return $this->belongsTo(User::class, 'moderated_by');
    }

    /**
     * Scope: Approved reviews
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope: Pending reviews
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
