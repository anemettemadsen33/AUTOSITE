<?php

namespace App\Filament\Admin\Resources\PartnerTokens\Pages;

use App\Filament\Admin\Resources\PartnerTokens\PartnerTokenResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPartnerTokens extends ListRecords
{
    protected static string $resource = PartnerTokenResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
