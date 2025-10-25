<?php

namespace App\Filament\Admin\Resources\PartnerTokens\Pages;

use App\Filament\Admin\Resources\PartnerTokens\PartnerTokenResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditPartnerToken extends EditRecord
{
    protected static string $resource = PartnerTokenResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
