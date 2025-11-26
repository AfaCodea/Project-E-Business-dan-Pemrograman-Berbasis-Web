<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class SsoSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_token',
        'application_slug',
        'ip_address',
        'user_agent',
        'last_activity',
        'expires_at',
        'is_active',
    ];

    protected $casts = [
        'last_activity' => 'datetime',
        'expires_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class, 'application_slug', 'slug');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)
                    ->where('expires_at', '>', Carbon::now());
    }

    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<=', Carbon::now());
    }

    public function isExpired(): bool
    {
        return $this->expires_at <= Carbon::now();
    }

    public function updateActivity(): void
    {
        $this->update([
            'last_activity' => Carbon::now(),
            'expires_at' => Carbon::now()->addHours(8), // 8 jam session
        ]);
    }
}