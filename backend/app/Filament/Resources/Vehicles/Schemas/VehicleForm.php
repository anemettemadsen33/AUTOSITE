<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class VehicleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('dealer_id')
                    ->numeric(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('vin'),
                TextInput::make('make')
                    ->required(),
                TextInput::make('model')
                    ->required(),
                TextInput::make('year')
                    ->required()
                    ->numeric(),
                TextInput::make('category'),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('currency')
                    ->required()
                    ->default('EUR'),
                TextInput::make('mileage')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('fuel'),
                TextInput::make('transmission'),
                TextInput::make('body_type'),
                TextInput::make('power_hp')
                    ->numeric(),
                TextInput::make('doors')
                    ->numeric(),
                TextInput::make('seats')
                    ->numeric(),
                TextInput::make('engine_size')
                    ->numeric(),
                TextInput::make('exterior_color'),
                TextInput::make('interior_color'),
                TextInput::make('color'),
                TextInput::make('condition')
                    ->required()
                    ->default('used'),
                Textarea::make('title')
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Textarea::make('features')
                    ->columnSpanFull(),
                TextInput::make('location_country'),
                TextInput::make('location_city'),
                TextInput::make('location'),
                Toggle::make('is_featured')
                    ->required(),
                Toggle::make('is_published')
                    ->required(),
                DateTimePicker::make('published_at'),
                TextInput::make('views_count')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
