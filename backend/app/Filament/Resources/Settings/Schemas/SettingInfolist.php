<?php

namespace App\Filament\Resources\Settings\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SettingInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('key'),
                TextEntry::make('value')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('type'),
                TextEntry::make('group'),
                IconEntry::make('is_public')
                    ->boolean(),
                TextEntry::make('description')
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
