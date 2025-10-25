<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dealer;
use Illuminate\Http\Request;

class DealerController extends Controller
{
    /**
     * List all dealers
     */
    public function index(Request $request)
    {
        $query = Dealer::with('user');

        if ($request->has('verified')) {
            $query->verified();
        }

        if ($request->has('country')) {
            $query->where('country', $request->country);
        }

        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        $perPage = min($request->get('per_page', 15), 100);
        $dealers = $query->paginate($perPage);

        return response()->json([
            'data' => $dealers->items(),
            'meta' => [
                'current_page' => $dealers->currentPage(),
                'last_page' => $dealers->lastPage(),
                'per_page' => $dealers->perPage(),
                'total' => $dealers->total(),
            ],
        ]);
    }

    /**
     * Get a single dealer
     */
    public function show($id)
    {
        $dealer = Dealer::with(['user', 'vehicles' => function ($q) {
            $q->published()->latest()->limit(10);
        }, 'reviews' => function ($q) {
            $q->approved()->latest()->limit(5);
        }])->findOrFail($id);

        $dealer->average_rating = $dealer->averageRating();

        return response()->json([
            'data' => $dealer,
        ]);
    }
}
