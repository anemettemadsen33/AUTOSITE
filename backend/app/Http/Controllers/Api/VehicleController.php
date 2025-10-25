<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExchangeRate;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VehicleController extends Controller
{
    /**
     * List vehicles with filters and pagination
     */
    public function index(Request $request)
    {
        $query = Vehicle::with(['dealer', 'user'])
            ->published()
            ->latest('published_at');

        // Apply filters
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
    public function show($slug)
    {
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
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:'.(date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|integer|min:0',
            'fuel' => 'required|in:petrol,diesel,electric,hybrid,plugin_hybrid,other',
            'transmission' => 'required|in:manual,automatic,semi_automatic',
            'body_type' => 'nullable|in:sedan,suv,coupe,convertible,wagon,van,truck,hatchback,other',
            'condition' => 'required|in:new,used,certified',
            'title' => 'required|array',
            'description' => 'nullable|array',
            'features' => 'nullable|array',
        ]);

        $user = $request->user();

        if (! in_array($user->role, ['dealer', 'admin'])) {
            return response()->json([
                'message' => 'Unauthorized. Only dealers and admins can create vehicles.',
            ], 403);
        }

        $slug = Str::slug($validated['make'].' '.$validated['model'].' '.$validated['year'].' '.uniqid());

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
        $user = $request->user();

        if ($vehicle->user_id !== $user->id && ! $user->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validated = $request->validate([
            'make' => 'sometimes|string|max:255',
            'model' => 'sometimes|string|max:255',
            'year' => 'sometimes|integer|min:1900|max:'.(date('Y') + 1),
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
        $user = $request->user();

        if ($vehicle->user_id !== $user->id && ! $user->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $vehicle->delete();

        return response()->json([
            'message' => 'Vehicle deleted successfully',
        ]);
    }
}
