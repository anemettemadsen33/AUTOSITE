<?php

namespace App\Filament\Admin\Resources\Messages\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class MessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required()
                    ->label('Sender'),
                Textarea::make('content')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),
                DateTimePicker::make('read_at')
                    ->label('Read At'),
            ]);
    }
}
