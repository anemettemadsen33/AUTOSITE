<?php

namespace App\Filament\Admin\Widgets;

use App\Models\Vehicle;
use Filament\Widgets\ChartWidget;

class VehiclesChartsWidget extends ChartWidget
{
    protected ?string $heading = 'Vehicles Overview';

    protected function getData(): array
    {
        $byStatus = Vehicle::query()
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status')
            ->all();

        $months = collect(range(0, 5))
            ->map(fn ($i) => now()->subMonths(5 - $i)->startOfMonth())
            ->values();

        $perMonth = $months->map(fn ($month) => Vehicle::whereBetween('created_at', [$month, (clone $month)->endOfMonth()])->count());

        return [
            'datasets' => [
                [
                    'label' => 'Created (last 6 months)',
                    'data' => $perMonth->toArray(),
                    'borderColor' => '#f59e0b',
                    'backgroundColor' => 'rgba(245, 158, 11, 0.2)',
                ],
            ],
            'labels' => $months->map(fn ($m) => $m->format('M Y'))->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
