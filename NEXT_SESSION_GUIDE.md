# 🎯 GHID RAPID - URMĂTOAREA SESIUNE

## ⚡ START RAPID

### 1. Pornire Servere (2 comenzi)

```bash
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

**URLs:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:8000/api/v1
- Admin Panel: http://localhost:8000/admin

---

## 🧪 TEST ACCOUNTS

```
Admin:    admin@autosite.com / password
Dealer 1: dealer1@autosite.com / password
Dealer 2: dealer2@autosite.com / password
Buyer:    buyer@autosite.com / password
```

---

## ✅ CHECKLIST TESTARE MANUALĂ

### Test 1: Homepage (2 min)
- [ ] Accesează http://localhost:3001
- [ ] Verifică FeaturedVehicles se încarcă din API
- [ ] Click pe un vehicul → merge la detalii

### Test 2: Vehicles List (3 min)
- [ ] Accesează http://localhost:3001/vehicles
- [ ] Verifică că se încarcă vehicule din API
- [ ] Test search bar
- [ ] Test sortare (preț, an, km)
- [ ] Test view modes (grid/list)
- [ ] Test paginare

### Test 3: Vehicle Details (2 min)
- [ ] Click pe un vehicul din listă
- [ ] Verifică detalii complete
- [ ] Verifică galerie imagini
- [ ] Test buton favorite (fără login → redirect)

### Test 4: Login (2 min)
- [ ] Accesează http://localhost:3001/login
- [ ] Login cu `dealer1@autosite.com / password`
- [ ] Verifică redirect către /dashboard

### Test 5: Dashboard (3 min)
- [ ] Verifică stats cards (vehicule, views, etc)
- [ ] Verifică lista vehicule dealer
- [ ] Click "Adaugă Vehicul" → verifică pagină existe

### Test 6: Register (2 min)
- [ ] Accesează http://localhost:3001/register
- [ ] Încearcă creare cont nou
- [ ] Test validare parolă
- [ ] Test selector rol (buyer/dealer)

---

## 🔨 TASKS IMEDIATE (Prioritate în ordine)

### Task 1: FIX & TEST (30 min) 🔴
**Status:** URGENT - Pentru stabilizare

1. **Rulează testele de mai sus**
2. **Fix orice erori găsite în console**
3. **Verifică că toate endpoint-urile API funcționează**

**Expected Issues:**
- Posibile erori TypeScript în browser
- Imagini lipsă (placeholder-uri OK)
- Favorite button poate să nu funcționeze perfect

---

### Task 2: FAVORITES PAGE (1h) 🟡
**File:** `frontend/app/favorites/page.tsx`

**Ce trebuie făcut:**
```typescript
// Replace mock data cu:
import { useFavorites } from '@/lib/hooks/useFavorites';

// Conectează la API
const { data, isLoading } = useFavorites();

// Afișează lista cu VehicleCard
// Adaugă remove button
```

**Checklist:**
- [ ] Import useFavorites hook
- [ ] Replace mock data
- [ ] Loading state
- [ ] Empty state
- [ ] Remove from favorites button

---

### Task 3: DEALERS PAGE (1h) 🟡  
**File:** `frontend/app/dealers/page.tsx`

**Ce trebuie făcut:**
```typescript
import { useDealers } from '@/lib/hooks/useDealers';

// Similar cu vehicles page:
const { data, isLoading } = useDealers(filters);
```

**Checklist:**
- [ ] Import useDealers hook
- [ ] Replace mock data
- [ ] Filtre (oraș, țară)
- [ ] DealerCard component
- [ ] Link către /dealers/[id]

---

### Task 4: DEALER DETAILS PAGE (45min) 🟡
**File:** `frontend/app/dealers/[id]/page.tsx`

**Ce trebuie făcut:**
```typescript
import { useDealer } from '@/lib/hooks/useDealers';

const { data: dealer, isLoading } = useDealer(id);
```

**Checklist:**
- [ ] Import useDealer hook
- [ ] Detalii dealer (info, contact)
- [ ] Lista vehicule dealer
- [ ] Reviews (mock OK)
- [ ] Contact form

---

### Task 5: VEHICLE CREATE FORM (2h) 🟠
**File:** `frontend/app/dashboard/vehicles/create/page.tsx` (NEW)

**Ce trebuie făcut:**
1. Creează fișierul
2. Formular complet cu validare
3. Upload imagini (multiple)
4. Preview
5. Submit către API

**Fields:**
- Make, Model, Year, Price
- Mileage, Fuel, Transmission
- Body Type, Color, Doors, Seats
- Engine Size, Power HP
- Description (multi-lang)
- Features (checkboxes)
- Images (upload)
- Location (city, country)

**Checklist:**
- [ ] Formular layout
- [ ] Validare (Zod schema)
- [ ] Image upload component
- [ ] Preview imagini
- [ ] useCreateVehicle mutation
- [ ] Success/error handling
- [ ] Redirect după success

---

### Task 6: ADVANCED FILTERS (1h) 🟢
**File:** `frontend/components/FilterPanel.tsx`

**Ce trebuie făcut:**
```typescript
// Conectează la API pentru:
- Lista makes/brands dinamică
- Lista models (după make)
- Range sliders pentru preț/an
- Multiple selection
```

**Checklist:**
- [ ] API call pentru makes
- [ ] Dependent dropdown models
- [ ] Range slider component
- [ ] Apply filters → update URL params
- [ ] Reset filters button

---

### Task 7: IMAGE OPTIMIZATION (30min) 🟢
**Files:** Multiple components

**Ce trebuie făcut:**
```typescript
// Replace <img> cu Next.js Image
import Image from 'next/image';

<Image 
  src={url}
  alt={alt}
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

**Checklist:**
- [ ] VehicleCard images
- [ ] Vehicle detail gallery
- [ ] FeaturedVehicles
- [ ] Dealer logos

---

### Task 8: ERROR BOUNDARIES (30min) 🟢
**File:** `frontend/components/ErrorBoundary.tsx` (NEW)

**Ce trebuie făcut:**
```typescript
'use client';

export default class ErrorBoundary extends Component {
  // Catch errors
  // Display fallback UI
  // Log to console/service
}
```

**Checklist:**
- [ ] Create ErrorBoundary component
- [ ] Wrap app în layout.tsx
- [ ] Custom error UI
- [ ] Reset button

---

## 📊 PRIORITY MATRIX

```
┌─────────────────────────────────────────┐
│  CRITICAL (Do First) - RED 🔴          │
├─────────────────────────────────────────┤
│  ✓ Task 1: Fix & Test (30min)          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  HIGH (Do Today) - YELLOW 🟡            │
├─────────────────────────────────────────┤
│  Task 2: Favorites Page (1h)            │
│  Task 3: Dealers Page (1h)              │
│  Task 4: Dealer Details (45min)         │
│  Task 5: Vehicle Create Form (2h)       │
│  Total: ~5 ore                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  MEDIUM (Do Soon) - GREEN 🟢            │
├─────────────────────────────────────────┤
│  Task 6: Advanced Filters (1h)          │
│  Task 7: Image Optimization (30min)     │
│  Task 8: Error Boundaries (30min)       │
│  Total: ~2 ore                          │
└─────────────────────────────────────────┘
```

---

## 🎯 SESSION GOALS

### Session 1 (3-4h) - CORE FEATURES
- ✅ Test & Fix current implementation
- ✅ Complete Favorites page
- ✅ Complete Dealers listing
- ✅ Complete Dealer details

### Session 2 (2-3h) - DEALER FEATURES
- ✅ Vehicle Create Form
- ✅ Upload imagini
- ✅ Preview & submit

### Session 3 (2h) - POLISH
- ✅ Advanced filters
- ✅ Image optimization
- ✅ Error boundaries
- ✅ Final testing

---

## 🚀 QUICK COMMANDS

```bash
# Check API health
curl http://localhost:8000/api/v1/vehicles

# Check frontend build
cd frontend && npm run build

# Run database migrations
cd backend && php artisan migrate:fresh --seed

# Create new component
# (manual - no CLI tool)

# Git status
git status

# Commit changes
git add -A
git commit -m "feat: ..."

# Push to remote
git push origin main
```

---

## 📝 NOTES

### Important Files
- `frontend/lib/hooks/` - React Query hooks
- `frontend/lib/services/` - API services
- `frontend/components/` - Reusable components
- `backend/app/Http/Controllers/Api/` - API controllers

### Environment Variables
- Frontend: `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1`
- Backend: `FRONTEND_URL=http://localhost:3001`

### Common Issues
1. **CORS Error** → Check backend/config/cors.php
2. **401 Unauthorized** → Check JWT token in localStorage
3. **Port already in use** → Kill process sau change port
4. **TypeScript errors** → Run `npm run build` to check

---

## ✨ SUCCESS CRITERIA

Site-ul e gata pentru production când:
- ✅ Toate paginile principale funcționează
- ✅ Auth flow complet (login, register, logout)
- ✅ CRUD vehicule pentru dealeri
- ✅ Favorites funcționează
- ✅ Filtre avansate funcționează
- ✅ Responsive pe mobile
- ✅ No critical errors în console
- ✅ Performance score >90 (Lighthouse)
- ✅ Accessibility score >90
- ✅ SEO optimization
- ✅ Image optimization
- ✅ Error handling

---

**Estimated time to completion: 10-12 ore productive work** ⏱️

**Current progress: 80% complete** 🎯

**You got this! 💪** 

