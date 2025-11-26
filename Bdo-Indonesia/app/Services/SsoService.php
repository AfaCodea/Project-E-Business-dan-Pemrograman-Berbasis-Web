<?php

namespace App\Services;

use App\Models\Application;
use App\Models\SsoSession;
use App\Models\User;
use Illuminate\Support\Str;

class SsoService
{
    /**
     * Generate SSO token for user and application
     */
    public function generateSsoToken(User $user, Application $application, string $ipAddress, string $userAgent): string
    {
        // Deactivate existing sessions for this user and application
        SsoSession::where('user_id', $user->id)
            ->where('application_slug', $application->slug)
            ->where('is_active', true)
            ->update(['is_active' => false]);

        // Generate new session token
        $sessionToken = Str::random(64);
        
        // Create new SSO session
        SsoSession::create([
            'user_id' => $user->id,
            'session_token' => $sessionToken,
            'application_slug' => $application->slug,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'last_activity' => now(),
            'expires_at' => now()->addHours(8), // 8 hours expiry
            'is_active' => true,
        ]);

        return $sessionToken;
    }

    /**
     * Validate SSO token
     */
    public function validateSsoToken(string $token, string $applicationSlug): ?SsoSession
    {
        return SsoSession::where('session_token', $token)
            ->where('application_slug', $applicationSlug)
            ->where('is_active', true)
            ->where('expires_at', '>', now())
            ->first();
    }

    /**
     * Revoke SSO session
     */
    public function revokeSsoSession(string $token): bool
    {
        return SsoSession::where('session_token', $token)
            ->update(['is_active' => false]);
    }

    /**
     * Clean up expired sessions
     */
    public function cleanupExpiredSessions(): int
    {
        return SsoSession::where('expires_at', '<', now())
            ->orWhere('is_active', false)
            ->delete();
    }

    /**
     * Get active sessions for user
     */
    public function getUserActiveSessions(User $user): \Illuminate\Database\Eloquent\Collection
    {
        return SsoSession::where('user_id', $user->id)
            ->where('is_active', true)
            ->where('expires_at', '>', now())
            ->with('application')
            ->orderBy('last_activity', 'desc')
            ->get();
    }

    /**
     * Check if user has permission for application
     */
    public function userHasPermission(User $user, Application $application): bool
    {
        // For now, all authenticated users have access
        // This can be extended with role-based permissions
        return true;
    }

    /**
     * Generate SSO URL for application
     */
    public function generateSsoUrl(User $user, Application $application, string $ipAddress, string $userAgent): string
    {
        $token = $this->generateSsoToken($user, $application, $ipAddress, $userAgent);
        
        $separator = str_contains($application->url, '?') ? '&' : '?';
        
        return $application->url . $separator . http_build_query([
            'sso_token' => $token,
            'app_slug' => $application->slug,
            'user_id' => $user->id,
            'timestamp' => now()->timestamp,
        ]);
    }
}