<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    /**
     * Get all active plans.
     */
    public function index(): JsonResponse
    {
        $plans = Plan::where('is_active', true)
            ->orderBy('price', 'asc')
            ->get();

        return response()->json($plans);
    }

    /**
     * Subscribe to a plan.
     */
    public function subscribe(Request $request, Plan $plan): JsonResponse
    {
        $validated = $request->validate([
            'starts_at' => 'nullable|date',
        ]);

        if (!$plan->is_active) {
            return response()->json(['message' => 'This plan is not available'], 400);
        }

        // Check if user already has an active subscription
        $existingSubscription = $request->user()
            ->activeSubscription()
            ->first();

        if ($existingSubscription) {
            return response()->json([
                'message' => 'You already have an active subscription',
                'subscription' => $existingSubscription->load('plan'),
            ], 400);
        }

        // Calculate subscription dates
        $startsAt = isset($validated['starts_at']) 
            ? \Carbon\Carbon::parse($validated['starts_at']) 
            : now();
        $endsAt = $startsAt->copy()->addDays($plan->duration_days);

        // Create subscription
        $subscription = Subscription::create([
            'user_id' => $request->user()->id,
            'plan_id' => $plan->id,
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Subscription created successfully',
            'subscription' => $subscription->load('plan'),
        ], 201);
    }

    /**
     * Get user's subscriptions.
     */
    public function mySubscriptions(Request $request): JsonResponse
    {
        $subscriptions = $request->user()
            ->subscriptions()
            ->with('plan')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($subscriptions);
    }

    /**
     * Cancel a subscription.
     */
    public function cancel(Request $request, Subscription $subscription): JsonResponse
    {
        // Check ownership
        if ($subscription->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($subscription->status === 'cancelled') {
            return response()->json(['message' => 'Subscription already cancelled'], 400);
        }

        $subscription->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Subscription cancelled successfully',
            'subscription' => $subscription->load('plan'),
        ]);
    }
}
