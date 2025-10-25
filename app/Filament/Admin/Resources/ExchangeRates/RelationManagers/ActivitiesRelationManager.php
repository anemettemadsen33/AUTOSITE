<?php

namespace App\Filament\Admin\Resources\ExchangeRates\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Table;

class ActivitiesRelationManager extends RelationManager
{
    protected static string $relationship = 'activities';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('description')
                    ->label('Description')
                    ->wrap(),
                TextColumn::make('event')
                    ->badge(),
                TextColumn::make('causer.email')
                    ->label('By')
                    ->default('-'),
                TextColumn::make('created_at')
                    ->label('At')
                    ->since()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
