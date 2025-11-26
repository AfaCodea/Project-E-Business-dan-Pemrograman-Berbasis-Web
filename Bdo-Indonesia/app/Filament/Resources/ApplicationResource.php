<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ApplicationResource\Pages;
use App\Models\Application;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ApplicationResource extends Resource
{
    protected static ?string $model = Application::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';

    protected static ?string $navigationLabel = 'Applications';

    protected static ?string $modelLabel = 'Application';

    protected static ?string $pluralModelLabel = 'Applications';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Application Details')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255)
                            ->helperText('Unique identifier for the application'),
                        Forms\Components\Textarea::make('description')
                            ->maxLength(1000)
                            ->rows(3),
                        Forms\Components\TextInput::make('url')
                            ->required()
                            ->url()
                            ->maxLength(500)
                            ->helperText('The URL where the application is hosted'),
                        Forms\Components\TextInput::make('icon')
                            ->url()
                            ->maxLength(500)
                            ->helperText('URL to the application icon'),
                    ])
                    ->columns(2),
                
                Forms\Components\Section::make('Configuration')
                    ->schema([
                        Forms\Components\Select::make('category')
                            ->required()
                            ->options([
                                'audit' => 'Audit',
                                'hr' => 'Human Resources',
                                'finance' => 'Finance',
                                'tools' => 'Tools',
                                'client' => 'Client',
                                'admin' => 'Administration',
                            ])
                            ->searchable(),
                        Forms\Components\Toggle::make('is_active')
                            ->required()
                            ->default(true)
                            ->helperText('Whether the application is available to users'),
                        Forms\Components\Toggle::make('requires_sso')
                            ->required()
                            ->default(true)
                            ->helperText('Whether the application requires SSO authentication'),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Order in which the application appears (lower numbers first)'),
                    ])
                    ->columns(2),
                
                Forms\Components\Section::make('Permissions')
                    ->schema([
                        Forms\Components\TagsInput::make('permissions')
                            ->helperText('List of permissions required to access this application')
                            ->placeholder('Enter permission names')
                            ->separator(',')
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'audit' => 'primary',
                        'hr' => 'success',
                        'finance' => 'warning',
                        'tools' => 'info',
                        'client' => 'secondary',
                        'admin' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\IconColumn::make('requires_sso')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'audit' => 'Audit',
                        'hr' => 'Human Resources',
                        'finance' => 'Finance',
                        'tools' => 'Tools',
                        'client' => 'Client',
                        'admin' => 'Administration',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active'),
                Tables\Filters\TernaryFilter::make('requires_sso')
                    ->label('Requires SSO'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('launch')
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->url(fn (Application $record): string => route('sso', $record->slug))
                    ->openUrlInNewTab()
                    ->visible(fn (Application $record): bool => $record->is_active),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order');
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
            'index' => Pages\ListApplications::route('/'),
            'create' => Pages\CreateApplication::route('/create'),
            'view' => Pages\ViewApplication::route('/{record}'),
            'edit' => Pages\EditApplication::route('/{record}/edit'),
        ];
    }
}