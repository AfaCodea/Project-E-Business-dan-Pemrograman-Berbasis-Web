<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Services\SsoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        $applications = Application::active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->groupBy('category');

        return view('welcome', compact('applications'));
    }

    /**
     * Handle SSO redirection
     */
    public function sso(Request $request, string $slug, SsoService $ssoService)
    {
        $application = Application::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        if (!Auth::check()) {
            // Store intended URL and redirect to login
            session(['intended_sso_url' => route('sso', $slug)]);
            return redirect()->route('filament.bdo.auth.login');
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        // Check if user has permission for this application
        if (!$ssoService->userHasPermission($user, $application)) {
            abort(403, 'You do not have permission to access this application.');
        }

        // Generate SSO URL and redirect
        $ssoUrl = $ssoService->generateSsoUrl(
            $user,
            $application,
            $request->ip(),
            $request->userAgent()
        );

        return redirect($ssoUrl);
    }
}