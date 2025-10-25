# AUTOSITE - Database Schema (ERD)

## Entity Relationship Diagram

### Core Entities

#### 1. users
Primary user table for authentication and authorization.

```
users
├── id (PK)
├── name
├── email (unique)
├── email_verified_at
├── password
├── role (enum: user, dealer, admin)
├── phone
├── avatar
├── is_active (boolean)
├── remember_token
├── timestamps (created_at, updated_at)
└── soft_deletes (deleted_at)
```

**Indexes:**
- email (unique)
- role
- is_active

**Relations:**
- Has many: vehicles
- Has one: dealer (optional)

---

#### 2. dealers
Extended profile for dealers/businesses.

```
dealers
├── id (PK)
├── user_id (FK -> users.id, unique)
├── company_name
├── description (translatable JSON)
├── address
├── city
├── state
├── country
├── postal_code
├── phone
├── website
├── logo
├── is_verified (boolean)
├── verification_date
├── timestamps (created_at, updated_at)
└── soft_deletes (deleted_at)
```

**Indexes:**
- user_id (unique)
- is_verified
- country
- city

**Relations:**
- Belongs to: user
- Has many: vehicles

---

#### 3. vehicles
Main vehicle listings table.

```
vehicles
├── id (PK)
├── user_id (FK -> users.id)
├── dealer_id (FK -> dealers.id, nullable)
├── slug (unique)
├── make
├── model
├── year
├── price (decimal)
├── currency (default: EUR)
├── mileage
├── fuel_type (enum: petrol, diesel, electric, hybrid, other)
├── transmission (enum: manual, automatic, semi-automatic)
├── body_type (enum: sedan, suv, coupe, convertible, wagon, van, truck, other)
├── exterior_color
├── interior_color
├── doors
├── seats
├── engine_size (decimal, cc)
├── power (int, hp)
├── vin (unique, nullable)
├── condition (enum: new, used, certified)
├── title (translatable JSON)
├── description (translatable JSON)
├── features (JSON array)
├── location_city
├── location_country
├── is_featured (boolean)
├── is_published (boolean)
├── published_at
├── views_count (default: 0)
├── timestamps (created_at, updated_at)
└── soft_deletes (deleted_at)
```

**Indexes:**
- user_id
- dealer_id
- slug (unique)
- make
- model
- year
- price
- fuel_type
- transmission
- body_type
- is_published
- is_featured
- created_at

**Relations:**
- Belongs to: user
- Belongs to: dealer (optional)
- Has many: media (via Spatie Media Library)

---

#### 4. settings
System configuration and public settings.

```
settings
├── id (PK)
├── key (unique)
├── value (text/JSON)
├── type (enum: string, integer, boolean, json, array)
├── group (enum: general, mail, currency, api, seo)
├── is_public (boolean) - accessible via public API
├── description
├── timestamps (created_at, updated_at)
```

**Common Settings:**
- app.name
- app.url
- app.locale
- app.timezone
- mail.host
- mail.port
- mail.username
- mail.encryption
- currency.default (EUR)
- currency.supported (JSON array)
- seo.meta_title
- seo.meta_description
- filters.makes (JSON array)
- filters.body_types (JSON array)
- filters.fuel_types (JSON array)
- filters.transmissions (JSON array)

**Indexes:**
- key (unique)
- group
- is_public

---

#### 5. exchange_rates
Currency exchange rates from ECB.

```
exchange_rates
├── id (PK)
├── base_currency (default: EUR)
├── target_currency
├── rate (decimal, 6 decimals)
├── date (date)
├── source (default: ECB)
├── timestamps (created_at, updated_at)
```

**Indexes:**
- target_currency
- date
- Composite: (base_currency, target_currency, date) unique

**Relations:**
- None (standalone reference table)

---

### Additional Tables

#### 6. media
Managed by Spatie Media Library for vehicle images.

```
media
├── id (PK)
├── model_type (vehicles)
├── model_id (FK -> vehicles.id)
├── uuid
├── collection_name (images)
├── name
├── file_name
├── mime_type
├── disk
├── conversions_disk
├── size
├── manipulations (JSON)
├── custom_properties (JSON)
├── generated_conversions (JSON)
├── responsive_images (JSON)
├── order_column
├── timestamps (created_at, updated_at)
```

**Indexes:**
- model_type, model_id
- uuid (unique)
- order_column

---

#### 7. personal_access_tokens
Laravel Sanctum tokens for API authentication.

```
personal_access_tokens
├── id (PK)
├── tokenable_type
├── tokenable_id
├── name
├── token (unique, hashed)
├── abilities (JSON)
├── last_used_at
├── expires_at
├── timestamps (created_at, updated_at)
```

**Indexes:**
- tokenable_type, tokenable_id
- token (unique)

---

## Relationships Summary

### users
- **1:N** with vehicles (user can have multiple vehicles)
- **1:1** with dealers (user can be a dealer)

### dealers
- **N:1** with users (dealer belongs to one user)
- **1:N** with vehicles (dealer can have multiple vehicles)

### vehicles
- **N:1** with users (vehicle belongs to one user)
- **N:1** with dealers (vehicle may belong to one dealer)
- **1:N** with media (vehicle can have multiple images)

### settings
- Standalone configuration table

### exchange_rates
- Standalone reference table updated daily

---

## Data Integrity Rules

### Cascading Deletes
- Delete user → Soft delete vehicles
- Delete dealer → Nullify dealer_id in vehicles
- Delete vehicle → Delete associated media

### Validation Rules
- Email must be unique and valid format
- VIN must be unique when provided
- Price must be positive
- Year must be between 1900 and current year + 1
- Mileage must be non-negative
- Currency must be in supported currencies list

### Business Rules
1. Only verified dealers can set dealer_id on vehicles
2. Published vehicles must have at least one image
3. Featured vehicles must be published
4. Exchange rates updated daily via scheduled job
5. Deleted users' vehicles are soft-deleted, not hard-deleted

---

## Indexing Strategy

### Primary Indexes
- All foreign keys are indexed
- Search fields (make, model, year, price) are indexed
- Boolean flags (is_published, is_featured, is_active) are indexed

### Composite Indexes
Consider adding composite indexes for common queries:
- (make, model, year)
- (is_published, created_at)
- (price, fuel_type, transmission)
- (location_country, location_city)

### Full-Text Indexes (MySQL)
- vehicles.title (all languages)
- vehicles.description (all languages)
- dealers.description (all languages)

---

## Data Migration Notes

### Translations
Translatable fields use JSON format:
```json
{
  "en": "English content",
  "de": "German content",
  "fr": "French content",
  "es": "Spanish content",
  "it": "Italian content",
  "pt": "Portuguese content",
  "ro": "Romanian content",
  "pl": "Polish content"
}
```

### JSON Fields
- vehicles.features: Array of feature strings
- settings.value: Can be string, array, or object
- media.custom_properties: Additional metadata

---

## Sample Data Structure

### Vehicle Example
```json
{
  "id": 1,
  "slug": "bmw-x5-2023",
  "make": "BMW",
  "model": "X5",
  "year": 2023,
  "price": 65000.00,
  "currency": "EUR",
  "title": {
    "en": "BMW X5 xDrive40i M Sport",
    "de": "BMW X5 xDrive40i M Sport",
    "ro": "BMW X5 xDrive40i M Sport"
  },
  "description": {
    "en": "Luxury SUV with full options...",
    "de": "Luxus-SUV mit voller Ausstattung...",
    "ro": "SUV de lux cu opțiuni complete..."
  },
  "features": [
    "Leather seats",
    "Panoramic roof",
    "Navigation system",
    "Adaptive cruise control"
  ]
}
```

### Exchange Rate Example
```json
{
  "base_currency": "EUR",
  "target_currency": "USD",
  "rate": 1.095600,
  "date": "2025-10-24"
}
```
