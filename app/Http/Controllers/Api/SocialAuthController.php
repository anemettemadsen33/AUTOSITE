<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    /**
     * Redirect to provider
     */
    public function redirect(string $provider)
    {
        $this->validateProvider($provider);
        
        return Socialite::driver($provider)->stateless()->redirect();
    }

    /**
     * Handle provider callback
     */
    public function callback(string $provider)
    {
        $this->validateProvider($provider);

        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to authenticate with ' . $provider,
                'error' => $e->getMessage()
            ], 400);
        }

        // Find or create user
        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'name' => $socialUser->getName() ?? $socialUser->getNickname() ?? 'User',
                'email' => $socialUser->getEmail(),
                'password' => Hash::make(Str::random(32)), // Random password
                'email_verified_at' => now(), // Social accounts are pre-verified
                'role' => 'user',
            ]);
        }

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully via ' . ucfirst($provider),
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Validate provider
     */
    protected function validateProvider(string $provider)
    {
        if (!in_array($provider, ['google', 'facebook'])) {
            abort(404, 'Invalid provider');
        }
    }
}
