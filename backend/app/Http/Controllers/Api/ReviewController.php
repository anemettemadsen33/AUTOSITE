<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DealerReview;
use App\Models\Dealer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    /**
     * Get reviews for a dealer
     */
    public function index(Request $request, $dealerId)
    {
        $reviews = DealerReview::where('dealer_id', $dealerId)
            ->where('status', 'approved')
            ->with('user:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $dealer = Dealer::findOrFail($dealerId);

        return response()->json([
            'reviews' => $reviews,
            'average_rating' => $dealer->average_rating,
            'total_reviews' => $dealer->reviews()->where('status', 'approved')->count(),
        ]);
    }

    /**
     * Create a new review
     */
    public function store(Request $request, $dealerId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|min:10|max:1000',
            'purchase_verified' => 'boolean',
        ]);

        // Check if user already reviewed this dealer
        $existingReview = DealerReview::where('dealer_id', $dealerId)
            ->where('user_id', $request->user()->id)
            ->first();

        if ($existingReview) {
            return response()->json([
                'message' => 'You have already reviewed this dealer'
            ], 422);
        }

        $review = DealerReview::create([
            'dealer_id' => $dealerId,
            'user_id' => $request->user()->id,
            'rating' => $request->rating,
            'review' => $request->review,
            'purchase_verified' => $request->purchase_verified ?? false,
            'status' => 'pending', // Requires moderation
        ]);

        // Update dealer average rating
        $this->updateDealerRating($dealerId);

        return response()->json([
            'message' => 'Review submitted successfully! It will be published after moderation.',
            'review' => $review->load('user:id,name'),
        ], 201);
    }

    /**
     * Update a review
     */
    public function update(Request $request, $reviewId)
    {
        $review = DealerReview::findOrFail($reviewId);

        // Check if user owns this review
        if ($review->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'review' => 'sometimes|string|min:10|max:1000',
        ]);

        $review->update($request->only(['rating', 'review']));
        $review->status = 'pending'; // Re-moderation required
        $review->save();

        // Update dealer average rating
        $this->updateDealerRating($review->dealer_id);

        return response()->json([
            'message' => 'Review updated successfully',
            'review' => $review,
        ]);
    }

    /**
     * Delete a review
     */
    public function destroy(Request $request, $reviewId)
    {
        $review = DealerReview::findOrFail($reviewId);

        // Check if user owns this review or is admin
        if ($review->user_id !== $request->user()->id && !$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $dealerId = $review->dealer_id;
        $review->delete();

        // Update dealer average rating
        $this->updateDealerRating($dealerId);

        return response()->json(['message' => 'Review deleted successfully']);
    }

    /**
     * Dealer response to review
     */
    public function respond(Request $request, $reviewId)
    {
        $review = DealerReview::findOrFail($reviewId);

        // Check if user is the dealer
        if ($request->user()->dealer_id !== $review->dealer_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'response' => 'required|string|min:10|max:500',
        ]);

        $review->dealer_response = $request->response;
        $review->responded_at = now();
        $review->save();

        return response()->json([
            'message' => 'Response posted successfully',
            'review' => $review,
        ]);
    }

    /**
     * Admin: Approve review
     */
    public function approve(Request $request, $reviewId)
    {
        if (!$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review = DealerReview::findOrFail($reviewId);
        $review->status = 'approved';
        $review->save();

        $this->updateDealerRating($review->dealer_id);

        return response()->json(['message' => 'Review approved']);
    }

    /**
     * Admin: Reject review
     */
    public function reject(Request $request, $reviewId)
    {
        if (!$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review = DealerReview::findOrFail($reviewId);
        $review->status = 'rejected';
        $review->save();

        return response()->json(['message' => 'Review rejected']);
    }

    /**
     * Update dealer average rating
     */
    private function updateDealerRating($dealerId)
    {
        $averageRating = DealerReview::where('dealer_id', $dealerId)
            ->where('status', 'approved')
            ->avg('rating');

        Dealer::where('id', $dealerId)->update([
            'average_rating' => round($averageRating, 2),
        ]);
    }
}
