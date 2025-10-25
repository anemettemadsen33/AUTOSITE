# AUTOSITE - Quick Start Guide

Get the AUTOSITE frontend running locally in under 5 minutes!

## ⚡ Quick Setup

### 1. Prerequisites Check

Make sure you have:
- ✅ Node.js 20+ installed (`node -v`)
- ✅ npm or pnpm installed (`npm -v`)
- ✅ Laravel backend running on http://localhost:8000

### 2. Install & Run (3 commands)

```bash
# Navigate to frontend directory
cd autosite-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

That's it! Open http://localhost:3000

## 🎯 First Time Setup

### Create Environment File

```bash
cp .env.example .env.local
```

### Edit .env.local

```env
# Laravel Backend (make sure it's running!)
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Your local URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Start Backend First

Before running the frontend, start your Laravel backend:

```bash
# In the Laravel project directory
cd ../  # Go back to AUTOSITE root
php artisan serve
```

You should see:
```
Starting Laravel development server: http://127.0.0.1:8000
```

## 📱 Test It Works

1. **Open browser**: http://localhost:3000
2. **You should see**: Homepage with vehicle listings
3. **Try these**:
   - Browse vehicles
   - Change language (top right)
   - Toggle dark mode
   - Use filters

## 🔍 Troubleshooting

### "Cannot connect to API"

**Problem**: Frontend can't reach backend

**Solution**:
```bash
# Check Laravel is running
curl http://localhost:8000/api/settings

# If not, start Laravel
cd ../
php artisan serve
```

### "Port 3000 already in use"

**Solution**:
```bash
# Use a different port
npm run dev -- -p 3001
```

### "Module not found" errors

**Solution**:
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎨 Key Features to Test

### 1. Browse Vehicles
- Go to homepage
- Use filters (price, year, brand)
- Click on a vehicle card

### 2. Compare Vehicles
- Click "Compare" on 2-3 vehicles
- Go to `/compare`
- See side-by-side comparison

### 3. Multi-Language
- Click language selector (top right)
- Switch to Romanian or German
- All content updates

### 4. Dark Mode
- Click sun/moon icon (top right)
- Theme switches instantly
- Persists on refresh

### 5. Authentication
- Go to `/auth/login`
- Use test credentials (if available)
- Access user dashboard

## 📚 What's Available?

### Pages
- `/` - Homepage with featured vehicles
- `/vehicles` - All vehicles listing
- `/dealers` - Dealer directory
- `/compare` - Vehicle comparison
- `/contact` - Contact form
- `/auth/login` - Login
- `/auth/register` - Registration
- `/user/dashboard` - User dashboard (requires auth)

### Languages
- 🇬🇧 English (en)
- 🇷🇴 Romanian (ro)
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇮🇹 Italian (it)
- 🇪🇸 Spanish (es)
- 🇵🇱 Polish (pl)
- 🇭🇺 Hungarian (hu)

## 🛠 Development Commands

```bash
# Start dev server (with hot reload)
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm run build && npm start

# Run tests
npm run test

# Run E2E tests
npm run e2e
```

## 📦 Project Structure (Important Folders)

```
autosite-frontend/
├── app/[locale]/        # Pages (add new pages here)
├── components/          # React components (reusable UI)
├── lib/                # API functions (vehicles.ts, dealers.ts)
├── stores/             # State management (Zustand)
├── messages/           # Translations (en.json, ro.json, de.json)
└── public/             # Static files (images, icons)
```

## 🎓 Making Changes

### Add a New Page

```bash
# Create page file
mkdir -p app/[locale]/my-page
touch app/[locale]/my-page/page.tsx
```

```typescript
// app/[locale]/my-page/page.tsx
export default function MyPage() {
  return <div>My New Page</div>;
}
```

Access at: http://localhost:3000/my-page

### Add Translation

```json
// messages/en.json
{
  "myPage": {
    "title": "My Page",
    "description": "This is my page"
  }
}
```

Use in component:
```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('myPage');
return <h1>{t('title')}</h1>;
```

## ✅ Next Steps

1. **Explore the code**: Start with `app/[locale]/page.tsx` (homepage)
2. **Check API integration**: Look at `lib/vehicles.ts`
3. **Understand state**: Review `stores/authStore.ts`
4. **Modify styling**: Edit Tailwind classes in components
5. **Add features**: Follow the patterns in existing code

## 📞 Need Help?

- **API Issues**: Check Laravel logs
- **Frontend Errors**: Check browser console (F12)
- **Build Problems**: See README.md troubleshooting section

## 🎯 Common Tasks

### Change API URL
```bash
# Edit .env.local
NEXT_PUBLIC_API_URL=http://your-backend-url/api
```

### Add New Language
1. Copy `messages/en.json` to `messages/xx.json`
2. Translate all strings
3. Add to `middleware.ts` locales array
4. Add to `Header.tsx` language selector

### Customize Theme Colors
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

---

**Ready to code?** Start the dev server and happy coding! 🚀

```bash
npm run dev
```
