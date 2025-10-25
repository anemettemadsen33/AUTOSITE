<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SavedSearch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedSearchController extends Controller
{
    public function index()
    {
        $searches = Auth::user()->savedSearches()->latest()->get();
        return response()->json($searches);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'criteria' => 'required|array',
            'notify' => 'boolean',
        ]);

        $search = Auth::user()->savedSearches()->create($validated);
        return response()->json(['message' => 'Search saved successfully', 'search' => $search], 201);
    }

    public function show(SavedSearch $savedSearch)
    {
        if ($savedSearch->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $matches = $savedSearch->getMatchingVehicles();
        return response()->json(['search' => $savedSearch, 'matches' => $matches, 'match_count' => $matches->count()]);
    }

    public function update(Request $request, SavedSearch $savedSearch)
    {
        if ($savedSearch->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'string|max:255',
            'criteria' => 'array',
            'notify' => 'boolean',
        ]);

        $savedSearch->update($validated);
        return response()->json(['message' => 'Search updated successfully', 'search' => $savedSearch]);
    }

    public function destroy(SavedSearch $savedSearch)
    {
        if ($savedSearch->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $savedSearch->delete();
        return response()->json(['message' => 'Search deleted successfully']);
    }
}
