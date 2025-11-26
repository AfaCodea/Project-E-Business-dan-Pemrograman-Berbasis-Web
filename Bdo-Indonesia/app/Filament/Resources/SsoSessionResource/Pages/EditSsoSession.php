<?php

namespace App\Filament\Resources\SsoSessionResource\Pages;

use App\Filament\Resources\SsoSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSsoSession extends EditRecord
{
    protected static string $resource = SsoSessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}