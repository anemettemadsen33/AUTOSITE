<?php

namespace App\Filament\Admin\Resources\Vehicles\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class VehicleInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user.name')
                    ->numeric(),
                TextEntry::make('dealer.name')
                    ->numeric(),
                TextEntry::make('make'),
                TextEntry::make('model'),
                TextEntry::make('year')
                    ->numeric(),
                TextEntry::make('mileage')
                    ->numeric(),
                TextEntry::make('fuel_type'),
                TextEntry::make('transmission'),
                TextEntry::make('body_type'),
                TextEntry::make('color'),
                TextEntry::make('vin'),
                TextEntry::make('price_amount')
                    ->numeric(),
                TextEntry::make('price_currency'),
                TextEntry::make('location_country'),
                TextEntry::make('location_city'),
                TextEntry::make('status'),
                TextEntry::make('published_at')
                    ->dateTime(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
                TextEntry::make('slug'),
                TextEntry::make('meta_title'),
            ]);
    }
}
