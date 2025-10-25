<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\ExchangeRate;
use App\Models\Vehicle;
 use Illuminate\Http\Request;/**
 * @OA\Tag(name="Settings", description="Settings endpoints")
 */
class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Setting::query()->paginate(50);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Setting::class);
        $data = $request->validate([
            'key' => ['required', 'string', 'max:255', 'unique:settings,key'],
            'value' => ['nullable', 'array'],
        ]);
        return Setting::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        return $setting;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Setting $setting)
    {
        $this->authorize('update', $setting);
        $data = $request->validate([
            'value' => ['nullable', 'array'],
        ]);
        $setting->update($data);
        return $setting;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        $this->authorize('delete', $setting);
        $setting->delete();
        return response()->noContent();
    }

    /**
     * @OA\Get(
     *     path="/api/settings/public",
     *     tags={"Settings"},
     *     @OA\Response(response=200, description="Public settings and exchange rates")
     * )
     */
    public function public(): array
    {
        // Expose a curated set of settings and the latest exchange rates
        $settings = Setting::query()
            ->whereIn('key', [
                'site_name', 'default_currency', 'supported_currencies', 'supported_locales',
                'frontend_url', 'mail_from_name', 'contact_email',
            ])->get()->mapWithKeys(fn($s) => [$s->key => $s->value ?? null])->toArray();

        // Available filters (distinct values from vehicles)
        $filters = [
            'make' => Vehicle::query()->whereNotNull('make')->distinct()->orderBy('make')->pluck('make')->values(),
            'model' => Vehicle::query()->whereNotNull('model')->distinct()->orderBy('model')->pluck('model')->values(),
            'fuel_types' => Vehicle::query()->whereNotNull('fuel_type')->distinct()->orderBy('fuel_type')->pluck('fuel_type')->values(),
            'transmissions' => Vehicle::query()->whereNotNull('transmission')->distinct()->orderBy('transmission')->pluck('transmission')->values(),
            'body_types' => Vehicle::query()->whereNotNull('body_type')->distinct()->orderBy('body_type')->pluck('body_type')->values(),
            'colors' => Vehicle::query()->whereNotNull('color')->distinct()->orderBy('color')->pluck('color')->values(),
        ];

        $rates = ExchangeRate::query()->latest('fetched_at')->first();

        return [
            'settings' => $settings,
            'available_filters' => $filters,
            'exchange_rates' => $rates ? [
                'base' => $rates->base_currency,
                'rates' => $rates->rates,
                'date' => optional($rates->rates_date)->toDateString(),
                'fetched_at' => optional($rates->fetched_at)->toDateTimeString(),
            ] : null,
        ];
    }
}
