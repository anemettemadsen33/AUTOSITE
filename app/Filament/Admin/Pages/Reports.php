<?php

namespace App\Filament\Admin\Pages;

use Filament\Pages\Page;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\Subscription;
use Illuminate\Support\Carbon;
use UnitEnum;
use BackedEnum;

class Reports extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-chart-bar';

    protected string $view = 'filament.admin.pages.reports';

    protected static string|UnitEnum|null $navigationGroup = 'Analytics';

    protected static ?string $navigationLabel = 'Reports & Analytics';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'date_from' => now()->subMonth()->format('Y-m-d'),
            'date_to' => now()->format('Y-m-d'),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                DatePicker::make('date_from')
                    ->label('From Date')
                    ->default(now()->subMonth())
                    ->native(false),
                
                DatePicker::make('date_to')
                    ->label('To Date')
                    ->default(now())
                    ->native(false),
            ])
            ->statePath('data');
    }

    protected function getHeaderWidgets(): array
    {
        return [
            \App\Filament\Admin\Widgets\Reports\VehicleStats::class,
            \App\Filament\Admin\Widgets\Reports\UserGrowthChart::class,
            \App\Filament\Admin\Widgets\Reports\RevenueChart::class,
        ];
    }

    public function getStats(): array
    {
        $dateFrom = Carbon::parse($this->data['date_from'] ?? now()->subMonth());
        $dateTo = Carbon::parse($this->data['date_to'] ?? now());

        return [
            'total_vehicles' => Vehicle::whereBetween('created_at', [$dateFrom, $dateTo])->count(),
            'total_users' => User::whereBetween('created_at', [$dateFrom, $dateTo])->count(),
            'total_revenue' => Subscription::where('status', 'active')
                ->whereBetween('created_at', [$dateFrom, $dateTo])
                ->sum('amount'),
            'active_subscriptions' => Subscription::where('status', 'active')
                ->whereBetween('created_at', [$dateFrom, $dateTo])
                ->count(),
        ];
    }
}