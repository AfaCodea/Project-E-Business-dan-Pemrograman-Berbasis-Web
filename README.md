# Shoes Store - Modern Furniture Store

Website furniture modern dengan desain minimalis menggunakan Next.js, TypeScript, dan shadcn/ui.

## Fitur

- ✅ Header dengan navigation dan shopping cart
- ✅ Hero section dengan search bar dan image carousel
- ✅ Section "Why Choosing Us" dengan 3 fitur utama
- ✅ Section "Best Selling Product" dengan filter kategori
- ✅ Section "Experiences" dan "Materials"
- ✅ Section "Client Reviews" dengan testimonial carousel
- ✅ Footer lengkap dengan links dan social media
- ✅ Responsive design untuk semua device
- ✅ Menggunakan gambar dari Unsplash

## Teknologi

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- Embla Carousel

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser di [http://localhost:3000](http://localhost:3000)

## Build untuk Production

```bash
npm run build
npm start
```

## Struktur Project

```
webshoesstore/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── WhyChoosingUs.tsx
│   ├── BestSellingProducts.tsx
│   ├── Experiences.tsx
│   ├── Materials.tsx
│   ├── ClientReviews.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts          # Utility functions
└── package.json
```

## Catatan

- Semua gambar menggunakan Unsplash API
- Website sudah responsive untuk mobile, tablet, dan desktop
- Menggunakan shadcn/ui untuk komponen yang konsisten dan modern

