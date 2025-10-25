<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Requests\VehicleRequest;

/**
 * @OA\Tag(
 *     name="Vehicles",
 *     description="Vehicle listing and management"
 * )
 */
class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/api/vehicles",
     *     tags={"Vehicles"},
     *     @OA\Parameter(name="make", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="model", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="year_min", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="year_max", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="price_min", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="price_max", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="mileage_min", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="mileage_max", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="fuel_type", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="transmission", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="body_type", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="color", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="country", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="city", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="page", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="per_page", in="query", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Vehicles list")
     * )
     */
    public function index(Request $request)
    {
        $query = Vehicle::query()->where('status', 'published');

        if ($make = $request->query('make')) {
            $query->where('make', 'like', "%$make%");
        }
        if ($model = $request->query('model')) {
            $query->where('model', 'like', "%$model%");
        }
        if ($yearMin = $request->query('year_min')) {
            $query->where('year', '>=', (int) $yearMin);
        }
        if ($yearMax = $request->query('year_max')) {
            $query->where('year', '<=', (int) $yearMax);
        }
        if ($priceMin = $request->query('price_min')) {
            $query->where('price_amount', '>=', (int) $priceMin);
        }
        if ($priceMax = $request->query('price_max')) {
            $query->where('price_amount', '<=', (int) $priceMax);
        }
        if ($mileageMin = $request->query('mileage_min')) {
            $query->where('mileage', '>=', (int) $mileageMin);
        }
        if ($mileageMax = $request->query('mileage_max')) {
            $query->where('mileage', '<=', (int) $mileageMax);
        }
        if ($fuel = $request->query('fuel_type')) {
            $query->where('fuel_type', $fuel);
        }
        if ($trans = $request->query('transmission')) {
            $query->where('transmission', $trans);
        }
        if ($body = $request->query('body_type')) {
            $query->where('body_type', $body);
        }
        if ($color = $request->query('color')) {
            $query->where('color', $color);
        }
        if ($city = $request->query('city')) {
            $query->where('location_city', 'like', "%$city%");
        }
        if ($country = $request->query('country')) {
            $query->where('location_country', $country);
        }

        $sort = $request->query('sort', '-published_at');
        if ($sort) {
            $direction = str_starts_with($sort, '-') ? 'desc' : 'asc';
            $column = ltrim($sort, '-');
            $query->orderBy($column, $direction);
        }

        $paginator = $query->paginate($request->integer('per_page', 20))->appends($request->query());

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
            ],
        ]);
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
    /**
     * @OA\Post(
     *     path="/api/vehicles",
     *     tags={"Vehicles"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(required=true),
     *     @OA\Response(response=201, description="Vehicle created")
     * )
     */
    public function store(VehicleRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $vehicle = Vehicle::create($data);

        // Generate slug if missing
        if (empty($vehicle->slug)) {
            $base = trim(($vehicle->make ? $vehicle->make.' ' : '').($vehicle->model ?? '').' '.($vehicle->year ?? ''));
            $slug = \Illuminate\Support\Str::slug($base ?: 'vehicle');
            $vehicle->slug = $slug.'-'.$vehicle->id;
            $vehicle->save();
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $vehicle->addMedia($image)->toMediaCollection('images');
            }
        }

        return response()->json($vehicle->load('dealer'), 201);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/vehicles/{id}",
     *     tags={"Vehicles"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Parameter(name="currency", in="query", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Vehicle details")
     * )
     */
    public function show(Vehicle $vehicle, Request $request)
    {
        $vehicle->load('dealer');

        // Collect media URLs
        $images = $vehicle->getMedia('images')->map(fn($m) => [
            'url' => $m->getUrl(),
            'thumb' => $m->getUrl('thumb') ?? $m->getUrl(),
        ]);

        // Price conversion
        $target = $request->query('currency');
        $converted = null;
        if (! $target) {
            $default = \App\Models\Setting::where('key', 'default_currency')->value('value');
            $target = is_string($default) ? $default : (is_array($default) ? ($default['code'] ?? null) : null);
        }
        if ($vehicle->price_amount && $vehicle->price_currency && $target && strtoupper($target) !== strtoupper($vehicle->price_currency)) {
            $rates = \App\Models\ExchangeRate::query()->latest('fetched_at')->first();
            if ($rates && is_array($rates->rates)) {
                $from = strtoupper($vehicle->price_currency);
                $to = strtoupper($target);
                $amount = (float) $vehicle->price_amount; // assume major units for now
                $base = strtoupper($rates->base_currency ?? 'EUR');

                // Convert from->base->to using provided rates map
                $toBase = $from === $base ? 1.0 : (isset($rates->rates[$from]) ? 1.0 / (float) $rates->rates[$from] : null);
                $fromBaseToTarget = $to === $base ? 1.0 : (isset($rates->rates[$to]) ? (float) $rates->rates[$to] : null);
                if ($toBase && $fromBaseToTarget) {
                    $convertedAmount = $amount * $toBase * $fromBaseToTarget;
                    $converted = [
                        'amount' => round($convertedAmount, 2),
                        'currency' => $to,
                    ];
                }
            }
        }

        return response()->json([
            'data' => [
                'id' => $vehicle->id,
                'slug' => $vehicle->slug,
                'make' => $vehicle->make,
                'model' => $vehicle->model,
                'year' => $vehicle->year,
                'mileage' => $vehicle->mileage,
                'fuel_type' => $vehicle->fuel_type,
                'transmission' => $vehicle->transmission,
                'body_type' => $vehicle->body_type,
                'color' => $vehicle->color,
                'vin' => $vehicle->vin,
                'title' => $vehicle->title,
                'description' => $vehicle->description,
                'meta_title' => $vehicle->meta_title,
                'meta_description' => $vehicle->meta_description,
                'price' => [
                    'amount' => $vehicle->price_amount,
                    'currency' => $vehicle->price_currency,
                    'converted' => $converted,
                ],
                'location' => [
                    'country' => $vehicle->location_country,
                    'city' => $vehicle->location_city,
                ],
                'status' => $vehicle->status,
                'published_at' => optional($vehicle->published_at)->toDateTimeString(),
                'dealer' => $vehicle->dealer,
                'images' => $images,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/vehicles/{id}",
     *     tags={"Vehicles"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true),
     *     @OA\Response(response=200, description="Vehicle updated")
     * )
     */
    public function update(VehicleRequest $request, Vehicle $vehicle)
    {
        if ($request->user()->id !== $vehicle->user_id) {
            abort(403);
        }
        $vehicle->update($request->validated());

        // Regenerate slug if changed core fields and slug empty
        if (empty($vehicle->slug)) {
            $base = trim(($vehicle->make ? $vehicle->make.' ' : '').($vehicle->model ?? '').' '.($vehicle->year ?? ''));
            $slug = \Illuminate\Support\Str::slug($base ?: 'vehicle');
            $vehicle->slug = $slug.'-'.$vehicle->id;
            $vehicle->save();
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $vehicle->addMedia($image)->toMediaCollection('images');
            }
        }
        return $vehicle->fresh()->load('dealer');
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/vehicles/{id}",
     *     tags={"Vehicles"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=204, description="Vehicle deleted")
     * )
     */
    public function destroy(Vehicle $vehicle)
    {
        if (request()->user()->id !== $vehicle->user_id) {
            abort(403);
        }
        $vehicle->delete();
        return response()->noContent();
    }
}
