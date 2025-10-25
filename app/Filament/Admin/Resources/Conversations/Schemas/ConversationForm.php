<?php

namespace App\Filament\Admin\Resources\Conversations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ConversationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('subject'),
                Select::make('vehicle_id')
                    ->relationship('vehicle', 'title'),
            ]);
    }
}
