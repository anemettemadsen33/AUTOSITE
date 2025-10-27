# 📋 PLAN COMPLET AUTOSITE - RECONSTRUCȚIE TOTALĂ

**Data:** 26 Octombrie 2025
**Obiectiv:** Platformă auto marketplace funcțională și profesională

---

## 🎯 FAZA 1: PREGĂTIRE & CURĂȚENIE (30 min)

### 1.1 Curățare Mediu
- [ ] Șterge `.next`, `node_modules` 
- [ ] Reinstalează toate dependințele corect
- [ ] Instalează Tailwind CSS LOCAL (nu CDN)
- [ ] Verifică că toate pachetele sunt instalate

### 1.2 Structură Folder
```
frontend/
├── app/
│   ├── (public)/          # Homepage, despre, contact
│   ├── (auth)/            # Login, register
│   ├── vanzari/
│   │   └── [category]/    # Categorii dinamice
│   ├── vehicule/
│   │   └── [slug]/        # Detaliu anunț
│   └── dashboard/         # User dashboard,detaliat,si chat intre vanzator/cumparator
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── ui/                # Buttons, Cards, etc
│   └── features/          # Feature-specific components,etc 
├── lib/
│   ├── api.ts
│   ├── types.ts
│   └── categories.ts
└── styles/
    └── globals.css        # Tailwind + custom styles (premium)
```

---

## 🎨 FAZA 2: SETUP TAILWIND CORECT (20 min)

### 2.1 Instalare Tailwind
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

### 2.2 Configurare tailwind.config.ts
- Content paths corecte
- Theme customization (colors, fonts)
- Plugins necesare

### 2.3 globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
```

### 2.4 Verificare
- Test că Tailwind funcționează
- Test responsive classes
- Test dark mode (opțional)

---

## 🏗️ FAZA 3: COMPONENTE LAYOUT (45 min)

### 3.1 Navbar ✨
- [ ] Logo + branding
- [ ] Meniu principal (Desktop)
- [ ] Meniu mobile (hamburger)
- [ ] Search bar
- [ ] Auth buttons (Login/Register)
- [ ] User dropdown (când e logged in)

**Design:**
- Sticky top (alege ultimele versiuni de la java)
- Background: white cu shadow
- Height: 64px desktop, 56px mobile

### 3.2 Footer
- [ ] Links (Despre, Contact, Termeni)
- [ ] Social media (butoane premium )
- [ ] Copyright
- [ ] Newsletter (opțional)

**Design:**
- Background: dark (gray-900)
- Text: white
- 4 coloane desktop, stack mobile

### 3.3 Layout Master
- [ ] Providers (React Query)
- [ ] Metadata corect
- [ ] Font optimization

---

## 🏠 FAZA 4: HOMEPAGE (1h)

### 4.1 Hero Section
```tsx
- Titlu mare: "Găsește Mașina Perfectă"
- Subtitlu
- Search bar central (marcă, model, preț) (paleta compacta cu butoane si filtre pentru toate categoriile pe care le-am adaugat exemplu mobile.de)
- Background gradient animat
- Stats (1000+ vehicule, 100+ dealeri)
```

### 4.2 Categorii Grid
```tsx
8 categorii:
├── Mașini 🚗
├── Motociclete 🏍️
├── Camioane 🚚
├── Utilitare 🚐
├── Rulote 🚙
├── Piese 🔧
├── Agricole 🚜
└── Construcții 🏗️

Grid: 4 cols desktop, 2 cols tablet, 2 cols mobile
Hover effect: scale + shadow
```

### 4.3 Featured Vehicles
- 6 vehicule recomandate
- Card design professional
- Imagine + preț + detalii (butoane cu functii )
- "Vezi toate" button

### 4.4 CTA Section
- Call to action pentru dealeri
- "Alătură-te platformei"
- Benefits list
- Register button

---

## 📦 FAZA 5: CATEGORII & LISTARE (1.5h)

### 5.1 Pagina Categorie `/vanzari/[category]`
- [ ] Header cu icon + nume categorie
- [ ] Filtre sidebar (desktop) / drawer (mobile)
- [ ] Grid vehicule (4 cols → 1 col responsive) (list and grid )
- [ ] Paginare
- [ ] Sort options (preț, dată, km)

### 5.2 Filtre
```tsx
- Preț (min-max slider)
- An fabricație (range)
- Kilometraj (range)
- Combustibil (checkboxes)
- Transmisie (checkboxes)
- Locație (dropdown)
```

### 5.3 Vehicle Card
```tsx
- Imagine (aspect ratio 4:3)
- Badge (Nou/Folosit/Featured)
- Titlu (marcă + model)
- Preț (mare, bold)
- Specs (an, km, combustibil)
- Locație (icon + oraș)
- Favorite button (heart icon)
```

---

## 🚗 FAZA 6: DETALIU VEHICUL (1h)

### 6.1 Galerie Imagini
- [ ] Carousel principal (mare)
- [ ] Thumbnails jos
- [ ] Lightbox fullscreen
- [ ] Zoom on hover

### 6.2 Detalii Vehicul
- [ ] Titlu + preț
- [ ] Specificații complete (grid)
- [ ] Descriere (rich text)
- [ ] Echipamente (list cu checkmarks) (butoane buy now/leasing si pagini cu forumulare pentru persoane fizice si companii vor primi factura automat cu detaliile de plata sepa trasnfer )

### 6.3 Sidebar Contact
- [ ] Info dealer (nume, rating, badge verified)
- [ ] Telefon button
- [ ] Email button
- [ ] WhatsApp button
- [ ] Formular contact rapid( harta google maps )

### 6.4 Acțiuni
- [ ] Favorite
- [ ] Share (social)
- [ ] Print
- [ ] Raportează

---

## 👤 FAZA 7: AUTENTIFICARE (1h)

### 7.1 Login Page
- [ ] Email + password
- [ ] Remember me
- [ ] Forgot password link
- [ ] Social login 
- [ ] Register link

### 7.2 Register Page
- [ ] Tip cont (Persoană fizică / Dealer)
- [ ] Nume, Email, Password
- [ ] Termeni & condiții checkbox
- [ ] Validare form (React Hook Form + Yup)

### 7.3 Protected Routes
- [ ] Middleware pentru autentificare
- [ ] Redirect la login dacă nu e autentificat

---

## 📊 FAZA 8: DASHBOARD USER (1.5h)

### 8.1 Layout Dashboard
- [ ] Sidebar meniu
- [ ] Breadcrumbs
- [ ] User info header

### 8.2 Pagini
```
├── dashboard/
│   ├── overview          # Stats personale
│   ├── anunturi/         # Anunțurile mele
│   │   ├── active
│   │   ├── inactive
│   │   └── adauga
│   ├── favorite/         # Favorite salvate
│   ├── mesaje/           # Inbox
│   ├── setari/           # Account settings
│   └── abonament/        # Subscription (dealers)
```

### 8.3 Adaugă Anunț
- [ ] Step 1: Selectează categorie
- [ ] Step 2: Detalii vehicul (form dinamic)
- [ ] Step 3: Upload imagini (drag & drop)
- [ ] Step 4: Preview & publish
- [ ] Validări complete
- [ ] Error handling

---

## 🔧 FAZA 9: FEATURES EXTRA (1h)

### 9.1 Search Global
- [ ] Search bar în navbar
- [ ] Autocomplete (marcă, model)
- [ ] Results page

### 9.2 Favorite System
- [ ] Toggle favorite (heart icon)
- [ ] Saved in Zustand store + localStorage
- [ ] Sync cu backend
- [ ] Pagină favorite

### 9.3 Comparare Vehicule
- [ ] Add to compare (max 3)
- [ ] Compare page (side by side)
- [ ] Specs comparison table

---

## 🎨 FAZA 10: DESIGN POLISH (1h)

### 10.1 Animations
- [ ] Page transitions
- [ ] Hover effects
- [ ] Loading skeletons
- [ ] Scroll animations (AOS sau Framer Motion)

### 10.2 Responsive
- [ ] Test pe mobile (320px - 480px)
- [ ] Test pe tablet (768px - 1024px)
- [ ] Test pe desktop (1280px+)
- [ ] Fix toate problemele

### 10.3 Accessibility
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Focus states
- [ ] Color contrast

---

## 🧪 FAZA 11: TESTING (30 min)

### 11.1 Manual Testing
- [ ] Toate paginile se încarcă
- [ ] Forms funcționează
- [ ] Navigation works
- [ ] Responsive e OK

### 11.2 Performance
- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] Lazy loading

---

## 🚀 FAZA 12: DEPLOYMENT READY (30 min)

### 12.1 Build Production
```bash
npm run build
npm run start
```
- [ ] Build fără erori
- [ ] Toate paginile funcționează

### 12.2 Environment Variables
- [ ] `.env.local` pentru dev
- [ ] `.env.production` pentru prod
- [ ] API URLs configurate

### 12.3 Documentation
- [ ] README actualizat
- [ ] Setup instructions
- [ ] Features list

---

## ⏱️ TIMELINE ESTIMAT

| Fază | Timp | Status |
|------|------|--------|
| 1. Pregătire | 30 min | ⬜ |
| 2. Tailwind Setup | 20 min | ⬜ |
| 3. Layout Components | 45 min | ⬜ |
| 4. Homepage | 1h | ⬜ |
| 5. Categorii | 1.5h | ⬜ |
| 6. Detaliu Vehicul | 1h | ⬜ |
| 7. Auth | 1h | ⬜ |
| 8. Dashboard | 1.5h | ⬜ |
| 9. Features Extra | 1h | ⬜ |
| 10. Design Polish | 1h | ⬜ |
| 11. Testing | 30 min | ⬜ |
| 12. Deployment | 30 min | ⬜ |
| **TOTAL** | **~11h** | |

---

## 🎯 PRIORITIZARE

### MUST HAVE (MVP)
1. ✅ Tailwind funcțional
2. ✅ Layout (Navbar + Footer)
3. ✅ Homepage cu categorii
4. ✅ Listare vehicule pe categorie
5. ✅ Detaliu vehicul
6. ✅ Search basic

### NICE TO HAVE
- Autentificare
- Dashboard user
- Favorite
- Comparare

### FUTURE
- Mesagerie real-time
- Notificări
- Multi-limba
- Dark mode

---

## 📝 NOTES

- **Design inspirație:** mobile.de, autoscout24.ro
- **Color scheme:** Blue primary (#2563eb), Gray neutrals
- **Typography:** Inter font (already included)
- **Icons:** Heroicons (already installed)

---

**Să începem cu FAZA 1?** ✨
