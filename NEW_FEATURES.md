# AUTOSITE - New Features Documentation

This document describes the newly implemented features as part of the requirements.

## 📋 Overview

The following features have been successfully implemented:

1. ✅ **Test Drive Appointments** - Complete booking system for vehicle test drives
2. ✅ **Multi-language Support** - 8 language support with translation API
3. ✅ **Multi-currency Conversion** - Real-time currency conversion with 8+ currencies
4. ✅ **SEO Optimization** - Sitemap, robots.txt, and structured data
5. ✅ **Vehicle Image Management** - Enhanced upload, delete, and reorder functionality
6. ✅ **Messaging System** - Already implemented (buyer-dealer communication)
7. ✅ **Favorites/Wishlist** - Already implemented
8. ✅ **Vehicle Comparison** - Already implemented (up to 4 vehicles)

---

## 🚗 Test Drive Appointments

### Features
- Users can schedule test drive appointments for vehicles
- Dealers can confirm, cancel, or mark appointments as completed
- Full CRUD operations with status tracking

### API Endpoints

#### List Appointments
```http
GET /api/test-drive-appointments
Authorization: Bearer {token}
```

#### Create Appointment
```http
POST /api/test-drive-appointments
Authorization: Bearer {token}

{
  "vehicle_id": 1,
  "appointment_date": "2025-11-01 10:00:00",
  "preferred_time": "10:00 AM",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "message": "I would like to test drive this vehicle"
}
```

#### Get Appointment Details
```http
GET /api/test-drive-appointments/{id}
Authorization: Bearer {token}
```

#### Update Appointment
```http
PATCH /api/test-drive-appointments/{id}
Authorization: Bearer {token}

{
  "appointment_date": "2025-11-02 14:00:00",
  "dealer_notes": "Customer confirmed via phone"
}
```

#### Confirm Appointment (Dealer Only)
```http
POST /api/test-drive-appointments/{id}/confirm
Authorization: Bearer {token}
```

#### Cancel Appointment
```http
POST /api/test-drive-appointments/{id}/cancel
Authorization: Bearer {token}
```

#### Complete Appointment (Dealer Only)
```http
POST /api/test-drive-appointments/{id}/complete
Authorization: Bearer {token}
```

#### Delete Appointment
```http
DELETE /api/test-drive-appointments/{id}
Authorization: Bearer {token}
```

### Statuses
- `pending` - Newly created appointment awaiting dealer confirmation
- `confirmed` - Dealer has confirmed the appointment
- `cancelled` - Appointment was cancelled
- `completed` - Test drive was completed

---

## 🌍 Multi-language Support

### Supported Languages
1. 🇬🇧 English (en)
2. 🇩🇪 German (de)
3. 🇫🇷 French (fr)
4. 🇪🇸 Spanish (es)
5. 🇮🇹 Italian (it)
6. 🇵🇹 Portuguese (pt)
7. 🇷🇴 Romanian (ro)
8. 🇵🇱 Polish (pl)

### API Endpoints

#### Get Supported Languages
```http
GET /api/languages
```

Response:
```json
{
  "languages": {
    "en": {"name": "English", "native": "English"},
    "de": {"name": "German", "native": "Deutsch"},
    ...
  },
  "default": "en"
}
```

#### Get Translations for a Language
```http
GET /api/translations/{locale}
```

Example: `GET /api/translations/en`

Response:
```json
{
  "locale": "en",
  "translations": {
    "home": "Home",
    "vehicles": "Vehicles",
    "search": "Search",
    ...
  }
}
```

### Vehicle Content Translation

Vehicles support translatable fields using Spatie Translatable:
- `title` - Vehicle title in multiple languages
- `description` - Vehicle description in multiple languages

Example:
```json
{
  "title": {
    "en": "2023 BMW X5",
    "de": "2023 BMW X5",
    "ro": "2023 BMW X5"
  },
  "description": {
    "en": "Luxury SUV with advanced features",
    "de": "Luxus-SUV mit fortschrittlichen Funktionen",
    "ro": "SUV de lux cu funcții avansate"
  }
}
```

---

## 💱 Multi-currency Conversion

### Supported Currencies
- EUR (Euro) - Base currency
- USD (US Dollar)
- RON (Romanian Leu)
- GBP (British Pound)
- CHF (Swiss Franc)
- DKK (Danish Krone)
- SEK (Swedish Krona)
- PLN (Polish Złoty)

### API Endpoints

#### Get Exchange Rates
```http
GET /api/exchange-rates
```

Response:
```json
{
  "base_currency": "EUR",
  "rates": {
    "EUR": 1.0,
    "USD": 1.10,
    "RON": 4.95,
    "GBP": 0.85,
    ...
  },
  "supported_currencies": {
    "EUR": {"name": "Euro", "symbol": "€"},
    "USD": {"name": "US Dollar", "symbol": "$"},
    ...
  }
}
```

#### Convert Currency
```http
POST /api/currency/convert

{
  "amount": 100,
  "from": "EUR",
  "to": "USD"
}
```

Response:
```json
{
  "original_amount": 100,
  "from_currency": "EUR",
  "to_currency": "USD",
  "converted_amount": 110.00,
  "formatted": "$ 110.00"
}
```

### Automatic Updates

Exchange rates are automatically updated daily at 02:00 using the scheduled command:
```bash
php artisan exchange:update
```

This is configured in `routes/console.php`:
```php
Schedule::command('exchange:update')->dailyAt('02:00')->withoutOverlapping();
```

---

## 🔍 SEO Optimization

### Features
- XML Sitemap generation
- Robots.txt
- Structured data (Schema.org) for vehicles
- Meta tags support on vehicles

### API Endpoints

#### XML Sitemap
```http
GET /sitemap.xml
```

Generates a sitemap including:
- Homepage
- Vehicles listing page
- Individual vehicle pages

#### Robots.txt
```http
GET /robots.txt
```

Configures:
- Allowed/disallowed paths
- Sitemap location

### Vehicle Meta Tags

Vehicles support SEO fields:
- `meta_title` - Custom title for SEO
- `meta_description` - Custom description for SEO
- `slug` - URL-friendly identifier

### Structured Data

Each vehicle includes Schema.org structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "Car",
  "name": "2023 BMW X5",
  "brand": {
    "@type": "Brand",
    "name": "BMW"
  },
  "model": "X5",
  "vehicleModelDate": 2023,
  "mileageFromOdometer": {
    "@type": "QuantitativeValue",
    "value": 15000,
    "unitCode": "KMT"
  },
  "offers": {
    "@type": "Offer",
    "price": 65000,
    "priceCurrency": "EUR"
  }
}
```

---

## 📸 Vehicle Image Management

### Features
- Upload multiple images (max 10 per request)
- Delete individual images
- Reorder images
- Automatic responsive image generation
- Support for JPEG, PNG, WebP formats
- Maximum 5MB per image

### API Endpoints

#### List Vehicle Images
```http
GET /api/vehicles/{vehicle}/images
Authorization: Bearer {token}
```

#### Upload Images
```http
POST /api/vehicles/{vehicle}/images
Authorization: Bearer {token}
Content-Type: multipart/form-data

images[]: [file1.jpg]
images[]: [file2.jpg]
```

#### Delete Image
```http
DELETE /api/vehicles/{vehicle}/images/{mediaId}
Authorization: Bearer {token}
```

#### Reorder Images
```http
POST /api/vehicles/{vehicle}/images/reorder
Authorization: Bearer {token}

{
  "order": [3, 1, 2, 4]
}
```

### Image Formats
Uploaded images are automatically optimized and responsive versions are created using Spatie Media Library.

---

## 💬 Messaging System (Already Implemented)

### Features
- Conversations between buyers and dealers
- Message threading
- Read/unread status
- Start conversation directly from vehicle page

### API Endpoints

#### Get Conversations
```http
GET /api/conversations
Authorization: Bearer {token}
```

#### Get Messages in Conversation
```http
GET /api/conversations/{conversation}/messages
Authorization: Bearer {token}
```

#### Send Message
```http
POST /api/messages/send
Authorization: Bearer {token}

{
  "conversation_id": 1,  // optional for new conversation
  "vehicle_id": 1,       // required for new conversation
  "recipient_id": 2,     // required for new conversation
  "subject": "Question about BMW X5",  // required for new conversation
  "content": "Is this vehicle still available?"
}
```

#### Mark Conversation as Read
```http
POST /api/conversations/{conversation}/mark-read
Authorization: Bearer {token}
```

#### Start Conversation from Vehicle
```http
POST /api/vehicles/{vehicle}/start-conversation
Authorization: Bearer {token}

{
  "subject": "Inquiry about your vehicle",
  "content": "I'm interested in this vehicle..."
}
```

---

## ⭐ Favorites/Wishlist (Already Implemented)

### API Endpoints

#### Get User's Favorites
```http
GET /api/favorites
Authorization: Bearer {token}
```

#### Toggle Favorite
```http
POST /api/favorites/toggle
Authorization: Bearer {token}

{
  "vehicle_id": 1
}
```

#### Check if Vehicle is Favorited
```http
GET /api/favorites/check/{vehicle_id}
Authorization: Bearer {token}
```

---

## 🔄 Vehicle Comparison (Already Implemented)

### Features
- Compare up to 4 vehicles side-by-side
- Save comparison sessions
- Guest and authenticated user support

### API Endpoints

#### Get Comparisons
```http
GET /api/vehicle-comparisons
Authorization: Bearer {token}
```

#### Create Comparison
```http
POST /api/vehicle-comparisons
Authorization: Bearer {token}

{
  "vehicle_ids": [1, 2, 3]
}
```

#### Add Vehicle to Comparison
```http
POST /api/vehicle-comparisons/{comparison}/add
Authorization: Bearer {token}

{
  "vehicle_id": 4
}
```

#### Remove Vehicle from Comparison
```http
POST /api/vehicle-comparisons/{comparison}/remove
Authorization: Bearer {token}

{
  "vehicle_id": 2
}
```

---

## 🧪 Testing

All new features include comprehensive tests:

```bash
# Run all tests
php artisan test

# Run specific feature tests
php artisan test tests/Feature/TestDriveAppointmentTest.php
php artisan test tests/Feature/CurrencyConversionTest.php
php artisan test tests/Feature/TranslationTest.php
```

---

## 📦 Dependencies

New packages utilized:
- `spatie/laravel-translatable` - Multi-language support
- `spatie/laravel-medialibrary` - Image management
- Existing Laravel packages for other features

---

## 🔐 Authentication

Most endpoints require authentication using Laravel Sanctum:

```http
Authorization: Bearer {your-token-here}
```

To obtain a token:
```http
POST /api/login

{
  "email": "user@example.com",
  "password": "password"
}
```

---

## 📝 Notes

- All monetary values use the `price_amount` and `price_currency` fields
- Exchange rates are fetched from exchangerate-api.com
- Images are stored using Spatie Media Library with automatic optimization
- Vehicle content (title, description) supports all 8 languages
- SEO fields are optional but recommended for better search visibility

---

## 🚀 Future Enhancements

Potential improvements for future releases:
- Push notifications for test drive confirmations
- Email notifications for appointments and messages
- More currency pairs
- Translation management UI in admin panel
- Advanced image editing (crop, rotate, filters)
- Vehicle history tracking
- Rating and review system

---

**Last Updated**: October 26, 2025
**Version**: 1.0.0
