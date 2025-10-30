# 🏗️ AUTOSITE - Structura Proiectului

Vizualizare completă a structurii proiectului AUTOSITE.

---

## 📁 Structura Directorii

```
AUTOSITE/
│
├── 📂 backend/                    ✅ Laravel 11 API + Admin Panel
│   ├── app/
│   │   ├── Filament/             # Filament v4 Admin Resources
│   │   ├── Http/
│   │   │   ├── Controllers/      # 21 API Controllers
│   │   │   ├── Middleware/       # Auth, CORS, etc.
│   │   │   └── Resources/        # API Resources (transformers)
│   │   ├── Models/               # Eloquent Models (User, Vehicle, Dealer, etc.)
│   │   └── Services/             # Business Logic
│   ├── database/
│   │   ├── migrations/           # Database Schema
│   │   ├── seeders/              # Demo Data (21 vehicles, 16 users)
│   │   └── factories/            # Model Factories
│   ├── routes/
│   │   ├── api.php              # API Routes (RESTful)
│   │   └── web.php              # Web Routes (Admin Panel)
│   ├── config/                   # Laravel Config
│   ├── composer.json            # PHP Dependencies
│   └── README.md                # Backend Documentation
│
├── 📂 frontend/                   ✅ React 19 + Vite SPA
│   ├── src/
│   │   ├── components/          # React Components
│   │   │   └── ui/              # Shadcn UI (45+ components)
│   │   ├── pages/               # Page Components (30+ pages)
│   │   │   ├── HomePage.tsx
│   │   │   ├── CategoryPageEnhanced.tsx
│   │   │   ├── ListingDetailPage.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   └── ...
│   │   ├── lib/                 # Utilities
│   │   │   ├── data.ts         # Mock Data (35+ vehicles)
│   │   │   ├── types.ts        # TypeScript Types
│   │   │   └── auth.tsx        # Auth Context
│   │   └── hooks/              # Custom React Hooks
│   ├── docs/                    # Frontend Docs
│   ├── package.json            # NPM Dependencies
│   └── README.md               # Frontend Documentation
│
├── 📂 docs/                      ✅ Project Documentation
│   ├── ARCHITECTURE.md          # System Architecture
│   ├── DATABASE_SCHEMA.md       # Database ERD & Schema
│   ├── API_ENDPOINTS.md         # API Documentation
│   ├── TECHNICAL_SPECS.md       # Technical Specifications
│   ├── SETUP.md                 # Setup Instructions
│   ├── DEPLOYMENT_GUIDE.md      # Deployment Guide
│   ├── README.md                # Docs Index
│   └── archive/                 # Archived Documentation (45+ files)
│
├── 📂 .github/                   ✅ CI/CD & Workflows
│   └── workflows/
│       ├── backend-ci.yml
│       ├── backend-tests.yml
│       ├── frontend-ci.yml
│       ├── frontend-tests.yml
│       ├── e2e-tests.yml
│       ├── build.yml
│       └── deploy.yml
│
├── 📄 README.md                  # Main Project README
├── 📄 ANALIZA_PROIECT.md        # Detailed Analysis (RO) ⭐ NOU
├── 📄 PROJECT_STATUS.md         # Status Report (EN) ⭐ NOU
├── 📄 REZUMAT_RAPID.md          # Quick Summary (RO) ⭐ NOU
├── 📄 STRUCTURA_PROIECT.md      # This File ⭐ NOU
├── 📄 .gitignore
└── 📄 .editorconfig
```

---

## 🔄 Flow Arhitectural

```
┌─────────────────────────────────────────────────────────────────┐
│                         AUTOSITE Platform                        │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
        ┌──────────────────┐      ┌──────────────────┐
        │    FRONTEND      │◄────►│     BACKEND      │
        │  React 19 + Vite │      │   Laravel 11     │
        └──────────────────┘      └──────────────────┘
                 │                         │
                 │                         │
        ┌────────┴────────┐       ┌────────┴────────┐
        ▼                 ▼       ▼                 ▼
   ┌────────┐      ┌─────────┐ ┌─────┐      ┌──────────┐
   │  User  │      │ Browser │ │ API │      │ Database │
   │   UI   │      │ Router  │ │     │      │  MySQL   │
   └────────┘      └─────────┘ └─────┘      └──────────┘
        │                 │       │                 │
        ▼                 ▼       ▼                 ▼
   - 30+ Pages      - Client    - REST      - 15 Tables
   - 45+ Comps      - State     - Sanctum   - Seeders
   - Tailwind       - Zustand   - CORS      - Demo Data
   - Dark Mode                   - JWT
```

---

## 🗄️ Database Schema (Simplificat)

```
┌─────────────┐
│    users    │
├─────────────┤
│ id          │◄────┐
│ name        │     │
│ email       │     │
│ role        │     │
└─────────────┘     │
                    │
┌─────────────┐     │
│   dealers   │     │
├─────────────┤     │
│ id          │     │
│ user_id     │─────┘
│ company     │
│ verified    │
└─────────────┘
       △
       │
       │
┌─────────────┐
│  vehicles   │
├─────────────┤
│ id          │
│ dealer_id   │────────┐
│ make        │        │
│ model       │        │
│ price       │        │
│ year        │        │
│ category    │        │
│ status      │        │
└─────────────┘        │
       △               │
       │               │
       └───────────────┘

Plus: favorites, messages, reviews, images, etc.
```

---

## 🛠️ Tech Stack Complete

### Backend Stack
```
Laravel 11.46
├── Filament v4              (Admin Panel)
├── Sanctum                  (Authentication)
├── Spatie Media Library     (Images)
├── Spatie Translatable      (Multi-language)
├── Spatie Laravel Money     (Currency)
└── L5 Swagger              (API Docs)

Dependencies:
- PHP 8.2+
- Composer 2.x
- MySQL 8+ / SQLite
```

### Frontend Stack
```
React 19.0.0 + Vite 6.3.5
├── TypeScript 5.7.2         (Language)
├── Tailwind CSS 4.1.11      (Styling)
├── Shadcn UI                (Components)
├── Zustand                  (State)
├── React Query              (Data fetching)
├── Framer Motion            (Animations)
├── Phosphor Icons           (Icons)
├── React Hook Form          (Forms)
└── Zod                      (Validation)

Dependencies:
- Node.js 18+
- NPM 9+
```

---

## 🔌 API Endpoints (18+)

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/user
```

### Vehicles
```
GET    /api/vehicles           (List + Filters)
GET    /api/vehicles/{slug}    (Details)
POST   /api/vehicles           (Create) 🔒
PUT    /api/vehicles/{id}      (Update) 🔒
DELETE /api/vehicles/{id}      (Delete) 🔒
```

### Dealers
```
GET    /api/dealers
GET    /api/dealers/{id}
```

### Categories
```
GET    /api/categories
GET    /api/categories/{slug}
```

### Settings
```
GET    /api/settings/public
GET    /api/exchange-rates
```

🔒 = Requires Authentication

---

## 📊 Features Matrix

| Feature | Backend | Frontend | Integration | Status |
|---------|---------|----------|-------------|--------|
| User Auth | ✅ | ✅ | ❌ | 66% |
| Vehicle CRUD | ⚠️ | ✅ | ❌ | 50% |
| Search/Filter | ⚠️ | ✅ | ❌ | 60% |
| Image Upload | ✅ | ✅ | ❌ | 66% |
| Admin Panel | ✅ | N/A | N/A | 100% |
| Multi-language | ❌ | ❌ | ❌ | 0% |
| Multi-currency | ❌ | ❌ | ❌ | 0% |
| Live Auctions | ❌ | ✅ | ❌ | 33% |
| AI Features | ❌ | ✅ | ❌ | 33% |
| Dark Mode | N/A | ✅ | N/A | 100% |
| Responsive | N/A | ✅ | N/A | 100% |

Legend:
- ✅ Complete
- ⚠️ Partial
- ❌ Missing
- N/A Not Applicable

---

## 🎯 Priority Matrix

```
HIGH PRIORITY (Do Now):
┌─────────────────────────────────────┐
│ 1. Complete Backend API             │
│ 2. Backend-Frontend Integration     │
│ 3. Testing (Unit + Integration)     │
└─────────────────────────────────────┘

MEDIUM PRIORITY (Do Next):
┌─────────────────────────────────────┐
│ 4. Multi-language Support           │
│ 5. Multi-currency                   │
│ 6. Performance Optimization         │
└─────────────────────────────────────┘

LOW PRIORITY (Do Later):
┌─────────────────────────────────────┐
│ 7. Advanced Features (AI, Auctions) │
│ 8. SEO Optimization                 │
│ 9. Analytics & Monitoring           │
└─────────────────────────────────────┘
```

---

## 📈 Development Workflow

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  LOCAL   │───►│   GIT    │───►│  GITHUB  │───►│ CI/CD    │
│   DEV    │    │  COMMIT  │    │  PUSH    │    │ ACTIONS  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │                │                │
     ▼               ▼                ▼                ▼
Backend:        Frontend:        Branch:         Tests:
- php serve    - npm dev         - feature/*     - PHPUnit
- MySQL        - Vite            - main          - Jest
- Filament     - Hot reload      - develop       - Cypress
```

---

## 🔗 Links Utile

### Documentation
- 📘 [ANALIZA_PROIECT.md](./ANALIZA_PROIECT.md) - Analiză completă (RO)
- 📗 [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Status report (EN)
- 📕 [REZUMAT_RAPID.md](./REZUMAT_RAPID.md) - Quick summary (RO)
- 📚 [/docs/](./docs/) - Technical documentation

### Repository
- 🔗 [GitHub](https://github.com/anemettemadsen33/AUTOSITE)
- 🔗 [Issues](https://github.com/anemettemadsen33/AUTOSITE/issues)
- 🔗 [Pull Requests](https://github.com/anemettemadsen33/AUTOSITE/pulls)

### Local URLs (Development)
- 🌐 Frontend: http://localhost:3000
- 🌐 Backend API: http://localhost:8000/api
- 🌐 Admin Panel: http://localhost:8000/admin

---

## 📊 Project Size

```
Code Lines:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Backend:   ████████████░░░  ~15,000 lines
Frontend:  ██████████████░  ~20,000 lines
Docs:      ████░░░░░░░░░░   ~5,000 lines
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total:                      ~40,000 lines

Files:
- Backend: ~150 files
- Frontend: ~100 files
- Docs: ~60 files
- Total: ~310 files

Dependencies:
- Backend: ~50 packages (Composer)
- Frontend: ~80 packages (NPM)
```

---

**Ultima actualizare**: 29 Octombrie 2025  
**Versiune**: 1.0  
**Status**: 🔨 IN ACTIVE DEVELOPMENT

---

*Pentru detalii complete, vezi:*
- *ANALIZA_PROIECT.md - Analiză detaliată*
- *PROJECT_STATUS.md - Raport de status*
- *REZUMAT_RAPID.md - Quick reference*
