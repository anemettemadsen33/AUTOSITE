# ⚡ AUTOSITE Backend - Quick Setup Guide

**For**: Development environment setup  
**Time**: 5-10 minutes

---

## 🚀 Prerequisites

- PHP 8.2+ installed
- Composer 2.x installed
- SQLite (usually comes with PHP)
- Git

### Check Prerequisites

```bash
php --version      # Should be 8.2+
composer --version # Should be 2.x
```

---

## 📦 Installation Steps

### Step 1: Navigate to Backend Directory

```bash
cd /path/to/AUTOSITE/backend
```

### Step 2: Install Dependencies

```bash
composer install
```

This will install all PHP dependencies including:
- Laravel 11
- Filament v4
- Spatie packages
- Testing frameworks

**Time**: 2-3 minutes

### Step 3: Environment Setup

```bash
# Copy example environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 4: Database Setup

```bash
# Create SQLite database file (for development)
touch database/database.sqlite

# Run migrations
php artisan migrate

# Seed database with demo data
php artisan db:seed
```

This creates:
- 21 demo vehicles
- 16 users (admin, dealers, buyers)
- 10 dealer profiles
- Demo data across all tables

### Step 5: Storage Setup

```bash
# Create symbolic link for file storage
php artisan storage:link
```

---

## ✅ Verification

### Start Development Server

```bash
php artisan serve
```

Server will run at: `http://127.0.0.1:8000`

### Test API Endpoints

```bash
# List vehicles
curl http://127.0.0.1:8000/api/v1/vehicles

# Get specific vehicle
curl http://127.0.0.1:8000/api/v1/vehicles/bmw-x5-2024
```

### Run Tests

```bash
php artisan test
```

All tests should pass ✅

---

## 🎯 Access Points

After setup:

- **API Base**: `http://127.0.0.1:8000/api/v1`
- **Admin Panel**: `http://127.0.0.1:8000/admin`
- **API Documentation**: Coming soon (Swagger)

### Admin Login Credentials

```
Email: admin@autosite.com
Password: password
```

### Test Dealer Login

```
Email: dealer1@autosite.com
Password: password
```

---

## 🔧 Development Commands

### Cache Commands

```bash
# Clear all caches
php artisan optimize:clear

# Cache for better performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Database Commands

```bash
# Fresh migration (WARNING: deletes all data)
php artisan migrate:fresh

# Fresh migration with seeders
php artisan migrate:fresh --seed

# Rollback last migration
php artisan migrate:rollback
```

### Testing Commands

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage

# Run specific test
php artisan test --filter=VehicleFilterTest

# Run with detailed output
php artisan test --testdox
```

---

## 🐛 Troubleshooting

### Issue: "Composer not found"

**Solution**: Install Composer from https://getcomposer.org/

### Issue: "PHP version too old"

**Solution**: Upgrade to PHP 8.2+

```bash
# Check current version
php --version

# Ubuntu/Debian
sudo apt install php8.2 php8.2-cli php8.2-common

# macOS (using Homebrew)
brew install php@8.2
```

### Issue: "Class not found" errors

**Solution**: Regenerate autoload files

```bash
composer dump-autoload
```

### Issue: "Permission denied" on storage

**Solution**: Fix permissions

```bash
chmod -R 775 storage bootstrap/cache
```

### Issue: "Database connection failed"

**Solution**: Check database configuration in `.env`

For development (SQLite):
```
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database/database.sqlite
```

### Issue: Tests failing

**Solution**: 

```bash
# Clear test cache
php artisan config:clear

# Run migrations for test database
php artisan migrate --env=testing

# Re-run tests
php artisan test
```

---

## 📚 Next Steps

After successful setup:

1. ✅ Read [TESTING_GUIDE.md](./TESTING_GUIDE.md)
2. ✅ Check [README.md](./README.md) for detailed documentation
3. ✅ Review [API_ENDPOINTS.md](../docs/API_ENDPOINTS.md)
4. ✅ Start development!

---

## 💡 Tips

### Performance

- Use SQLite for development (faster)
- Use MySQL/PostgreSQL for production
- Enable caching with `php artisan optimize`

### Testing

- Always run tests before committing
- Use `RefreshDatabase` trait in tests
- Aim for >70% code coverage

### Git

```bash
# Before committing
php artisan test
composer lint  # If configured
```

---

## 🆘 Need Help?

- **Documentation**: `/docs` folder
- **Laravel Docs**: https://laravel.com/docs
- **Filament Docs**: https://filamentphp.com/docs

---

**Setup Time**: ~5-10 minutes  
**Status**: ✅ READY FOR DEVELOPMENT

---

*Part of AUTOSITE Backend - Quick Start Guide*
