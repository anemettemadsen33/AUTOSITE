# GitHub Actions Setup for AUTOSITE

## Workflow Overview

- `auto-laravel-fix.yml` — rulează la push asupra branch‑ului `main` sau manual. Curăţă stilul de cod, rulează analiza statică şi commit‑ează automat fix‑uri, dacă le găseşte.
- `ai-reviewer.yml` — rulează la fiecare Pull Request (deschis sau sincronizat). Foloseşte un agent AI conectat la OpenAI ca să lase comentarii pe cod în PR‑uri.

## Instalare rapidă

1. Asigură‑te că ai setat în `Settings → Secrets and variables → Actions`:
   - `OPENAI_API_KEY` → cheia ta OpenAI
   - `GITHUB_TOKEN` → (este setat automat de GitHub)
2. Creează în repository folderul `.github/workflows/` dacă nu există.
3. Copiază fişierele `auto-laravel-fix.yml` şi `ai-reviewer.yml` în acel folder.
4. Commit‑ează setările, apoi fă un push pe `main`.
5. Asigură‑te că branch‑ul `main` are protecţii (vezi secţiunea următoare).

## Protecţie branch & PR

- Mergi la `Settings → Branches → main → Protect this branch`
- Activează:
  - Require pull request before merging
  - Require status checks to pass before merging
  - Selectează job‑urile „auto fix” şi „ai reviewer” ca status checks obligatorii
  - Optionally: Require reviews (ex: 1 reviewer)
  - Optionally: Require code owners

## Ce face acest setup

- Menţine codul backend‑ului ţintă curat (stil, tipuri, best practices)
- Introduce un comentator AI care detectează probleme de calitate în PR‑uri
- Automatizează partea de stil + commit fixuri pentru Laravel

## Ce **NU** face (deocamdată)

- Nu face deploy automat pe server — ar putea fi adăugat într‑un workflow separat
- Nu poate genera cod nou complex — doar comentarii + fixuri simple
- Nu gestionează automat toate tipurile de test (e2e, UI) — dacă ai, trebuie să le configurezi separat

## Extensii recomandate

- Adaugă un job de testare e2e pentru frontend (ex: Playwright) dacă există un frontend React/Vue
- Adaugă un workflow de actualizare automată a dependenţelor (ex: `dependabot.yml`)
- Adaugă verificări de securitate suplimentare (ex: `php‑cs‑fixer`, `sonarcloud`, `codeql` doar pentru JS/TS)

---

💡 Dacă ai întrebări suplimentare sau vrei să adăugăm şi deploy automat + notificări Slack/Teams, spune‑mi şi le putem implementa!
