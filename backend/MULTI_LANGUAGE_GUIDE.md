# 🌍 AUTOSITE Backend - Multi-Language Support Guide

**Created**: 29 October 2025  
**Status**: Day 2 - Multi-Language Implementation  
**Package**: Spatie Laravel Translatable v6.11

---

## 📋 Overview

AUTOSITE supports **8 EU languages** for international reach:
- 🇬🇧 English (en) - Default
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇮🇹 Italian (it)
- 🇵🇹 Portuguese (pt)
- 🇷🇴 Romanian (ro)
- 🇵🇱 Polish (pl)

---

## 🚀 Quick Start

### Making API Requests with Language

```bash
# Get vehicles in English (default)
curl http://localhost:8000/api/v1/vehicles

# Get vehicles in German
curl http://localhost:8000/api/v1/vehicles?lang=de

# Get vehicles in Romanian
curl http://localhost:8000/api/v1/vehicles?lang=ro

# Get specific vehicle in French
curl http://localhost:8000/api/v1/vehicles/bmw-x5-2024?lang=fr
```

### Response Format

```json
{
  "data": {
    "id": 1,
    "title": "BMW X5 2024 xDrive40i",
    "description": "Luxury SUV with premium features...",
    "make": "BMW",
    "price": 65000
  }
}
```

When `lang=de`:

```json
{
  "data": {
    "id": 1,
    "title": "BMW X5 2024 xDrive40i",
    "description": "Luxus-SUV mit Premium-Ausstattung...",
    "make": "BMW",
    "price": 65000
  }
}
```

---

## 🏗️ Architecture

### Translatable Fields

Currently translatable fields in Vehicle model:
- `title` - Vehicle title/name
- `description` - Full description

### Database Structure

Translations are stored as JSON in the same column:

```php
// Database column structure (title)
{
  "en": "BMW X5 2024 xDrive40i",
  "de": "BMW X5 2024 xDrive40i",
  "ro": "BMW X5 2024 xDrive40i"
}

// Database column structure (description)
{
  "en": "Luxury SUV with premium features...",
  "de": "Luxus-SUV mit Premium-Ausstattung...",
  "ro": "SUV de lux cu funcții premium..."
}
```

---

## 💻 Implementation

### 1. Model Setup

The Vehicle model already uses `HasTranslations` trait:

```php
use Spatie\Translatable\HasTranslations;

class Vehicle extends Model
{
    use HasTranslations;
    
    // Define translatable attributes
    public $translatable = ['title', 'description'];
}
```

### 2. Controller - Language Detection

The VehicleController now detects language from request:

```php
public function index(Request $request)
{
    // Set app locale from request
    $lang = $request->get('lang', 'en');
    app()->setLocale($lang);
    
    // Query vehicles
    $vehicles = Vehicle::with(['dealer', 'user'])
        ->published()
        ->latest('published_at')
        ->get();
        
    // Translations are automatically returned in current locale
    return response()->json(['data' => $vehicles]);
}
```

### 3. Middleware (Optional)

For automatic locale detection:

```php
// app/Http/Middleware/SetLocale.php
public function handle($request, Closure $next)
{
    $locale = $request->get('lang', 
        $request->header('Accept-Language', 'en'));
    
    if (in_array($locale, ['en', 'de', 'fr', 'es', 'it', 'pt', 'ro', 'pl'])) {
        app()->setLocale($locale);
    }
    
    return $next($request);
}
```

---

## ✍️ Creating Translations

### In Seeders

```php
Vehicle::create([
    'make' => 'BMW',
    'model' => 'X5',
    'year' => 2024,
    'price' => 65000,
    'title' => [
        'en' => 'BMW X5 2024 xDrive40i',
        'de' => 'BMW X5 2024 xDrive40i',
        'ro' => 'BMW X5 2024 xDrive40i',
    ],
    'description' => [
        'en' => 'Luxury SUV with premium features, advanced safety systems, and powerful engine.',
        'de' => 'Luxus-SUV mit Premium-Ausstattung, fortschrittlichen Sicherheitssystemen und leistungsstarkem Motor.',
        'ro' => 'SUV de lux cu funcții premium, sisteme avansate de siguranță și motor puternic.',
    ],
]);
```

### Programmatically

```php
$vehicle = Vehicle::find(1);

// Set translation for specific locale
$vehicle->setTranslation('title', 'de', 'BMW X5 2024 xDrive40i');
$vehicle->setTranslation('description', 'de', 'Luxus-SUV...');
$vehicle->save();

// Set multiple translations
$vehicle->setTranslations('title', [
    'en' => 'BMW X5 2024',
    'de' => 'BMW X5 2024',
    'fr' => 'BMW X5 2024',
]);
```

### Via API

```php
// Create vehicle with translations
POST /api/v1/vehicles
{
  "make": "BMW",
  "model": "X5",
  "title": {
    "en": "BMW X5 2024 xDrive40i",
    "de": "BMW X5 2024 xDrive40i",
    "ro": "BMW X5 2024 xDrive40i"
  },
  "description": {
    "en": "Luxury SUV with premium features...",
    "de": "Luxus-SUV mit Premium-Ausstattung...",
    "ro": "SUV de lux cu funcții premium..."
  }
}
```

---

## 🔍 Querying Translations

### Get in Specific Language

```php
// Set locale before query
app()->setLocale('de');

$vehicle = Vehicle::find(1);
echo $vehicle->title; // Returns German title

// Or use helper
echo $vehicle->getTranslation('title', 'de');
```

### Get All Translations

```php
$vehicle = Vehicle::find(1);

// Get all translations for a field
$titles = $vehicle->getTranslations('title');
// Returns: ['en' => '...', 'de' => '...', 'ro' => '...']
```

### Fallback Behavior

If translation doesn't exist for requested language, it falls back to:
1. Default locale (en)
2. First available translation
3. Empty string

```php
// German translation missing
app()->setLocale('de');
$vehicle = Vehicle::find(1);

// Falls back to English
echo $vehicle->title; // Returns English title
```

---

## 🧪 Testing Translations

### Feature Test Example

```php
test('vehicle returns translation in requested language', function () {
    $vehicle = Vehicle::factory()->create([
        'title' => [
            'en' => 'BMW X5 2024',
            'de' => 'BMW X5 2024',
            'ro' => 'BMW X5 2024',
        ],
        'description' => [
            'en' => 'Luxury SUV',
            'de' => 'Luxus-SUV',
            'ro' => 'SUV de lux',
        ],
        'status' => 'published'
    ]);
    
    // Test English (default)
    $response = getJson('/api/v1/vehicles');
    $response->assertJsonPath('data.0.description', 'Luxury SUV');
    
    // Test German
    $response = getJson('/api/v1/vehicles?lang=de');
    $response->assertJsonPath('data.0.description', 'Luxus-SUV');
    
    // Test Romanian
    $response = getJson('/api/v1/vehicles?lang=ro');
    $response->assertJsonPath('data.0.description', 'SUV de lux');
});
```

---

## 📝 Best Practices

### 1. Always Provide English Translation

English is the default/fallback language:

```php
// Good
'title' => [
    'en' => 'BMW X5',  // Always required
    'de' => 'BMW X5',
]

// Bad - missing English
'title' => [
    'de' => 'BMW X5',  // No fallback!
]
```

### 2. Keep Technical Terms Consistent

Some terms should remain consistent across languages:

```php
'make' => 'BMW',        // Same in all languages
'model' => 'X5',        // Same in all languages
'fuel' => 'diesel',     // Use standard codes
```

### 3. Translation Keys for Features

```php
// Features array with translation keys
'features' => [
    'leather_seats',
    'navigation',
    'parking_sensors',
]

// Frontend translates based on keys:
// en: "Leather Seats"
// de: "Ledersitze"
// ro: "Scaune din piele"
```

### 4. Validate Translation Completeness

```php
// Ensure all required languages have translations
$vehicle->hasTranslation('title', 'de');
$vehicle->hasTranslation('description', 'de');
```

---

## 🌐 Supported Languages Details

| Code | Language | Native Name | Market |
|------|----------|-------------|--------|
| en | English | English | Global |
| de | German | Deutsch | Germany, Austria, Switzerland |
| fr | French | Français | France, Belgium, Switzerland |
| es | Spanish | Español | Spain, Latin America |
| it | Italian | Italiano | Italy |
| pt | Portuguese | Português | Portugal, Brazil |
| ro | Romanian | Română | Romania, Moldova |
| pl | Polish | Polski | Poland |

---

## 🔧 Configuration

### Fallback Locale

Set in `config/app.php`:

```php
'locale' => 'en',
'fallback_locale' => 'en',
```

### Available Locales

Add validation in `config/app.php`:

```php
'supported_locales' => ['en', 'de', 'fr', 'es', 'it', 'pt', 'ro', 'pl'],
```

---

## 📊 Database Optimization

### Index JSON Columns

For better search performance:

```php
// In migration
$table->json('title')->nullable();
$table->json('description')->nullable();

// Add generated columns for search (optional)
DB::statement('ALTER TABLE vehicles ADD title_en VARCHAR(255) 
    GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(title, "$.en"))) VIRTUAL');
```

### Search in Translations

```php
// Search across all translations
$vehicles = Vehicle::where(function ($query) use ($searchTerm) {
    $query->where('title->en', 'like', "%{$searchTerm}%")
          ->orWhere('title->de', 'like', "%{$searchTerm}%")
          ->orWhere('title->ro', 'like', "%{$searchTerm}%");
})->get();
```

---

## 🚀 Advanced Features

### 1. Detect User Language

```php
// From Accept-Language header
$preferredLang = $request->getPreferredLanguage(['en', 'de', 'fr', 'es', 'it', 'pt', 'ro', 'pl']);

// From user profile
$userLang = auth()->user()->preferred_language ?? 'en';
```

### 2. Translation Management

```php
// Check missing translations
$vehicles = Vehicle::whereJsonLength('title', '<', 3)->get();

// Bulk update translations
Vehicle::chunk(100, function ($vehicles) {
    foreach ($vehicles as $vehicle) {
        if (!$vehicle->hasTranslation('title', 'de')) {
            // Auto-translate or mark for manual translation
        }
    }
});
```

### 3. API Response Format

```php
// Include all translations in response (optional)
{
  "data": {
    "id": 1,
    "title": "BMW X5 2024",  // Current locale
    "translations": {
      "title": {
        "en": "BMW X5 2024",
        "de": "BMW X5 2024",
        "ro": "BMW X5 2024"
      }
    }
  }
}
```

---

## 📚 Resources

- [Spatie Translatable Documentation](https://github.com/spatie/laravel-translatable)
- [Laravel Localization](https://laravel.com/docs/localization)
- [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

---

## ✅ Checklist for New Translatable Fields

When making a new field translatable:

- [ ] Add to `$translatable` array in model
- [ ] Update database seeder with translations
- [ ] Update factory with translation format
- [ ] Update API validation rules
- [ ] Update tests to check translations
- [ ] Update API documentation
- [ ] Inform frontend team of changes

---

## 🎯 Current Status

**Implemented**:
- ✅ Vehicle model with translatable title and description
- ✅ API language parameter support (`?lang=de`)
- ✅ Automatic locale detection
- ✅ Fallback to English
- ✅ JSON storage for translations

**Supported Languages**:
- ✅ English (en) - Default
- ✅ German (de)
- ✅ Romanian (ro)
- 🔄 French, Spanish, Italian, Portuguese, Polish (ready, need content)

**Next Steps**:
- [ ] Update seeders with multi-language content
- [ ] Add translation tests
- [ ] Document for frontend integration
- [ ] Add more translatable fields (optional)

---

**Status**: ✅ Multi-Language Support Active  
**Supported**: 8 Languages  
**Last Updated**: 29 October 2025

---

*Part of AUTOSITE Week 1 Implementation - Day 2*
