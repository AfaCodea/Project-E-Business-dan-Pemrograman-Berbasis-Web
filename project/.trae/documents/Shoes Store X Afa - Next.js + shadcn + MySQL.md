## Arsitektur
- Next.js (App Router, TypeScript) sebagai fullstack framework (SSR/SSG/ISR)
- UI menggunakan shadcn/ui tanpa kustomisasi berat; tema netral “modern robotic” (abu/metal) via utilitas CSS ringan
- Bun sebagai package manager (opsional; bisa npm/pnpm sesuai preferensi)
- Prisma ORM terhubung ke MySQL (local/dev/production)
- Route handlers di `app/api/*` untuk RESTful API
- Auth dengan NextAuth (credentials) + Prisma adapter, role-based (user/admin)

## Fitur Utama
- Katalog sepatu: grid, pencarian, filter kategori/ukuran/harga
- Detail produk: galeri gambar, varian ukuran, stok, deskripsi, ulasan (opsional)
- Keranjang: persistent via cookie/session; sinkron ke DB untuk user login
- Checkout: pembuatan order, alamat pengiriman, ringkasan total, status “pending/paid/shipped”
- Admin dashboard: CRUD produk/kategori/varian, manajemen stok, pesanan
- SEO & performa: `next/image`, metadata, caching

## Stack Teknis
- UI: shadcn/ui (button, card, table, input, select, sheet, dialog, breadcrumb, navbar)
- State: server components + actions; client components untuk interaksi cart
- Form: React Hook Form + Zod (validasi)
- DB: MySQL + Prisma (migrasi, seeding)
- Auth: NextAuth (credentials), hashing bcrypt
- Upload gambar: penyimpanan lokal (dev) + abstraksi untuk CDN (opsional)

## Skema Database (ringkas)
- `User(id, name, email, passwordHash, role)`
- `Category(id, name, slug)`
- `Product(id, name, slug, description, basePrice, active)`
- `ProductImage(id, productId, url, alt, sort)`
- `ProductVariant(id, productId, size, sku, price, stock)`
- `ProductCategory(productId, categoryId)`
- `Cart(id, userId?, sessionId, createdAt, updatedAt)`
- `CartItem(id, cartId, productVariantId, qty)`
- `Order(id, userId, status, total, createdAt)`
- `OrderItem(id, orderId, productVariantId, price, qty)`
- `Address(id, userId, line1, city, postalCode, phone)`

## Langkah Implementasi
1. Inisialisasi proyek Next.js + TypeScript, konfigurasi shadcn/ui
2. Setup Prisma + MySQL, migrasi awal sesuai skema
3. Konfigurasi NextAuth credential + Prisma adapter, proteksi route admin
4. Layout dasar: navbar, footer, background “modern robotic” minimal tanpa kustom berat
5. Halaman Katalog: listing, pagination, filter; API `GET /api/products`
6. Halaman Detail Produk: varian ukuran, stok, tambah ke keranjang; API `GET /api/products/[slug]`
7. Keranjang: drawer/sheet, update qty/remove; API `POST/PUT/DELETE /api/cart`
8. Checkout: alamat, ringkasan, buat order; API `POST /api/orders`
9. Admin: tabel produk/kategori/varian, form CRUD, upload gambar
10. Seeding data contoh + image placeholder
11. SEO, aksesibilitas, optimisasi (lighthouse baseline)
12. Pengujian dasar: unit (utils), integrasi API, e2e ringan (opsional)

## Halaman & Navigasi
- `/` beranda (hero, kategori populer, produk terbaru)
- `/products` katalog + filter
- `/products/[slug]` detail
- `/cart` atau cart sebagai sheet dari navbar
- `/checkout` proses checkout
- `/account` profil & pesanan
- `/admin` dashboard + subhalaman CRUD

## API & Keamanan
- Route handlers `app/api/*` dengan server actions untuk operasi cart/checkout
- Validasi input Zod, rate-limit ringan untuk endpoints publik
- Role guard untuk admin; CSRF proteksi via NextAuth

## Tema & Background
- Menggunakan tema default shadcn/ui (tanpa custom desain kompleks)
- Background “modern robotic” via CSS gradient + mesh/grid halus bernuansa abu/metal

## Seeding & Data
- Script seed Prisma: kategori (running, casual), contoh produk, varian ukuran 38–44, stok

## Pengujian
- Unit: price calc, stok, helpers
- Integrasi: cart endpoints, order creation

## Deployment
- Konfigurasi `.env` `DATABASE_URL` MySQL
- Opsi hosting: Vercel (app) + PlanetScale/MySQL managed; atau server sendiri (MAMP hanya untuk dev)

## Pembayaran (opsional)
- Integrasi Stripe/Xendit/Midtrans sebagai langkah terpisah: webhook, status order

## Output yang akan dikirim
- Struktur proyek siap jalan, halaman utama/katalog/detail/cart/checkout
- Admin dasar CRUD
- Skema & migrasi Prisma + seed
- Dokumentasi singkat cara run & variabel `.env`

Silakan konfirmasi plan ini. Setelah disetujui, saya akan mulai menyiapkan proyek, skema database, halaman, dan API sesuai rincian di atas.