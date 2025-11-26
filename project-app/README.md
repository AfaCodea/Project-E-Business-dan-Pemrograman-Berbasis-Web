# E-commerce Fashion Store

Website e-commerce untuk baju dan fashion dengan React.js, payment gateway, dan admin dashboard.

## 🚀 Fitur Utama

### Frontend (React.js)
- **Homepage Responsive** - Desain modern sesuai dengan mockup yang diberikan
- **Product Catalog** - Katalog produk dengan filter kategori dan pencarian
- **Shopping Cart** - Keranjang belanja dengan manajemen item
- **Checkout Process** - Proses checkout dengan form validasi
- **Payment Gateway** - Integrasi payment gateway (Kartu Kredit/Debit, E-Wallet)
- **User Authentication** - Sistem login/logout
- **Product Detail** - Halaman detail produk dengan galeri gambar
- **Responsive Design** - Mobile-first design yang responsive

### Admin Dashboard
- **Product Management** - CRUD operasi untuk produk
- **Order Management** - Manajemen pesanan pelanggan
- **Dashboard Analytics** - Statistik penjualan dan produk
- **User Management** - Manajemen pengguna

### Backend API
- **RESTful API** - API endpoints untuk semua operasi
- **Product API** - Endpoints untuk manajemen produk
- **Order API** - Endpoints untuk manajemen pesanan
- **Authentication** - Sistem autentikasi sederhana

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React.js 18** - Framework utama
- **React Router** - Routing dan navigasi
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animasi dan transisi
- **React Hook Form** - Form handling dan validasi
- **React Query** - State management dan caching
- **React Hot Toast** - Notifikasi
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

### Payment Gateway
- **Stripe** - Payment processing (siap integrasi)
- **Midtrans** - Alternative payment gateway untuk Indonesia

## 📦 Instalasi dan Setup

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd ecommerce-fashion-store
```

### 2. Install Dependencies Frontend
```bash
npm install
```

### 3. Install Dependencies Backend
```bash
# Buat folder backend
mkdir backend
cd backend

# Copy package-server.json ke package.json
cp ../package-server.json package.json

# Install dependencies
npm install
```

### 4. Setup Environment Variables
Buat file `.env` di root project:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
```

### 5. Jalankan Development Server

#### Frontend (Terminal 1)
```bash
npm start
```
Aplikasi akan berjalan di http://localhost:3000

#### Backend (Terminal 2)
```bash
cd backend
npm run dev
```
API akan berjalan di http://localhost:5000

## 🎨 Desain dan Layout

Website ini dibuat sesuai dengan desain yang diberikan dengan fitur:

### Homepage Sections
1. **Header** - Navigation dengan logo, menu, dan cart icon
2. **Hero Section** - Banner utama dengan call-to-action
3. **Casual Inspirations** - Grid inspirasi fashion
4. **Trending Products** - Produk trending dengan filter kategori
5. **Color Explorer** - Filter produk berdasarkan warna
6. **Testimonials** - Ulasan pelanggan
7. **Benefits** - Keunggulan website
8. **Blog Section** - Artikel fashion
9. **Footer** - Informasi dan link penting

### Responsive Design
- **Desktop** - Layout 2 kolom untuk hero section
- **Tablet** - Layout adaptif dengan grid responsive
- **Mobile** - Single column layout dengan hamburger menu

## 💳 Payment Gateway Integration

### Stripe Integration
```javascript
// Stripe configuration
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
```

### Supported Payment Methods
- **Credit/Debit Cards** - Visa, Mastercard, JCB
- **E-Wallet** - GoPay, OVO, DANA, LinkAja

## 🔐 Authentication

### User Roles
- **Customer** - Dapat berbelanja dan melihat produk
- **Admin** - Dapat mengelola produk, pesanan, dan dashboard

### Login Credentials
- **Admin**: Email dengan kata "admin" akan otomatis menjadi admin
- **Demo Admin**: Klik "Login sebagai Admin" untuk akses langsung

## 📱 Admin Dashboard

### Features
- **Product Management**
  - Tambah produk baru
  - Edit produk existing
  - Hapus produk
  - Upload gambar produk
  
- **Order Management**
  - Lihat semua pesanan
  - Update status pesanan
  - Detail pesanan pelanggan
  
- **Analytics Dashboard**
  - Total produk
  - Total penjualan
  - Total pesanan
  - Total pelanggan

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Upload folder build ke hosting service
```

### Backend (Heroku/Railway)
```bash
# Setup di hosting service dengan Node.js support
# Deploy dengan git push
```

## 📁 Struktur Project

```
ecommerce-fashion-store/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── ProductGrid.js
│   │   ├── Footer.js
│   │   ├── CasualInspirations.js
│   │   ├── ColorExplorer.js
│   │   ├── Testimonial.js
│   │   ├── Benefits.js
│   │   ├── BlogSection.js
│   │   ├── PaymentForm.js
│   │   └── ProductModal.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Login.js
│   │   └── AdminDashboard.js
│   ├── context/
│   │   ├── CartContext.js
│   │   └── AuthContext.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── server.js
├── package.json
├── package-server.json
└── README.md
```

## 🎯 Fitur yang Sudah Diimplementasi

### ✅ Completed
- [x] Setup project structure dengan React.js
- [x] Komponen-komponen utama (Header, Hero, ProductGrid, dll)
- [x] Layout responsive sesuai desain gambar
- [x] Integrasi payment gateway (Stripe/Midtrans)
- [x] Admin dashboard untuk mengelola produk
- [x] Backend API untuk produk dan transaksi
- [x] Styling dan responsive design

### 🔄 In Progress
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real payment processing
- [ ] Email notifications
- [ ] Advanced search dan filtering
- [ ] Product reviews dan ratings
- [ ] Inventory management

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - [@yourusername](https://twitter.com/yourusername) - email@example.com

Project Link: [https://github.com/yourusername/ecommerce-fashion-store](https://github.com/yourusername/ecommerce-fashion-store)

## 🙏 Acknowledgments

- Desain inspired by modern e-commerce websites
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Images by [Unsplash](https://unsplash.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
