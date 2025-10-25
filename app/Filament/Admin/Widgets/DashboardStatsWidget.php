<?php

namespace App\Filament\Admin\Widgets;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Dealer;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Vehicles', Vehicle::count())
                ->description('All vehicles in the system')
                ->descriptionIcon('heroicon-o-rectangle-stack')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5, 3]),
            
            Stat::make('Active Dealers', Dealer::where('status', 'active')->count())
                ->description('Verified and active dealers')
                ->descriptionIcon('heroicon-o-building-storefront')
                ->color('info'),
            
            Stat::make('Registered Users', User::count())
                ->description('Total users')
                ->descriptionIcon('heroicon-o-users')
                ->color('warning'),
            
            Stat::make('Published Vehicles', Vehicle::where('status', 'published')->count())
                ->description('Publicly visible vehicles')
                ->descriptionIcon('heroicon-o-eye')
                ->color('primary'),
        ];
    }
}
