# Quick Reference Guide - New Features

## 🚀 Quick Start

### Test Drive Appointments
```bash
# Create appointment
curl -X POST http://localhost:8000/api/test-drive-appointments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "appointment_date": "2025-11-01 10:00:00",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+1234567890"
  }'

# List appointments
curl http://localhost:8000/api/test-drive-appointments \
  -H "Authorization: Bearer YOUR_TOKEN"

# Confirm appointment (dealer only)
curl -X POST http://localhost:8000/api/test-drive-appointments/1/confirm \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Currency Conversion
```bash
# Get exchange rates
curl http://localhost:8000/api/exchange-rates

# Convert currency
curl -X POST http://localhost:8000/api/currency/convert \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "from": "EUR",
    "to": "USD"
  }'
```

### Multi-language
```bash
# Get supported languages
curl http://localhost:8000/api/languages

# Get translations for English
curl http://localhost:8000/api/translations/en

# Get translations for German
curl http://localhost:8000/api/translations/de
```

### Image Management
```bash
# Upload images
curl -X POST http://localhost:8000/api/vehicles/1/images \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "images[]=@/path/to/image1.jpg" \
  -F "images[]=@/path/to/image2.jpg"

# Delete image
curl -X DELETE http://localhost:8000/api/vehicles/1/images/5 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Reorder images
curl -X POST http://localhost:8000/api/vehicles/1/images/reorder \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"order": [3, 1, 2, 4]}'
```

### SEO
```bash
# Get sitemap
curl http://localhost:8000/sitemap.xml

# Get robots.txt
curl http://localhost:8000/robots.txt
```

---

## 📋 Environment Setup

1. **Install dependencies**
```bash
composer install
```

2. **Run migrations**
```bash
php artisan migrate --force
```

3. **Update exchange rates**
```bash
php artisan exchange:update
```

4. **Set up scheduled tasks** (in crontab)
```bash
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```

---

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific feature tests
php artisan test tests/Feature/TestDriveAppointmentTest.php
php artisan test tests/Feature/CurrencyConversionTest.php
php artisan test tests/Feature/TranslationTest.php

# Run with coverage
php artisan test --coverage
```

---

## 🔑 API Authentication

All protected endpoints require a Bearer token:

```bash
# Get token
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password"
  }'

# Use token
curl http://localhost:8000/api/test-drive-appointments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 💾 Database Schema

### test_drive_appointments
```sql
id, user_id, vehicle_id, dealer_id, appointment_date, 
preferred_time, customer_name, customer_email, customer_phone,
message, status, dealer_notes, confirmed_at, cancelled_at,
created_at, updated_at
```

**Status values**: `pending`, `confirmed`, `cancelled`, `completed`

---

## 🌍 Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| en   | English  | English     |
| de   | German   | Deutsch     |
| fr   | French   | Français    |
| es   | Spanish  | Español     |
| it   | Italian  | Italiano    |
| pt   | Portuguese | Português |
| ro   | Romanian | Română      |
| pl   | Polish   | Polski      |

---

## 💱 Supported Currencies

| Code | Currency | Symbol |
|------|----------|--------|
| EUR  | Euro     | €      |
| USD  | US Dollar | $     |
| RON  | Romanian Leu | RON |
| GBP  | British Pound | £  |
| CHF  | Swiss Franc | CHF  |
| DKK  | Danish Krone | DKK |
| SEK  | Swedish Krona | SEK |
| PLN  | Polish Złoty | PLN |

---

## 📸 Image Upload Limits

- **Max files per upload**: 10
- **Max file size**: 5MB per image
- **Supported formats**: JPEG, JPG, PNG, WebP
- **Auto-generated**: Responsive images via Spatie Media Library

---

## 🔍 SEO Features

### Sitemap
- Automatically includes all published vehicles
- Updates on vehicle changes
- Includes priority and change frequency

### Structured Data
Each vehicle includes Schema.org Car type with:
- Brand, model, year
- Mileage
- Price and currency
- Fuel type, transmission
- Availability status

---

## 📝 Code Examples

### Creating a Test Drive Appointment (PHP)
```php
use App\Models\TestDriveAppointment;

$appointment = TestDriveAppointment::create([
    'user_id' => auth()->id(),
    'vehicle_id' => $vehicleId,
    'dealer_id' => $vehicle->user_id,
    'appointment_date' => now()->addDays(3),
    'customer_name' => 'John Doe',
    'customer_email' => 'john@example.com',
    'customer_phone' => '+1234567890',
]);
```

### Currency Conversion (PHP)
```php
use App\Services\CurrencyService;

$service = new CurrencyService();
$converted = $service->convert(100, 'EUR', 'USD');
$formatted = $service->format($converted, 'USD');
```

### Getting Translations (JavaScript)
```javascript
// Fetch supported languages
const languages = await fetch('/api/languages').then(r => r.json());

// Get translations for a language
const translations = await fetch('/api/translations/en').then(r => r.json());
```

---

## ⚙️ Configuration

### Exchange Rate Updates
In `routes/console.php`:
```php
Schedule::command('exchange:update')->dailyAt('02:00');
```

### Rate Limiting
In `routes/api.php`:
```php
Route::middleware('throttle:api')->group(function () {
    // 60 requests per minute
});
```

---

## 🐛 Troubleshooting

### Exchange Rates Not Updating
```bash
# Manually update
php artisan exchange:update

# Check scheduled tasks
php artisan schedule:list
```

### Image Upload Fails
- Check file size (max 5MB)
- Verify storage disk configuration
- Ensure storage/app/public is writable

### Translation Not Found
- Verify locale exists in supported languages
- Check translation file exists in resources/lang/{locale}/
- Default fallback is 'en'

---

## 📚 Documentation Files

- `NEW_FEATURES.md` - Complete API documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `QUICK_REFERENCE.md` - This file

---

**Quick help**: For detailed documentation, see `NEW_FEATURES.md`
