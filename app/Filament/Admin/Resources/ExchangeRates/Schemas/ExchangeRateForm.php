<?php

namespace App\Filament\Admin\Resources\ExchangeRates\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ExchangeRateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('base_currency')
                    ->required()
                    ->default('EUR'),
                Textarea::make('rates')
                    ->required()
                    ->columnSpanFull(),
                DatePicker::make('rates_date'),
                DateTimePicker::make('fetched_at'),
            ]);
    }
}
