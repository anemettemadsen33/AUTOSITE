# 🚀 AUTOSITE - Quick Start Guide

> Get up and running in **5 seconds**!

---

## ⚡ Super Fast Start

### Option 1: Double-Click (Windows)
```
START.bat
```

Just double-click `START.bat` and everything starts automatically!

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend && php artisan serve --port=8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend && npm run dev
```

Then open: **http://localhost:3000**

---

## 🔑 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@autosite.com | password |
| **Dealer** | dealer1@autosite.com | password |
| **Buyer** | buyer1@example.com | password |

---

## 🌐 Important URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://127.0.0.1:8000
- **API**: http://127.0.0.1:8000/api/v1
- **Admin Panel**: http://127.0.0.1:8000/admin

---

## 🎯 Quick Demo (2 minutes)

1. **Homepage** → View search bar + featured vehicles
2. **Click "Vehicule"** → See complete list + filters
3. **Apply BMW filter** → Demonstrate filtering
4. **Click on a vehicle** → Full details + photo gallery
5. **Click "Autentificare"** → Login as admin
6. **Show user menu** → Logout

**Total time**: 2-3 minutes ⏱️

---

## 🆘 Quick Troubleshooting

### First Time Setup

**Backend:**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate:fresh --seed
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local
```

### Backend won't start?
```bash
cd backend
composer install
php artisan key:generate
php artisan migrate:fresh --seed
```

### Frontend won't start?
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Empty database?
```bash
cd backend
php artisan migrate:fresh --seed
```

### CORS errors?
Check `backend/.env`:
```
FRONTEND_URL=http://localhost:3000
```

---

## 📱 Test Responsive Design

1. Press **F12** → Open DevTools
2. **Toggle device toolbar** (Ctrl+Shift+M)
3. **Select device** → iPhone/iPad
4. **Test navigation** → All features work!

---

## ✅ What Works 100%

✅ Homepage with search  
✅ Vehicle listing (21 vehicles)  
✅ Advanced filters (6 types)  
✅ Vehicle details with gallery  
✅ Authentication (Login/Register/Logout)  
✅ Modern design with Tailwind CSS  
✅ 100% responsive (Mobile/Tablet/Desktop)  

---

## 🎉 Ready for Presentation!

**Status**: ✅ Production Ready MVP  
**Quality**: Excellent  
**Demo Time**: 2-3 minutes  

---

*For complete documentation, see [MVP_COMPLETE.md](./MVP_COMPLETE.md)*
