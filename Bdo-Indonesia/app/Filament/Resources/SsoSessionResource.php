<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SsoSessionResource\Pages;
use App\Models\SsoSession;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class SsoSessionResource extends Resource
{
    protected static ?string $model = SsoSession::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationLabel = 'SSO Sessions';

    protected static ?string $modelLabel = 'SSO Session';

    protected static ?string $pluralModelLabel = 'SSO Sessions';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Session Details')
                    ->schema([
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required()
                            ->searchable(),
                        Forms\Components\TextInput::make('session_token')
                            ->required()
                            ->maxLength(255)
                            ->disabled(),
                        Forms\Components\TextInput::make('application_slug')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('ip_address')
                            ->maxLength(45),
                        Forms\Components\Textarea::make('user_agent')
                            ->maxLength(500)
                            ->rows(2),
                    ])
                    ->columns(2),
                
                Forms\Components\Section::make('Status & Timing')
                    ->schema([
                        Forms\Components\DateTimePicker::make('last_activity')
                            ->required(),
                        Forms\Components\DateTimePicker::make('expires_at')
                            ->required(),
                        Forms\Components\Toggle::make('is_active')
                            ->required()
                            ->default(true),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('application.name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('application_slug')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('ip_address')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('last_activity')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('expires_at')
                    ->dateTime()
                    ->sortable()
                    ->color(fn (SsoSession $record): string => 
                        $record->expires_at < now() ? 'danger' : 'success'
                    ),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('user')
                    ->relationship('user', 'name')
                    ->searchable(),
                Tables\Filters\SelectFilter::make('application')
                    ->relationship('application', 'name')
                    ->searchable(),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active'),
                Tables\Filters\Filter::make('expired')
                    ->query(fn (Builder $query): Builder => $query->where('expires_at', '<', now()))
                    ->label('Expired Sessions'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('revoke')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->action(fn (SsoSession $record) => $record->update(['is_active' => false]))
                    ->requiresConfirmation()
                    ->visible(fn (SsoSession $record): bool => $record->is_active),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('revoke_selected')
                        ->label('Revoke Selected')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->action(fn (\Illuminate\Database\Eloquent\Collection $records) => 
                            $records->each(fn (SsoSession $record) => $record->update(['is_active' => false]))
                        )
                        ->requiresConfirmation(),
                ]),
            ])
            ->defaultSort('last_activity', 'desc');
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
            'index' => Pages\ListSsoSessions::route('/'),
            'create' => Pages\CreateSsoSession::route('/create'),
            'view' => Pages\ViewSsoSession::route('/{record}'),
            'edit' => Pages\EditSsoSession::route('/{record}/edit'),
        ];
    }
}