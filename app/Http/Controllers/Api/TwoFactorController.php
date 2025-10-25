<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TwoFactorController extends Controller
{
    public function enable(Request $request)
    {
        $user = Auth::user();
        if ($user->two_factor_secret) {
            return response()->json(['message' => 'Two-factor authentication is already enabled'], 400);
        }

        $user->enableTwoFactorAuthentication();

        return response()->json([
            'message' => 'Two-factor authentication enabled',
            'qr_code' => $user->twoFactorQrCodeUrl(),
            'qr_code_svg' => $user->twoFactorQrCodeSvg(),
            'recovery_codes' => json_decode(decrypt($user->two_factor_recovery_codes), true),
            'secret' => decrypt($user->two_factor_secret),
        ]);
    }

    public function confirm(Request $request)
    {
        $request->validate(['code' => 'required|string']);
        $user = Auth::user();

        if (!$user->two_factor_secret) {
            return response()->json(['message' => 'Two-factor authentication is not enabled'], 400);
        }

        $confirmed = $user->confirmTwoFactorAuth($request->code);
        if (!$confirmed) {
            return response()->json(['message' => 'Invalid authentication code'], 400);
        }

        $user->two_factor_confirmed_at = now();
        $user->save();

        return response()->json(['message' => 'Two-factor authentication confirmed successfully']);
    }

    public function disable(Request $request)
    {
        $request->validate(['password' => 'required|string']);
        $user = Auth::user();

        if (!password_verify($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password'], 400);
        }

        $user->disableTwoFactorAuthentication();
        return response()->json(['message' => 'Two-factor authentication disabled successfully']);
    }

    public function recoveryCodes()
    {
        $user = Auth::user();
        if (!$user->two_factor_secret) {
            return response()->json(['message' => 'Two-factor authentication is not enabled'], 400);
        }

        return response()->json(['recovery_codes' => json_decode(decrypt($user->two_factor_recovery_codes), true)]);
    }

    public function regenerateRecoveryCodes(Request $request)
    {
        $user = Auth::user();
        if (!$user->two_factor_secret) {
            return response()->json(['message' => 'Two-factor authentication is not enabled'], 400);
        }

        $user->replaceRecoveryCodes();
        return response()->json([
            'message' => 'Recovery codes regenerated successfully',
            'recovery_codes' => json_decode(decrypt($user->two_factor_recovery_codes), true)
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate(['code' => 'required|string']);
        $user = Auth::user();

        if (!$user->two_factor_secret) {
            return response()->json(['message' => 'Two-factor authentication is not enabled'], 400);
        }

        $isValid = app(\Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider::class)
            ->verify(decrypt($user->two_factor_secret), $request->code);

        if (!$isValid) {
            return response()->json(['message' => 'Invalid authentication code'], 400);
        }

        return response()->json(['message' => 'Code verified successfully', 'valid' => true]);
    }
}
