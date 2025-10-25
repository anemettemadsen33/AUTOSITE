<?php

namespace App\Filament\Admin\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;

class VehicleChart extends ChartWidget
{
    protected ?string $heading = 'Vehicles by Make';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        // Get top 10 makes by vehicle count
        $makeData = Vehicle::select('make', DB::raw('count(*) as count'))
            ->groupBy('make')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Vehicles by Make',
                    'data' => $makeData->pluck('count')->toArray(),
                    'backgroundColor' => [
                        'rgb(59, 130, 246)',
                        'rgb(34, 197, 94)',
                        'rgb(251, 146, 60)',
                        'rgb(168, 85, 247)',
                        'rgb(236, 72, 153)',
                        'rgb(14, 165, 233)',
                        'rgb(132, 204, 22)',
                        'rgb(234, 179, 8)',
                        'rgb(239, 68, 68)',
                        'rgb(156, 163, 175)',
                    ],
                ],
            ],
            'labels' => $makeData->pluck('make')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
