# AUTOSITE

[![Auto Fix Laravel Code](https://github.com/anemettemadsen33/AUTOSITE/actions/workflows/auto-laravel-fix.yml/badge.svg)](https://github.com/anemettemadsen33/AUTOSITE/actions/workflows/auto-laravel-fix.yml)  
[![AI Reviewer PR Comments](https://github.com/anemettemadsen33/AUTOSITE/actions/workflows/ai-reviewer.yml/badge.svg)](https://github.com/anemettemadsen33/AUTOSITE/actions/workflows/ai-reviewer.yml)  

Plată‑închirieri auto platformă full‑stack: backend în Laravel + admin panel cu Filament + frontend modern.  
Proiectul încorporează automatizări CI/CD, comentarii AI la Pull Request‑uri şi curăţare automată a codului.

## 🔍 Tehnologii
- Backend: Laravel, MySQL/PostgreSQL  
- Admin panel: Filament  
- Frontend: (menţionează librăria/framework‑ul)  
- CI/CD: GitHub Actions (Auto‑Fix, AI Reviewer, Dependabot)  
- Stil & calitate cod: Pint, PHPStan / Larastan  

## 🚀 Instalare rapidă
```bash
git clone https://github.com/anemettemadsen33/AUTOSITE.git
cd AUTOSITE
composer install
php artisan migrate --seed
npm install # dacă frontend
npm run build # dacă frontend
php artisan serve
