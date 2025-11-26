<?php

namespace App\Filament\Pages;

use Filament\Forms;
use Filament\Pages\Page;

class UserDashboard extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static string $view = 'filament.pages.user-dashboard';
    protected static ?string $title = 'Dashboard';

    public $data = [];

    public function mount(): void
    {
        $this->form->fill([]);
    }

    protected function getFormSchema(): array
    {
        return [
            Forms\Components\Grid::make(2)
                ->schema([
                    Forms\Components\Section::make('Data Audit Team')
                        ->schema([
                            Forms\Components\TextInput::make('engagement_partner')
                                ->label('Engagement Partner')
                                ->required(),
                            Forms\Components\TextInput::make('bdo_partner')
                                ->label('BDO Partner'),
                            Forms\Components\TextInput::make('engagement_manager')
                                ->label('Engagement Manager')
                                ->required(),
                            Forms\Components\TextInput::make('auditor_in_charge')
                                ->label('Auditor In Charge'),
                            Forms\Components\Select::make('audit_assistants')
                                ->label('Audit Assistants')
                                ->multiple()
                                ->options([
                                    'asisten1' => 'Asisten 1',
                                    'asisten2' => 'Asisten 2',
                                    'asisten3' => 'Asisten 3',
                                ])
                                ->helperText('Pilih lebih dari satu jika perlu.'),
                        ])->columnSpan(1),
                    Forms\Components\Section::make('Data Penugasan')
                        ->schema([
                            Forms\Components\TextInput::make('nama_klien')
                                ->label('Nama Klien')
                                ->required(),
                            Forms\Components\TextInput::make('nomor_engagement_letter')
                                ->label('Nomor Engagement Letter'),
                            Forms\Components\Select::make('jenis_penugasan')
                                ->label('Jenis Penugasan')
                                ->options([
                                    'audit' => 'Audit',
                                    'review' => 'Review',
                                    'lainnya' => 'Lainnya',
                                ])
                                ->required(),
                            Forms\Components\TextInput::make('tahun_buku')
                                ->label('Tahun Buku yang Berakhir')
                                ->placeholder('2023')
                                ->helperText('Masukkan tahun dalam format YYYY.'),
                            Forms\Components\TextInput::make('interim')
                                ->label('Apakah melakukan pekerjaan interim?'),
                            Forms\Components\TextInput::make('lokasi_klien')
                                ->label('Lokasi Klien'),
                        ])->columnSpan(1),
                ]),
            Forms\Components\Grid::make(2)
                ->schema([
                    Forms\Components\Section::make('Jadwal')
                        ->schema([
                            Forms\Components\DatePicker::make('tanggal_permohonan')
                                ->label('Tanggal Permohonan')
                                ->required(),
                            Forms\Components\DatePicker::make('tanggal_interim')
                                ->label('Tanggal pelaksanaan - interim period'),
                            Forms\Components\DatePicker::make('tanggal_final')
                                ->label('Tanggal pelaksanaan - final audit'),
                        ])->columnSpan(1),
                    Forms\Components\Section::make('Perjalanan')
                        ->schema([
                            Forms\Components\TextInput::make('berangkat_luar_kota')
                                ->label('Berangkat ke luar kota'),
                            Forms\Components\TextInput::make('pulang_jakarta')
                                ->label('Pulang ke Jakarta'),
                        ])->columnSpan(1),
                ]),
            Forms\Components\Grid::make(2)
                ->schema([
                    Forms\Components\Section::make('Pemohon, Engagement Manager')
                        ->schema([
                            Forms\Components\TextInput::make('nama_pemohon')
                                ->label('Nama')
                                ->required(),
                        ])->columnSpan(1),
                    Forms\Components\Section::make('Menyetujui, Engagement Partner')
                        ->schema([
                            Forms\Components\TextInput::make('nama_penyetuju')
                                ->label('Nama')
                                ->required(),
                        ])->columnSpan(1),
                ]),
        ];
    }

    public function submit()
    {
        // Simpan data atau lakukan aksi lain di sini
        // $this->form->getState() untuk mendapatkan data
    }
}
