<?php

namespace App\Filament\Admin\Resources\PartnerTokens\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PartnerTokenForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Partner Name')
                    ->required()
                    ->maxLength(255),
                
                TextInput::make('token')
                    ->label('API Token')
                    ->placeholder('Leave empty to auto-generate')
                    ->required()
                    ->maxLength(64)
                    ->unique(ignoreRecord: true)
                    ->suffixAction(
                        Action::make('generate')
                            ->label('Generate')
                            ->icon('heroicon-m-arrow-path')
                            ->action(fn (Set $set) => $set('token', Str::random(64)))
                    )
                    ->helperText('Leave empty to auto-generate a token or click Generate')
                    ->columnSpanFull(),
                
                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true)
                    ->required(),
                
                Textarea::make('description')
                    ->label('Description')
                    ->rows(3)
                    ->maxLength(1000)
                    ->columnSpanFull(),
            ]);
    }
}
