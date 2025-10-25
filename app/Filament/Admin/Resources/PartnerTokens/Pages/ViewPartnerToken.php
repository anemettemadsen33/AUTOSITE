<?php

namespace App\Filament\Admin\Resources\PartnerTokens\Pages;

use App\Filament\Admin\Resources\PartnerTokens\PartnerTokenResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPartnerToken extends ViewRecord
{
    protected static string $resource = PartnerTokenResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
