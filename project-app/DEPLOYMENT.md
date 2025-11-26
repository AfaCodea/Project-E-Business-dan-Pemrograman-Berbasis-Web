# Deployment Guide - E-commerce Fashion Store

## 🚀 Cara Deploy Website E-commerce

### 1. Frontend Deployment (Netlify)

#### Langkah-langkah:
1. **Build Project**
   ```bash
   npm run build
   ```

2. **Deploy ke Netlify**
   - Buka [Netlify](https://netlify.com)
   - Drag & drop folder `build` ke Netlify
   - Atau connect dengan GitHub repository

3. **Environment Variables di Netlify**
   - Masuk ke Site Settings > Environment Variables
   - Tambahkan:
     ```
     REACT_APP_API_URL=https://your-backend-url.herokuapp.com
     REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
     ```

### 2. Backend Deployment (Heroku)

#### Langkah-langkah:
1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download dari https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login ke Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

5. **Environment Variables di Heroku**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   ```

### 3. Database Setup (MongoDB Atlas)

#### Langkah-langkah:
1. **Buat Account di [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Create Cluster**
3. **Get Connection String**
4. **Update Backend Code**
   ```javascript
   // Tambahkan ke server.js
   const mongoose = require('mongoose');
   
   mongoose.connect(process.env.MONGODB_URI || 'your-connection-string');
   ```

### 4. Payment Gateway Setup

#### Stripe Setup:
1. **Buat Account di [Stripe](https://stripe.com)**
2. **Get API Keys**
   - Publishable Key (Frontend)
   - Secret Key (Backend)
3. **Update Environment Variables**

#### Midtrans Setup (untuk Indonesia):
1. **Buat Account di [Midtrans](https://midtrans.com)**
2. **Get API Keys**
3. **Update Environment Variables**

### 5. Domain Setup

#### Custom Domain:
1. **Beli Domain**
2. **Setup DNS**
   - A Record: Point ke Netlify IP
   - CNAME: www point ke your-app.netlify.app
3. **SSL Certificate** (Otomatis di Netlify)

### 6. Production Checklist

#### Frontend:
- [ ] Build berhasil tanpa error
- [ ] Environment variables sudah di-set
- [ ] API URL sudah benar
- [ ] Payment gateway keys sudah di-set
- [ ] Custom domain sudah aktif
- [ ] SSL certificate sudah aktif

#### Backend:
- [ ] Server berjalan di production
- [ ] Database connection berhasil
- [ ] CORS sudah dikonfigurasi
- [ ] Environment variables sudah di-set
- [ ] Error handling sudah ada
- [ ] Logging sudah dikonfigurasi

### 7. Monitoring & Analytics

#### Setup Monitoring:
1. **Google Analytics**
   ```html
   <!-- Tambahkan ke public/index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Error Tracking (Sentry)**
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

### 8. Performance Optimization

#### Frontend:
- [ ] Code splitting
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Service worker (PWA)

#### Backend:
- [ ] Caching
- [ ] Rate limiting
- [ ] Compression
- [ ] Database indexing

### 9. Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables tidak exposed
- [ ] CORS properly configured
- [ ] Input validation
- [ ] SQL injection protection
- [ ] XSS protection

### 10. Backup Strategy

#### Database Backup:
```bash
# MongoDB backup
mongodump --uri="your-connection-string" --out=backup/
```

#### Code Backup:
- Git repository
- Automated backups
- Version control

## 🔧 Troubleshooting

### Common Issues:

1. **Build Error**
   ```bash
   # Clear cache
   npm start -- --reset-cache
   ```

2. **CORS Error**
   ```javascript
   // Update server.js
   app.use(cors({
     origin: ['https://your-frontend-url.netlify.app'],
     credentials: true
   }));
   ```

3. **Environment Variables Not Working**
   - Restart development server
   - Check variable names (must start with REACT_APP_)
   - Clear browser cache

4. **Payment Gateway Error**
   - Check API keys
   - Verify webhook endpoints
   - Check network connectivity

## 📞 Support

Jika mengalami masalah deployment, silakan:
1. Check logs di Netlify/Heroku dashboard
2. Verify environment variables
3. Test API endpoints
4. Check browser console untuk errors

Happy deploying! 🚀
