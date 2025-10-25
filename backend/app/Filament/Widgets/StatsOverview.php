<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $totalVehicles = \App\Models\Vehicle::count();
        $publishedVehicles = \App\Models\Vehicle::published()->count();
        $totalDealers = \App\Models\Dealer::count();
        $verifiedDealers = \App\Models\Dealer::verified()->count();
        $totalUsers = \App\Models\User::count();
        $totalViews = \App\Models\Vehicle::sum('views_count');
        
        return [
            Stat::make('Total Vehicles', $totalVehicles)
                ->description($publishedVehicles . ' published')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5, 3]),
                
            Stat::make('Total Dealers', $totalDealers)
                ->description($verifiedDealers . ' verified')
                ->descriptionIcon('heroicon-m-shield-check')
                ->color('info'),
                
            Stat::make('Total Users', $totalUsers)
                ->description('All registered users')
                ->descriptionIcon('heroicon-m-users')
                ->color('warning'),
                
            Stat::make('Total Views', number_format($totalViews))
                ->description('Vehicle page views')
                ->descriptionIcon('heroicon-m-eye')
                ->color('primary'),
        ];
    }
}
