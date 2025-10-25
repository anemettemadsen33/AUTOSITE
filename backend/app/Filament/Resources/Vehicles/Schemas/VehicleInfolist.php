<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use App\Models\Vehicle;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class VehicleInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user_id')
                    ->numeric(),
                TextEntry::make('dealer_id')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('slug'),
                TextEntry::make('vin')
                    ->placeholder('-'),
                TextEntry::make('make'),
                TextEntry::make('model'),
                TextEntry::make('year')
                    ->numeric(),
                TextEntry::make('category')
                    ->placeholder('-'),
                TextEntry::make('price')
                    ->money(),
                TextEntry::make('currency'),
                TextEntry::make('mileage')
                    ->numeric(),
                TextEntry::make('fuel')
                    ->placeholder('-'),
                TextEntry::make('transmission')
                    ->placeholder('-'),
                TextEntry::make('body_type')
                    ->placeholder('-'),
                TextEntry::make('power_hp')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('doors')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('seats')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('engine_size')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('exterior_color')
                    ->placeholder('-'),
                TextEntry::make('interior_color')
                    ->placeholder('-'),
                TextEntry::make('color')
                    ->placeholder('-'),
                TextEntry::make('condition'),
                TextEntry::make('title')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('features')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('location_country')
                    ->placeholder('-'),
                TextEntry::make('location_city')
                    ->placeholder('-'),
                TextEntry::make('location')
                    ->placeholder('-'),
                IconEntry::make('is_featured')
                    ->boolean(),
                IconEntry::make('is_published')
                    ->boolean(),
                TextEntry::make('published_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('views_count')
                    ->numeric(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('deleted_at')
                    ->dateTime()
                    ->visible(fn (Vehicle $record): bool => $record->trashed()),
            ]);
    }
}
