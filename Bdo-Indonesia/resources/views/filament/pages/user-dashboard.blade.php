<x-filament::page>
    <div class="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <!-- Header Logo & Judul -->
        <div class="flex flex-col items-center mb-6">
            <img src="https://bdo.co.id/wp-content/uploads/2022/09/BDO_logo.png" alt="BDO Logo" class="h-12 mb-2">
            <div class="text-xs text-gray-500 text-center leading-tight">
                Terdaftar Sebagai Kantor Akuntan Publik dan Rekan<br>Certified Public Accountants
            </div>
        </div>
        <div class="text-center text-lg font-semibold mb-8 tracking-wide">APPLICATION FORM FOR ISSUANCE OF LETTER OF ASSIGNMENT</div>
        <!-- Instruksi -->
        <div class="mb-6">
            <div class="font-semibold">Kepada yang terhormat<br>Sekretariat Audit</div>
            <div class="mt-2">Di tempat</div>
            <div class="mt-2 text-sm">Mohon dapat diterbitkan Surat Tugas dengan rincian sebagai berikut :</div>
        </div>
        <!-- Form -->
        <form wire:submit.prevent="submit" class="bg-white rounded-xl shadow p-8">
            {{ $this->form }}
            <div class="flex justify-end mt-6">
                <button type="submit" class="bg-purple-200 text-purple-900 font-semibold px-8 py-2 rounded-lg shadow hover:bg-purple-300 transition">Submit</button>
            </div>
        </form>
    </div>
</x-filament::page>
