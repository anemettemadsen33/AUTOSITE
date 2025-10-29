<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExchangeRate;
use App\Models\Vehicle;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class VehicleController extends Controller
{
    use AuthorizesRequests;
    
    /**
     * List vehicles with filters and pagination
     */
    public function index(Request $request)
    {
        // Set application locale from request (supports 8 EU languages)
        $lang = $request->get('lang', 'en');
        if (in_array($lang, ['en', 'de', 'fr', 'es', 'it', 'pt', 'ro', 'pl'])) {
            app()->setLocale($lang);
        }
        
        $query = Vehicle::with(['dealer', 'user'])
            ->published()
            ->latest('published_at');

        // BASIC FILTERS
        if ($request->has('make')) {
            $query->where('make', $request->make);
        }

        if ($request->has('model')) {
            $query->where('model', $request->model);
        }

        if ($request->has('year_min')) {
            $query->where('year', '>=', $request->year_min);
        }

        if ($request->has('year_max')) {
            $query->where('year', '<=', $request->year_max);
        }

        if ($request->has('price_min')) {
            $query->where('price', '>=', $request->price_min);
        }

        if ($request->has('price_max')) {
            $query->where('price', '<=', $request->price_max);
        }

        if ($request->has('mileage_max')) {
            $query->where('mileage', '<=', $request->mileage_max);
        }
        
        if ($request->has('mileage_min')) {
            $query->where('mileage', '>=', $request->mileage_min);
        }

        if ($request->has('fuel')) {
            $query->where('fuel', $request->fuel);
        }

        if ($request->has('transmission')) {
            $query->where('transmission', $request->transmission);
        }

        if ($request->has('body_type')) {
            $query->where('body_type', $request->body_type);
        }

        if ($request->has('condition')) {
            $query->where('condition', $request->condition);
        }

        if ($request->has('location_country')) {
            $query->where('location_country', $request->location_country);
        }

        if ($request->has('location_city')) {
            $query->where('location_city', $request->location_city);
        }
        
        // ADVANCED FILTERS
        // Power (HP) range
        if ($request->has('power_min')) {
            $query->where('power_hp', '>=', $request->power_min);
        }
        
        if ($request->has('power_max')) {
            $query->where('power_hp', '<=', $request->power_max);
        }
        
        // Engine size range
        if ($request->has('engine_min')) {
            $query->where('engine_size', '>=', $request->engine_min);
        }
        
        if ($request->has('engine_max')) {
            $query->where('engine_size', '<=', $request->engine_max);
        }
        
        // Colors
        if ($request->has('exterior_color')) {
            $query->where('exterior_color', $request->exterior_color);
        }
        
        if ($request->has('interior_color')) {
            $query->where('interior_color', $request->interior_color);
        }
        
        // Doors
        if ($request->has('doors')) {
            $query->where('doors', $request->doors);
        }
        
        // Seats
        if ($request->has('seats')) {
            $query->where('seats', $request->seats);
        }
        
        if ($request->has('seats_min')) {
            $query->where('seats', '>=', $request->seats_min);
        }
        
        // Date posted filter
        if ($request->has('posted_days')) {
            $days = (int) $request->posted_days;
            $query->where('created_at', '>=', now()->subDays($days));
        }
        
        // Distance from location (requires lat/lng)
        if ($request->has('lat') && $request->has('lng') && $request->has('radius_km')) {
            $lat = $request->lat;
            $lng = $request->lng;
            $radius = $request->radius_km;
            
            // Haversine formula for distance calculation
            $query->whereRaw(
                "(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) <= ?",
                [$lat, $lng, $lat, $radius]
            );
        }
        
        // Features filter (JSON contains)
        if ($request->has('features')) {
            $features = is_array($request->features) ? $request->features : explode(',', $request->features);
            foreach ($features as $feature) {
                $query->whereJsonContains('features', trim($feature));
            }
        }

        if ($request->has('is_featured')) {
            $query->where('is_featured', true);
        }

        // Search in title and description
        if ($request->has('query')) {
            $search = $request->query;
            $query->where(function ($q) use ($search) {
                $q->where('make', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('title->en', 'like', "%{$search}%")
                  ->orWhere('description->en', 'like', "%{$search}%");
            });
        }

        // Sorting
        if ($request->has('sort')) {
            switch ($request->sort) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'year_asc':
                    $query->orderBy('year', 'asc');
                    break;
                case 'year_desc':
                    $query->orderBy('year', 'desc');
                    break;
                case 'mileage_asc':
                    $query->orderBy('mileage', 'asc');
                    break;
                case 'mileage_desc':
                    $query->orderBy('mileage', 'desc');
                    break;
            }
        }

        $perPage = min($request->get('per_page', 15), 100);
        $vehicles = $query->paginate($perPage);

        // Add converted prices if currency is requested
        if ($request->has('currency') && $request->currency !== 'EUR') {
            $vehicles->getCollection()->transform(function ($vehicle) use ($request) {
                $vehicle->converted_price = ExchangeRate::convert(
                    $vehicle->price,
                    'EUR',
                    $request->currency
                );
                return $vehicle;
            });
        }

        return response()->json([
            'data' => $vehicles->items(),
            'meta' => [
                'current_page' => $vehicles->currentPage(),
                'last_page' => $vehicles->lastPage(),
                'per_page' => $vehicles->perPage(),
                'total' => $vehicles->total(),
            ],
            'links' => [
                'first' => $vehicles->url(1),
                'last' => $vehicles->url($vehicles->lastPage()),
                'prev' => $vehicles->previousPageUrl(),
                'next' => $vehicles->nextPageUrl(),
            ],
        ]);
    }

    /**
     * Get a single vehicle
     */
    public function show(Request $request, $slug)
    {
        // Set application locale from request
        $lang = $request->get('lang', 'en');
        if (in_array($lang, ['en', 'de', 'fr', 'es', 'it', 'pt', 'ro', 'pl'])) {
            app()->setLocale($lang);
        }
        
        $vehicle = Vehicle::with(['dealer.user', 'user'])
            ->where('slug', $slug)
            ->firstOrFail();

        $vehicle->incrementViews();

        // Get similar vehicles
        $similar = Vehicle::published()
            ->where('id', '!=', $vehicle->id)
            ->where(function ($q) use ($vehicle) {
                $q->where('make', $vehicle->make)
                  ->orWhere('body_type', $vehicle->body_type);
            })
            ->limit(4)
            ->get();

        return response()->json([
            'data' => $vehicle,
            'similar' => $similar,
        ]);
    }

    /**
     * Create a new vehicle (dealer/admin only)
     */
    public function store(Request $request)
    {
        // Authorize using policy
        $this->authorize('create', Vehicle::class);
        
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|integer|min:0',
            'fuel' => 'required|in:petrol,diesel,electric,hybrid,plugin_hybrid,other',
            'transmission' => 'required|in:manual,automatic,semi_automatic',
            'body_type' => 'nullable|in:sedan,suv,coupe,convertible,wagon,van,truck,hatchback,other',
            'condition' => 'required|in:new,used,certified',
            'title' => 'required|array',
            'description' => 'nullable|array',
            'features' => 'nullable|array',
            'location_country' => 'nullable|string|max:2',
            'location_city' => 'nullable|string|max:255',
        ]);

        $user = $request->user();

        $slug = Str::slug($validated['make'] . ' ' . $validated['model'] . ' ' . $validated['year'] . ' ' . uniqid());

        $vehicle = Vehicle::create(array_merge($validated, [
            'user_id' => $user->id,
            'dealer_id' => $user->dealer?->id,
            'slug' => $slug,
            'currency' => 'EUR',
            'is_published' => false,
        ]));

        return response()->json([
            'data' => $vehicle,
            'message' => 'Vehicle created successfully',
        ], 201);
    }

    /**
     * Update a vehicle (owner/admin only)
     */
    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::findOrFail($id);
        
        // Authorize using policy
        $this->authorize('update', $vehicle);

        $validated = $request->validate([
            'make' => 'sometimes|string|max:255',
            'model' => 'sometimes|string|max:255',
            'year' => 'sometimes|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'sometimes|numeric|min:0',
            'mileage' => 'sometimes|integer|min:0',
            'title' => 'sometimes|array',
            'description' => 'sometimes|array',
            'features' => 'sometimes|array',
        ]);

        $vehicle->update($validated);

        return response()->json([
            'data' => $vehicle,
            'message' => 'Vehicle updated successfully',
        ]);
    }

    /**
     * Delete a vehicle (owner/admin only)
     */
    public function destroy(Request $request, $id)
    {
        $vehicle = Vehicle::findOrFail($id);
        
        // Authorize using policy
        $this->authorize('delete', $vehicle);

        $vehicle->delete();

        return response()->json([
            'message' => 'Vehicle deleted successfully',
        ]);
    }
}
