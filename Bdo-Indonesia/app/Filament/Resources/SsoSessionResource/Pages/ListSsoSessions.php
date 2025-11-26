<?php

namespace App\Filament\Resources\SsoSessionResource\Pages;

use App\Filament\Resources\SsoSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSsoSessions extends ListRecords
{
    protected static string $resource = SsoSessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}