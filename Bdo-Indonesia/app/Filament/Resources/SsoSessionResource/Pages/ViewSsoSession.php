<?php

namespace App\Filament\Resources\SsoSessionResource\Pages;

use App\Filament\Resources\SsoSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewSsoSession extends ViewRecord
{
    protected static string $resource = SsoSessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}