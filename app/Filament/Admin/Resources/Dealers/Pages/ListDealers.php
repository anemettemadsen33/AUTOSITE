<?php

namespace App\Filament\Admin\Resources\Dealers\Pages;

use App\Filament\Admin\Resources\Dealers\DealerResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDealers extends ListRecords
{
    protected static string $resource = DealerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
