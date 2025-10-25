<?php

namespace App\Filament\Admin\Resources\Vehicles\Tables;

use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\BulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;

class VehiclesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('images')
                    ->circular()
                    ->stacked()
                    ->limit(3)
                    ->limitedRemainingText()
                    ->getStateUsing(fn ($record) => $record->images ? json_decode($record->images, true) : []),
                
                TextColumn::make('make')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                
                TextColumn::make('model')
                    ->searchable()
                    ->sortable(),
                
                TextColumn::make('year')
                    ->numeric()
                    ->sortable(),
                
                TextColumn::make('price_amount')
                    ->label('Price')
                    ->money(fn ($record) => $record->price_currency ?? 'EUR')
                    ->sortable(),
                
                TextColumn::make('mileage')
                    ->numeric()
                    ->sortable()
                    ->suffix(' km')
                    ->toggleable(),
                
                TextColumn::make('fuel_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'electric' => 'success',
                        'hybrid' => 'info',
                        'diesel' => 'warning',
                        default => 'gray',
                    })
                    ->searchable(),
                
                TextColumn::make('transmission')
                    ->searchable()
                    ->toggleable(),
                
                IconColumn::make('featured')
                    ->boolean()
                    ->toggleable(),
                
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'available' => 'success',
                        'sold' => 'danger',
                        'reserved' => 'warning',
                        'pending' => 'gray',
                        default => 'gray',
                    })
                    ->searchable(),
                
                TextColumn::make('user.name')
                    ->label('Owner')
                    ->sortable()
                    ->toggleable(),
                
                TextColumn::make('location_city')
                    ->label('Location')
                    ->formatStateUsing(fn ($record) => "{$record->location_city}, {$record->location_country}")
                    ->searchable(['location_city', 'location_country'])
                    ->toggleable(),
                
                TextColumn::make('views_count')
                    ->label('Views')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('make')
                    ->options(fn () => \App\Models\Vehicle::distinct()->pluck('make', 'make')->toArray()),
                
                SelectFilter::make('fuel_type')
                    ->options([
                        'petrol' => 'Petrol',
                        'diesel' => 'Diesel',
                        'electric' => 'Electric',
                        'hybrid' => 'Hybrid',
                    ]),
                
                SelectFilter::make('status')
                    ->options([
                        'available' => 'Available',
                        'sold' => 'Sold',
                        'reserved' => 'Reserved',
                        'pending' => 'Pending',
                    ]),
                
                TernaryFilter::make('featured')
                    ->label('Featured')
                    ->placeholder('All vehicles')
                    ->trueLabel('Featured only')
                    ->falseLabel('Not featured'),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('approve')
                        ->label('Approve')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(fn (Collection $records) => $records->each->update(['status' => 'available'])),
                    
                    BulkAction::make('reject')
                        ->label('Reject')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->action(fn (Collection $records) => $records->each->update(['status' => 'pending'])),
                    
                    BulkAction::make('feature')
                        ->label('Mark as Featured')
                        ->icon('heroicon-o-star')
                        ->color('warning')
                        ->action(fn (Collection $records) => $records->each->update(['featured' => true])),
                    
                    BulkAction::make('unfeature')
                        ->label('Remove Featured')
                        ->icon('heroicon-o-star')
                        ->action(fn (Collection $records) => $records->each->update(['featured' => false])),
                    
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
