# 🚀 Quick Start Guide - E-commerce Fashion Store

## ⚡ Cara Cepat Menjalankan Website

### 1. Prerequisites
Pastikan sudah terinstall:
- Node.js (v16 atau lebih baru)
- npm atau yarn

### 2. Setup Otomatis
```bash
# Jalankan script setup otomatis
./start.sh
```

### 3. Manual Setup (Jika script tidak berfungsi)

#### Install Dependencies Frontend
```bash
npm install
```

#### Setup Backend
```bash
mkdir backend
cd backend
cp ../package-server.json package.json
npm install
cd ..
```

#### Create Environment File
```bash
# Copy file example
cp env.example .env

# Edit file .env dengan API keys Anda
nano .env
```

### 4. Jalankan Aplikasi

#### Terminal 1 - Frontend
```bash
npm start
```
Aplikasi akan berjalan di: http://localhost:3000

#### Terminal 2 - Backend
```bash
cd backend
npm run dev
```
API akan berjalan di: http://localhost:5000

### 5. Akses Website

#### Customer View
- Buka: http://localhost:3000
- Browse produk
- Add to cart
- Checkout

#### Admin Dashboard
- Klik "Login" di header
- Klik "Login sebagai Admin"
- Atau gunakan email dengan kata "admin"
- Akses dashboard di: http://localhost:3000/admin

## 🎯 Fitur Utama yang Bisa Dicoba

### 🛒 Customer Features
1. **Browse Products**
   - Lihat produk di homepage
   - Filter berdasarkan kategori
   - Explore berdasarkan warna

2. **Shopping Cart**
   - Add produk ke cart
   - Update quantity
   - Remove items
   - View cart total

3. **Checkout**
   - Isi informasi pengiriman
   - Pilih metode pembayaran
   - Review order
   - Complete purchase

### 🔧 Admin Features
1. **Product Management**
   - Tambah produk baru
   - Edit produk existing
   - Hapus produk
   - Upload gambar

2. **Dashboard**
   - Lihat statistik penjualan
   - Monitor total produk
   - Track pesanan

## 🎨 Demo Data

Website sudah dilengkapi dengan sample data:
- 4 produk sepatu
- Kategori: shoes, clothing, accessories
- Sample images dari Unsplash
- Mock customer testimonials

## 🔑 Login Credentials

### Admin Login
- **Email**: admin@ecommerce.com
- **Password**: admin123
- **Atau**: Klik "Login sebagai Admin" button

### Customer Login
- **Email**: customer@email.com
- **Password**: customer123
- **Atau**: Email apapun dengan kata "admin" = admin access

## 🛠️ Development Tips

### Hot Reload
- Frontend: Otomatis reload saat file diubah
- Backend: Restart server saat file diubah

### Debugging
- Frontend: Browser DevTools
- Backend: Console logs di terminal

### File Structure
```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── context/       # React context
└── App.js         # Main app component
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9

# Kill process di port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
```bash
# Clear React cache
npm start -- --reset-cache
```

## 📱 Mobile Testing

### Chrome DevTools
1. Buka DevTools (F12)
2. Klik device icon
3. Pilih device untuk testing

### Real Device
1. Pastikan device dan computer di network yang sama
2. Akses: http://[your-ip]:3000
3. Contoh: http://192.168.1.100:3000

## 🎉 Next Steps

Setelah website berjalan:

1. **Customize Design**
   - Edit colors di styled-components
   - Update images di public folder
   - Modify content di components

2. **Add Real Data**
   - Connect ke database
   - Add real products
   - Setup payment gateway

3. **Deploy**
   - Frontend: Netlify/Vercel
   - Backend: Heroku/Railway
   - Database: MongoDB Atlas

## 📞 Support

Jika mengalami masalah:
1. Check console untuk errors
2. Verify semua dependencies terinstall
3. Pastikan ports 3000 dan 5000 available
4. Restart development servers

Happy coding! 🎨✨
