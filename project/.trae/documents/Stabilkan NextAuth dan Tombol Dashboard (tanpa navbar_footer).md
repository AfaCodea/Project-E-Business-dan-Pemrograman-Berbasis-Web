## Ringkasan Masalah
- Error `CLIENT_FETCH_ERROR` muncul saat fetch sesi: kemungkinan format respons sesi tidak sesuai ekspektasi NextAuth atau cookie/secret belum stabil.
- Home menampilkan tombol Dashboard via komponen client — sudah benar — namun perlu pastikan modul tersinkron dan build bersih.
- Admin dashboard harus terpisah dari Navbar/Footer — layout admin sudah tanpa Navbar, tinggal validasi visual.

## Rencana Perbaikan
1. Validasi Respons Sesi
- Uji `GET /api/auth/session` untuk memastikan mengembalikan `null` saat tidak login, dan objek `{ user, expires }` saat login.
- Jika fallback masih `{"user":null}`, ganti fallback menjadi `null` (bukan objek), karena bentuk resmi NextAuth adalah `null` atau session object.

2. Konfigurasi NextAuth
- Pastikan `secret: process.env.NEXTAUTH_SECRET` terpasang dan bernilai kuat.
- Hapus properti tak dikenal (sudah dihapus `trustHost`).
- Simpan `debug: process.env.NODE_ENV === 'development'` untuk observasi saat dev.

3. SessionProvider
- Pertahankan `basePath="/api/auth"` di `SessionProvider`. Jika error masih muncul, uji tanpa `basePath` karena default NextAuth juga `/api/auth` — untuk menghindari duplikasi konfigurasi.

4. Komponen Dashboard (Client)
- Pastikan `src/components/DashboardButtonClient.tsx` tersimpan dan diimpor dari `@/components/DashboardButtonClient`.
- Tambahkan guard role opsional: hanya tampil jika `(session as any).role === 'ADMIN'` bila diinginkan.

5. Admin Layout
- Konfirmasi `src/app/admin/layout.tsx` tidak mengimpor Navbar/Footer dan tampil bersih. Tambahkan topbar internal opsional jika diperlukan.

6. Verifikasi Build & Runtime
- Restart dev server untuk memuat `.env` terbaru.
- Hard reload browser; bersihkan cookie jika masih ada error sesi.
- Periksa konsol untuk memastikan tidak ada `CLIENT_FETCH_ERROR` setelah perbaikan format respons.

## Output yang Diharapkan
- Tidak ada error `CLIENT_FETCH_ERROR` di konsol.
- `GET /api/auth/session` mengembalikan `null` saat tidak login, dan session object saat login.
- Tombol `Dashboard` tampil saat login; Admin dashboard terpisah dari Navbar/Footer.

## Persetujuan
- Setelah Anda setuju, saya akan:
- Menyesuaikan fallback respons di `route.ts` agar mengembalikan `null` (bukan `{user:null}`).
- Opsi: menonaktifkan `basePath` di `SessionProvider` jika masih ada error.
- Menambahkan guard role (opsional) untuk tombol Dashboard.
- Menjalankan verifikasi dev server dan uji endpoint sesi untuk memastikan hasilnya stabil.