# 🧪 AUTOSITE - Testing Guide

## ✅ Manual Testing Checklist

### Homepage Testing
1. ⬜ Deschide http://localhost:3000
2. ⬜ Verifică hero section și search bar
3. ⬜ Scroll down - verifică vehicule featured
4. ⬜ Click pe "Vezi toate →" - merge la /vehicles
5. ⬜ Click pe o categorie (SUV, Sedan) - filtrează corect
6. ⬜ Click pe "Înregistrează-te ca Dealer" - merge la /register

### Vehicles Listing Page
1. ⬜ Deschide http://localhost:3000/vehicles
2. ⬜ Verifică că se afișează vehiculele (grid 3 coloane pe desktop)
3. ⬜ Test filtre:
   - ⬜ Selectează marcă (BMW) - se filtrează
   - ⬜ Setează preț min 30000, max 60000 - se aplică
   - ⬜ Selectează an min 2023 - funcționează
   - ⬜ Schimbă combustibil la "electric" - filtrează Tesla
   - ⬜ Click "Resetează" - toate filtrele se resetează
4. ⬜ Test paginare:
   - ⬜ Click "Următorul" - schimbă pagina
   - ⬜ Click "Anterior" - merge înapoi
5. ⬜ Test responsive:
   - ⬜ Resize browser la mobile - grid devine 1 coloană
   - ⬜ Click buton "Filtre" - sidebar apare

### Vehicle Detail Page
1. ⬜ Click pe un vehicul din listă
2. ⬜ Verifică breadcrumb (Acasă / Vehicule / Brand Model)
3. ⬜ Verifică imagine mare (sau placeholder)
4. ⬜ Verifică specificații (An, Kilometraj, Combustibil, Transmisie)
5. ⬜ Scroll down - citește descrierea
6. ⬜ Verifică info dealer (nume, locație, telefon, email)
7. ⬜ Verifică badge "Verificat" lângă dealer
8. ⬜ Click "Trimite Mesaj" (ar trebui să meargă la login dacă nu ești autentificat)
9. ⬜ Click "Programează Test Drive" (similar)

### Authentication Flow
#### Register
1. ⬜ Deschide http://localhost:3000/register
2. ⬜ Completează formular:
   - Nume: Test User
   - Email: test@example.com
   - Parolă: password123
   - Confirmă parolă: password123
   - Rol: Cumpărător
3. ⬜ Click "Înregistrare"
4. ⬜ Verifică redirect la homepage
5. ⬜ Verifică navbar - apare "Test User" + buton "Ieșire"

#### Login
1. ⬜ Click "Ieșire"
2. ⬜ Click "Autentificare" în navbar
3. ⬜ Login cu:
   - Email: buyer1@example.com
   - Parolă: password
4. ⬜ Verifică redirect și user name în navbar

#### Admin Login
1. ⬜ Ieși din cont
2. ⬜ Login cu:
   - Email: admin@autosite.com
   - Parolă: password
3. ⬜ Deschide http://127.0.0.1:8000/admin
4. ⬜ Verifică Filament admin panel

### Navigation Testing
1. ⬜ Click logo "AutoSite" - merge la homepage
2. ⬜ Click "Vehicule" în navbar - merge la /vehicles
3. ⬜ Click "Dealeri" în navbar - (pagina nu există încă, ar trebui 404)
4. ⬜ Scroll jos - click orice link din footer

### Responsive Testing
#### Desktop (> 1024px)
- ⬜ Navbar full width
- ⬜ Vehicule grid 3 coloane
- ⬜ Filters visible pe sidebar
- ⬜ Footer 4 coloane

#### Tablet (768px - 1024px)
- ⬜ Vehicule grid 2 coloane
- ⬜ Filters în sidebar
- ⬜ Footer 2 coloane

#### Mobile (< 768px)
- ⬜ Navbar compact
- ⬜ Vehicule grid 1 coloană
- ⬜ Filters în drawer (buton "Filtre")
- ⬜ Footer stack vertical

### API Testing (Backend)

#### Test cu cURL
```bash
# Get all vehicles
curl http://127.0.0.1:8000/api/v1/vehicles

# Get featured vehicles
curl http://127.0.0.1:8000/api/v1/vehicles?is_featured=1

# Filter by make
curl http://127.0.0.1:8000/api/v1/vehicles?make=BMW

# Filter by price range
curl "http://127.0.0.1:8000/api/v1/vehicles?price_min=30000&price_max=60000"

# Get single vehicle
curl http://127.0.0.1:8000/api/v1/vehicles/bmw-320d-2023-xxxxx

# Register user
curl -X POST http://127.0.0.1:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password","password_confirmation":"password","role":"buyer"}'

# Login
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@autosite.com","password":"password"}'
```

### Performance Testing
1. ⬜ Open DevTools (F12)
2. ⬜ Go to Network tab
3. ⬜ Refresh homepage
4. ⬜ Verifică:
   - API calls < 500ms
   - Total load time < 3s (dev mode)
   - No console errors
5. ⬜ Go to Lighthouse tab
6. ⬜ Run audit
7. ⬜ Target scores (dev mode):
   - Performance: > 70
   - Accessibility: > 90
   - Best Practices: > 80
   - SEO: > 80

### Browser Compatibility
Test pe:
- ⬜ Chrome (latest)
- ⬜ Firefox (latest)
- ⬜ Edge (latest)
- ⬜ Safari (if available)

### Error Handling
1. ⬜ Oprește backend server
2. ⬜ Refresh frontend
3. ⬜ Verifică error handling în console
4. ⬜ Repornește backend
5. ⬜ Verifică că se reconectează

### Data Integrity
1. ⬜ Deschide database în TablePlus/DBeaver
2. ⬜ Verifică tabelul `vehicles` - 21 înregistrări
3. ⬜ Verifică tabelul `users` - 16 utilizatori
4. ⬜ Verifică tabelul `dealers` - 10 dealeri
5. ⬜ Verifică tabelul `features` - 21 features

---

## 🐛 Known Issues / Limitations (MVP)

### Not Implemented Yet
- ❌ Mesaje între buyer și dealer (butonul există dar nu e funcțional)
- ❌ Programare test drive (butonul există dar nu e funcțional)
- ❌ Favorite/Wishlist (icon în navbar dar nu funcționează)
- ❌ Comparare vehicule
- ❌ Pagina Dealeri
- ❌ Upload imagini (vehiculele au doar placeholder)
- ❌ Multi-language (doar română)
- ❌ Multi-currency conversion (doar EUR afișat)

### Expected Behavior (MVP)
- ✅ Browse vehicule - FUNCȚIONEAZĂ
- ✅ Filtre avansate - FUNCȚIONEAZĂ
- ✅ Detalii vehicul - FUNCȚIONEAZĂ
- ✅ Autentificare - FUNCȚIONEAZĂ
- ✅ Responsive design - FUNCȚIONEAZĂ

---

## ✅ Success Criteria

MVP este considerat SUCCESS dacă:
- [x] Homepage se încarcă fără erori
- [x] Lista vehicule afișează toate cele 21 vehicule
- [x] Filtrele funcționează (măcar 3 filtre)
- [x] Detalii vehicul se deschid corect
- [x] Login funcționează cu conturile de test
- [x] Register creează cont nou
- [x] Nu există erori în consolă
- [x] Design arată profesional
- [x] Responsive pe mobile

---

## 🚀 Quick Test (2 minute)

```bash
# 1. Check servers
curl http://127.0.0.1:8000/api/v1/vehicles?per_page=1
curl http://localhost:3000

# 2. Open browser
start http://localhost:3000

# 3. Click 3 things:
#    - Un vehicul din homepage
#    - Buton "Vehicule" în navbar
#    - Buton "Autentificare"

# 4. If all work = SUCCESS! ✅
```

---

## 📊 Test Results Template

```
AUTOSITE MVP - Test Results
Date: __________
Tester: __________

Homepage:           [ ] PASS  [ ] FAIL
Vehicles List:      [ ] PASS  [ ] FAIL
Filters:            [ ] PASS  [ ] FAIL
Vehicle Detail:     [ ] PASS  [ ] FAIL
Login:              [ ] PASS  [ ] FAIL
Register:           [ ] PASS  [ ] FAIL
Responsive:         [ ] PASS  [ ] FAIL
Performance:        [ ] PASS  [ ] FAIL

Overall: [ ] PASS  [ ] FAIL

Notes:
_________________________________
_________________________________
_________________________________
```

---

**Happy Testing! 🧪**
