<?php

namespace App\Filament\Admin\Resources\Conversations;

use App\Filament\Admin\Resources\Conversations\Pages\CreateConversation;
use App\Filament\Admin\Resources\Conversations\Pages\EditConversation;
use App\Filament\Admin\Resources\Conversations\Pages\ListConversations;
use App\Filament\Admin\Resources\Conversations\Schemas\ConversationForm;
use App\Filament\Admin\Resources\Conversations\Tables\ConversationsTable;
use App\Models\Conversation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class ConversationResource extends Resource
{
    protected static ?string $model = Conversation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChatBubbleLeftRight;

    protected static ?string $recordTitleAttribute = 'subject';

    protected static string|UnitEnum|null $navigationGroup = 'Communication';

    public static function form(Schema $schema): Schema
    {
        return ConversationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ConversationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\MessagesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListConversations::route('/'),
            'create' => CreateConversation::route('/create'),
            'edit' => EditConversation::route('/{record}/edit'),
        ];
    }
}
