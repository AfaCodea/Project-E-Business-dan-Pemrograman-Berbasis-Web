<?php

namespace App\Http\Middleware;

use App\Models\SsoSession;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SsoMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $ssoToken = $request->query('sso_token');
        $applicationSlug = $request->query('app_slug');

        if ($ssoToken && $applicationSlug) {
            // Validate SSO token
            $ssoSession = SsoSession::where('session_token', $ssoToken)
                ->where('application_slug', $applicationSlug)
                ->where('is_active', true)
                ->where('expires_at', '>', now())
                ->first();

            if ($ssoSession) {
                // Update last activity
                $ssoSession->updateActivity();
                
                // Authenticate user
                Auth::loginUsingId($ssoSession->user_id);
                
                // Remove SSO parameters from URL
                return redirect($request->url());
            }
        }

        return $next($request);
    }
}