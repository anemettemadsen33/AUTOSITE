<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\TestDriveBooking;
use App\Models\Message;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    /**
     * Get dealer dashboard statistics
     */
    public function dealerDashboard(Request $request)
    {
        $dealer = $request->user()->dealer;

        if (!$dealer) {
            return response()->json(['message' => 'Dealer not found'], 404);
        }

        // Total vehicles
        $totalVehicles = Vehicle::where('dealer_id', $dealer->id)->count();
        $activeVehicles = Vehicle::where('dealer_id', $dealer->id)
            ->where('is_published', true)
            ->count();

        // Total views
        $totalViews = Vehicle::where('dealer_id', $dealer->id)
            ->sum('views_count');

        // Total inquiries (messages)
        $totalInquiries = Message::whereHas('vehicle', function ($query) use ($dealer) {
            $query->where('dealer_id', $dealer->id);
        })->count();

        // Total test drives
        $totalTestDrives = TestDriveBooking::where('dealer_id', $dealer->id)->count();
        $pendingTestDrives = TestDriveBooking::where('dealer_id', $dealer->id)
            ->where('status', 'pending')
            ->count();

        // Total favorites
        $totalFavorites = Favorite::whereHas('vehicle', function ($query) use ($dealer) {
            $query->where('dealer_id', $dealer->id);
        })->count();

        // Most viewed vehicles (top 5)
        $topVehicles = Vehicle::where('dealer_id', $dealer->id)
            ->orderBy('views_count', 'desc')
            ->limit(5)
            ->get(['id', 'title', 'slug', 'views_count', 'price']);

        // Views by day (last 30 days)
        $viewsByDay = DB::table('activity_log')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as views'))
            ->where('subject_type', 'App\\Models\\Vehicle')
            ->where('description', 'viewed')
            ->whereIn('subject_id', Vehicle::where('dealer_id', $dealer->id)->pluck('id'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // Revenue estimation (total vehicle prices)
        $totalInventoryValue = Vehicle::where('dealer_id', $dealer->id)
            ->sum('price');

        return response()->json([
            'statistics' => [
                'total_vehicles' => $totalVehicles,
                'active_vehicles' => $activeVehicles,
                'total_views' => $totalViews,
                'total_inquiries' => $totalInquiries,
                'total_test_drives' => $totalTestDrives,
                'pending_test_drives' => $pendingTestDrives,
                'total_favorites' => $totalFavorites,
                'total_inventory_value' => $totalInventoryValue,
            ],
            'top_vehicles' => $topVehicles,
            'views_chart' => $viewsByDay,
        ]);
    }

    /**
     * Get vehicle statistics
     */
    public function vehicleStats(Request $request, $vehicleId)
    {
        $vehicle = Vehicle::findOrFail($vehicleId);

        // Check if user owns this vehicle
        if ($request->user()->dealer_id !== $vehicle->dealer_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Total views
        $totalViews = $vehicle->views_count;

        // Total inquiries
        $totalInquiries = Message::where('vehicle_id', $vehicle->id)->count();

        // Total test drives
        $totalTestDrives = TestDriveBooking::where('vehicle_id', $vehicle->id)->count();

        // Total favorites
        $totalFavorites = Favorite::where('vehicle_id', $vehicle->id)->count();

        // Views by day (last 30 days)
        $viewsByDay = DB::table('activity_log')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as views'))
            ->where('subject_type', 'App\\Models\\Vehicle')
            ->where('subject_id', $vehicle->id)
            ->where('description', 'viewed')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'vehicle' => [
                'id' => $vehicle->id,
                'title' => $vehicle->title,
                'slug' => $vehicle->slug,
                'price' => $vehicle->price,
            ],
            'statistics' => [
                'total_views' => $totalViews,
                'total_inquiries' => $totalInquiries,
                'total_test_drives' => $totalTestDrives,
                'total_favorites' => $totalFavorites,
            ],
            'views_chart' => $viewsByDay,
        ]);
    }

    /**
     * Get admin platform statistics
     */
    public function platformStats(Request $request)
    {
        // Only admins can access
        if (!$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $stats = [
            'total_vehicles' => Vehicle::count(),
            'active_vehicles' => Vehicle::where('is_published', true)->count(),
            'total_dealers' => DB::table('dealers')->count(),
            'total_users' => DB::table('users')->count(),
            'total_views' => Vehicle::sum('views_count'),
            'total_inquiries' => Message::count(),
            'total_test_drives' => TestDriveBooking::count(),
            'total_favorites' => Favorite::count(),
        ];

        // Vehicles by make
        $vehiclesByMake = Vehicle::select('make', DB::raw('COUNT(*) as count'))
            ->groupBy('make')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get();

        // New registrations (last 30 days)
        $newUsers = DB::table('users')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'statistics' => $stats,
            'vehicles_by_make' => $vehiclesByMake,
            'new_users_chart' => $newUsers,
        ]);
    }
}
