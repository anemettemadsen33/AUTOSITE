<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Get public settings
     */
    public function index(Request $request)
    {
        $query = Setting::public();

        if ($request->has('group')) {
            $query->group($request->group);
        }

        $settings = $query->get()->mapWithKeys(function ($setting) {
            return [$setting->key => $setting->value];
        });

        return response()->json([
            'data' => $settings,
        ]);
    }

    /**
     * Get a specific setting by key
     */
    public function show($key)
    {
        $setting = Setting::where('key', $key)->where('is_public', true)->firstOrFail();

        return response()->json([
            'data' => [
                'key' => $setting->key,
                'value' => $setting->value,
            ],
        ]);
    }
}
