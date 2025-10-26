# 🔧 AUTOSITE Setup Guide

Complete setup instructions for local development.

## Prerequisites

- **PHP**: 8.2+
- **Composer**: 2.x
- **Node.js**: 20+
- **npm/pnpm**: Latest
- **MySQL/SQLite**: For database
- **Laragon** (recommended for Windows) or **Docker**

---

## 🚀 Quick Start (5 minutes)

### Option 1: Using START.bat (Windows)

```bash
# Double-click or run:
START.bat
```

This will:
- Start Laravel backend on :8000
- Start Next.js frontend on :3000

### Option 2: Manual Setup

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations & seeders
php artisan migrate --seed

# Start server
php artisan serve --port=8000
```

#### 2. Frontend Setup

```bash
cd autosite-frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local and set:
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Start dev server
npm run dev
```

---

## 🌐 Access Points

After setup:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/v1
- **Admin Panel**: http://localhost:8000/admin

---

## 👤 Default Login Credentials

| Role    | Email                  | Password |
|---------|------------------------|----------|
| Admin   | admin@autosite.com     | password |
| Dealer  | dealer1@autosite.com   | password |
| Buyer   | buyer1@example.com     | password |

---

## 🗄️ Database

### SQLite (Default - Development)

Already configured in `.env`:
```
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```

### MySQL (Production)

Update `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autosite
DB_USERNAME=root
DB_PASSWORD=your_password
```

Then run:
```bash
php artisan migrate:fresh --seed
```

---

## ✅ Verify Installation

### Test Backend API

```bash
# Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:8000/api/v1/vehicles"

# Linux/Mac
curl http://localhost:8000/api/v1/vehicles
```

Should return JSON with vehicles data (200 OK).

### Test Frontend

Open http://localhost:3000 in browser.
- Should see homepage
- No console errors
- Images load properly

---

## 🐛 Troubleshooting

### Issue: "API URL 404 errors"

Check `autosite-frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

Note the `/v1` at the end!

### Issue: "Translation errors"

Run:
```bash
cd autosite-frontend
npm run dev
```

Check console for MISSING_MESSAGE errors and verify translation files in `/messages`.

### Issue: "Database not found"

```bash
cd backend
php artisan migrate:fresh --seed
```

### Issue: "Port already in use"

**Backend**:
```bash
php artisan serve --port=8001
```

**Frontend**:
```bash
npm run dev -- -p 3001
```

---

## 📦 Production Build

### Frontend

```bash
cd autosite-frontend
npm run build
npm start
```

### Backend

```bash
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 🔄 Update Project

```bash
# Backend
cd backend
composer update
php artisan migrate

# Frontend
cd autosite-frontend
npm update
```

---

## 📞 Need Help?

- Check [API Documentation](API.md)
- Check [Testing Guide](TESTING.md)
- Review archived docs in `/docs/archive/`

**Last Updated**: 26 Oct 2025
