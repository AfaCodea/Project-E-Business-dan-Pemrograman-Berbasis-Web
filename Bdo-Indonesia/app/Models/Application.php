<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'url',
        'icon',
        'category',
        'is_active',
        'requires_sso',
        'permissions',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'requires_sso' => 'boolean',
        'permissions' => 'array',
    ];

    public function ssoSessions(): HasMany
    {
        return $this->hasMany(SsoSession::class, 'application_slug', 'slug');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
