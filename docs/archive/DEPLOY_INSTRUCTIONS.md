# 🚀 DEPLOY AUTOSITE - GHID PAS CU PAS

## ✅ OPȚIUNEA 1: Vercel (GRATUIT - Frontend Only)

### Pasul 1: Creează cont Vercel
1. Mergi la **https://vercel.com/signup**
2. Click "Continue with GitHub"
3. Autorizează Vercel să acceseze GitHub-ul tău

### Pasul 2: Import Project
1. Pe dashboard Vercel, click **"Add New Project"**
2. Click **"Import Git Repository"**
3. Selectează repository-ul **"AUTOSITE"**
4. Click **"Import"**

### Pasul 3: Configure Project
```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Pasul 4: Environment Variables
Click "Environment Variables" și adaugă:
```
NEXT_PUBLIC_API_URL = http://localhost:8000/api
```
(Temporar localhost - vom schimba când deploy-ăm backend-ul)

### Pasul 5: Deploy
1. Click **"Deploy"**
2. Așteaptă 2-3 minute
3. GATA! Vei primi un link gen: `https://autosite-xxx.vercel.app`

---

## ✅ OPȚIUNEA 2: Railway (GRATUIT - Full Stack)

### Frontend + Backend împreună!

### Pasul 1: Creează cont Railway
1. Mergi la **https://railway.app**
2. Click "Login with GitHub"
3. Autorizează Railway

### Pasul 2: Deploy Backend (Laravel)
1. Click **"New Project"**
2. Click **"Deploy from GitHub repo"**
3. Selectează **"AUTOSITE"**
4. Railway va detecta Laravel automat
5. Click pe "backend" directory
6. Add environment variables:
```
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:ZW9e2V9m4k8j7h6g5f4d3s2a1q0w9e8r7t6y5u4i3o2p1
DB_CONNECTION=mysql
FRONTEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

### Pasul 3: Deploy Frontend (Next.js)
1. În același project, click **"New Service"**
2. Click **"GitHub Repo"**
3. Selectează **"AUTOSITE"** 
4. Setează Root Directory: **frontend**
5. Add environment variables:
```
NEXT_PUBLIC_API_URL=${{backend.RAILWAY_PUBLIC_DOMAIN}}/api
```

### Pasul 4: Database (MySQL)
1. Click **"New Service"**
2. Click **"Database"**
3. Selectează **"MySQL"**
4. Railway va conecta automat la backend

---

## 🎯 RECOMANDAREA MEA

**Pentru DEMO rapid** → **Vercel** (2 minute setup)
**Pentru PRODUCȚIE completă** → **Railway** (5 minute setup, dar ai tot stack-ul)

---

## 📱 După Deploy

### Verifică că totul funcționează:
- ✅ Homepage se încarcă
- ✅ Vehicles page afișează mașini
- ✅ Filtrele funcționează
- ✅ Dark mode merge
- ✅ Design-ul e intact (EXACT ca local!)

### Dacă ceva nu merge:
1. Check Build Logs în Vercel/Railway
2. Verifică Environment Variables
3. Test API endpoint-urile

---

## 💡 NOTĂ IMPORTANTĂ

**DESIGNUL RĂMÂNE 100% LA FEL!**
- Același UI
- Aceleași culori
- Aceleași animații
- Aceleași fonturi
- TOT ce ați făcut voi rămâne identic!

Vercel/Railway doar HOSTEAZĂ fișierele - ca un CDN super rapid.
ZERO modificări la design!

---

## 🔥 BONUS: Custom Domain (Opțional)

După ce e live, poți adăuga domeniu propriu:
1. Cumpără domeniu de pe **porkbun.com** (~$10/an)
2. În Vercel/Railway → Settings → Domains
3. Add your domain
4. Update DNS records (îți arată ei cum)

---

**Gata! În 5 minute ai site-ul LIVE! 🚀**
