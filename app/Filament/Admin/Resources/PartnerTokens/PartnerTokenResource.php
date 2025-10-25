<?php

namespace App\Filament\Admin\Resources\PartnerTokens;

use App\Filament\Admin\Resources\PartnerTokens\Pages\CreatePartnerToken;
use App\Filament\Admin\Resources\PartnerTokens\Pages\EditPartnerToken;
use App\Filament\Admin\Resources\PartnerTokens\Pages\ListPartnerTokens;
use App\Filament\Admin\Resources\PartnerTokens\Pages\ViewPartnerToken;
use App\Filament\Admin\Resources\PartnerTokens\Schemas\PartnerTokenForm;
use App\Filament\Admin\Resources\PartnerTokens\Schemas\PartnerTokenInfolist;
use App\Filament\Admin\Resources\PartnerTokens\Tables\PartnerTokensTable;
use App\Models\PartnerToken;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class PartnerTokenResource extends Resource
{
    protected static ?string $model = PartnerToken::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    
    protected static string|UnitEnum|null $navigationGroup = 'API';
    
    protected static ?int $navigationSort = 10;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return PartnerTokenForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PartnerTokenInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PartnerTokensTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPartnerTokens::route('/'),
            'create' => CreatePartnerToken::route('/create'),
            'view' => ViewPartnerToken::route('/{record}'),
            'edit' => EditPartnerToken::route('/{record}/edit'),
        ];
    }
}
