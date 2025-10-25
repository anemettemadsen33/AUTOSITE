<?php

namespace App\Filament\Admin\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\Subscription;
use Illuminate\Support\Facades\DB;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        // Total Vehicles
        $totalVehicles = Vehicle::count();
        $vehiclesThisMonth = Vehicle::whereMonth('created_at', now()->month)->count();
        $vehiclesLastMonth = Vehicle::whereMonth('created_at', now()->subMonth()->month)->count();
        $vehicleGrowth = $vehiclesLastMonth > 0 
            ? round((($vehiclesThisMonth - $vehiclesLastMonth) / $vehiclesLastMonth) * 100, 1) 
            : 0;

        // Active Dealers
        $activeDealers = User::where('role', 'dealer')
            ->whereHas('vehicles', function($q) {
                $q->where('status', 'available');
            })
            ->count();

        // Total Revenue
        $totalRevenue = Subscription::where('status', 'active')->sum('amount');
        $revenueThisMonth = Subscription::where('status', 'active')
            ->whereMonth('created_at', now()->month)
            ->sum('amount');

        // Active Subscriptions
        $activeSubscriptions = Subscription::where('status', 'active')->count();
        $subscriptionsThisMonth = Subscription::where('status', 'active')
            ->whereMonth('created_at', now()->month)
            ->count();

        return [
            Stat::make('Total Vehicles', number_format($totalVehicles))
                ->description($vehicleGrowth >= 0 ? "+{$vehicleGrowth}% from last month" : "{$vehicleGrowth}% from last month")
                ->descriptionIcon($vehicleGrowth >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($vehicleGrowth >= 0 ? 'success' : 'danger')
                ->chart([7, 12, 8, 15, 18, 22, $vehiclesThisMonth]),

            Stat::make('Active Dealers', number_format($activeDealers))
                ->description('Dealers with active listings')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info'),

            Stat::make('Revenue', '€' . number_format($totalRevenue, 2))
                ->description('€' . number_format($revenueThisMonth, 2) . ' this month')
                ->descriptionIcon('heroicon-m-currency-euro')
                ->color('success'),

            Stat::make('Active Subscriptions', number_format($activeSubscriptions))
                ->description("+{$subscriptionsThisMonth} new this month")
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('warning'),
        ];
    }
}
