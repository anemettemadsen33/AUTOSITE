<?php

namespace App\Filament\Admin\Resources\Conversations\RelationManagers;

use App\Filament\Admin\Resources\Messages\Schemas\MessageForm;
use App\Filament\Admin\Resources\Messages\Tables\MessagesTable;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class MessagesRelationManager extends RelationManager
{
    protected static string $relationship = 'messages';

    public function form(Schema $schema): Schema
    {
        return MessageForm::configure($schema);
    }

    public function table(Table $table): Table
    {
        return MessagesTable::configure($table)
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
