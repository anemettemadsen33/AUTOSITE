<?php

namespace App\Filament\Imports;

use App\Models\Vehicle;
use Filament\Actions\Imports\ImportColumn;
use Filament\Actions\Imports\Importer;
use Filament\Actions\Imports\Models\Import;
use Illuminate\Support\Number;

class VehicleImporter extends Importer
{
    protected static ?string $model = Vehicle::class;

    public static function getColumns(): array
    {
        return [
            ImportColumn::make('user')
                ->requiredMapping()
                ->relationship()
                ->rules(['required']),
            ImportColumn::make('dealer')
                ->relationship(),
            ImportColumn::make('make')
                ->requiredMapping()
                ->rules(['required']),
            ImportColumn::make('model')
                ->requiredMapping()
                ->rules(['required']),
            ImportColumn::make('year')
                ->requiredMapping()
                ->numeric()
                ->rules(['required', 'integer']),
            ImportColumn::make('mileage')
                ->requiredMapping()
                ->numeric()
                ->rules(['required', 'integer']),
            ImportColumn::make('fuel_type'),
            ImportColumn::make('transmission'),
            ImportColumn::make('body_type'),
            ImportColumn::make('color'),
            ImportColumn::make('vin'),
            ImportColumn::make('title'),
            ImportColumn::make('description'),
            ImportColumn::make('price_amount')
                ->numeric()
                ->rules(['integer']),
            ImportColumn::make('price_currency'),
            ImportColumn::make('location_country'),
            ImportColumn::make('location_city'),
            ImportColumn::make('status')
                ->requiredMapping()
                ->rules(['required']),
            ImportColumn::make('published_at')
                ->rules(['datetime']),
            ImportColumn::make('slug')
                ->requiredMapping()
                ->rules(['required']),
            ImportColumn::make('meta_title'),
            ImportColumn::make('meta_description'),
        ];
    }

    public function resolveRecord(): Vehicle
    {
        return new Vehicle();
    }

    public static function getCompletedNotificationBody(Import $import): string
    {
        $body = 'Your vehicle import has completed and ' . Number::format($import->successful_rows) . ' ' . str('row')->plural($import->successful_rows) . ' imported.';

        if ($failedRowsCount = $import->getFailedRowsCount()) {
            $body .= ' ' . Number::format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to import.';
        }

        return $body;
    }
}
