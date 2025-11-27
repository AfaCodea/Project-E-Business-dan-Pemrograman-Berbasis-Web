# Hero Section - Responsive & Image Optimization Guide

## ✅ Optimasi yang Sudah Diterapkan

### 1. **Responsive Design**

#### Mobile (< 640px)
- Padding: `px-4, py-12`
- Heading: `text-3xl`
- Description: `text-sm`
- Search bar: `h-11`
- Min height: `50vh`
- Hotspots: Hidden (untuk performa)

#### Tablet (640px - 1024px)
- Padding: `px-6 sm:px-8, py-16 md:py-20`
- Heading: `text-4xl md:text-5xl`
- Description: `text-base md:text-lg`
- Search bar: `h-12 md:h-14`
- Min height: `60vh`
- Hotspots: Visible dengan ukuran lebih kecil

#### Desktop (> 1024px)
- Padding: `px-12 xl:px-16, py-24 xl:py-32`
- Heading: `text-6xl xl:text-7xl`
- Description: `text-xl`
- Search bar: `h-16`
- Min height: `100vh`
- Hotspots: Full size

### 2. **Image Optimization**

#### Next.js Image Component
```tsx
<Image
  src={heroImage}
  alt="Premium shoes collection - Premium quality footwear at Shoes Store X Afa"
  fill
  className="object-cover object-center"
  priority
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
  placeholder="blur"
  blurDataURL="..."
/>
```

**Fitur:**
- ✅ `priority` - Load image segera (untuk hero section)
- ✅ `quality={85}` - Balance antara kualitas dan ukuran file
- ✅ `sizes` - Responsive image loading berdasarkan viewport
- ✅ `placeholder="blur"` - Blur placeholder saat loading
- ✅ `object-cover object-center` - Proper image positioning

#### Next.js Config
```javascript
formats: ['image/avif', 'image/webp']  // Modern format, lebih ringan
deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
```

### 3. **Performance Benefits**

| Aspek | Sebelum | Sesudah | Improvement |
|-------|---------|---------|-------------|
| Image Format | JPG (491KB) | WebP/AVIF | ~40-50% lebih kecil |
| Responsive Loading | Single size | Multiple sizes | Sesuai device |
| Mobile Experience | Desktop image | Optimized size | Faster load |
| Placeholder | None | Blur | Better UX |
| Accessibility | Basic alt | Descriptive alt | SEO friendly |

## 📱 Responsive Breakpoints

```
Mobile:    < 640px   (sm)
Tablet:    640-768px (md)
Desktop:   768-1024px (lg)
Large:     1024-1280px (xl)
XL:        > 1280px (2xl)
```

## 🎯 Best Practices yang Diterapkan

1. **Mobile-First Design** - Dimulai dari mobile, scale up ke desktop
2. **Progressive Enhancement** - Fitur tambahan untuk device yang lebih besar
3. **Performance Budget** - Image quality 85% untuk balance
4. **Accessibility** - Descriptive alt text, aria-labels
5. **SEO Optimization** - Semantic HTML, proper meta descriptions
6. **Modern Image Formats** - AVIF/WebP dengan JPG fallback
7. **Lazy Loading** - Kecuali hero image (priority)
8. **Responsive Images** - Ukuran berbeda untuk device berbeda

## 🚀 Cara Optimasi Lebih Lanjut

### Kompres Image Manual (Opsional)
```bash
# Install sharp untuk kompresi image
npm install sharp

# Atau gunakan online tools:
# - TinyPNG (https://tinypng.com)
# - Squoosh (https://squoosh.app)
# - ImageOptim (Mac)
```

### Generate Blur Placeholder
```bash
# Install plaiceholder
npm install plaiceholder

# Generate blur data URL dari image
```

### Monitor Performance
```bash
# Lighthouse audit
npm run build
npx serve out
# Buka Chrome DevTools > Lighthouse
```

## 📊 Expected Performance

- **Mobile (3G)**: < 3s First Contentful Paint
- **Desktop (Fast)**: < 1s First Contentful Paint
- **Image Size**: 
  - Mobile: ~50-100KB (WebP)
  - Desktop: ~150-250KB (WebP)
- **Lighthouse Score**: 90+ (Performance)

## 🔧 Troubleshooting

### Image tidak muncul
- Pastikan file ada di `/public/images/hero-section.jpg`
- Check console untuk error

### Image terlalu besar
- Reduce quality dari 85 ke 75-80
- Kompres manual dengan TinyPNG

### Slow loading
- Pastikan `priority` ada untuk hero image
- Check network tab di DevTools
