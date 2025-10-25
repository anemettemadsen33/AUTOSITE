<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'is_published',
        'published_at',
        'user_id',
        'views',
    ];

    protected $casts = [
        'title' => 'array',
        'slug' => 'array',
        'excerpt' => 'array',
        'content' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Get the author of the post
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get translated title for current locale
     */
    public function getTitle(string $locale = 'en'): string
    {
        return $this->title[$locale] ?? $this->title['en'] ?? '';
    }

    /**
     * Get translated slug for current locale
     */
    public function getSlug(string $locale = 'en'): string
    {
        return $this->slug[$locale] ?? $this->slug['en'] ?? '';
    }

    /**
     * Get translated excerpt for current locale
     */
    public function getExcerpt(string $locale = 'en'): ?string
    {
        return $this->excerpt[$locale] ?? $this->excerpt['en'] ?? null;
    }

    /**
     * Get translated content for current locale
     */
    public function getContent(string $locale = 'en'): string
    {
        return $this->content[$locale] ?? $this->content['en'] ?? '';
    }

    /**
     * Increment views counter
     */
    public function incrementViews(): void
    {
        $this->increment('views');
    }

    /**
     * Scope for published posts
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)
                     ->whereNotNull('published_at')
                     ->where('published_at', '<=', now());
    }

    /**
     * Scope for ordering by latest
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('published_at', 'desc');
    }
}
