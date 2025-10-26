# 🔌 AUTOSITE API Documentation

Base URL: `http://localhost:8000/api/v1`

All API endpoints are versioned under `/api/v1/`.

---

## 🔐 Authentication

Uses **Laravel Sanctum** with Bearer tokens.

### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response** (201):
```json
{
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com" },
  "token": "1|abcdef..."
}
```

### Login
```http
POST /api/v1/auth/login

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer {token}
```

### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer {token}
```

---

## 🚗 Vehicles

### List Vehicles (Public)
```http
GET /api/v1/vehicles?page=1&per_page=12
```

**Query Parameters**:
- `page` - Page number (default: 1)
- `per_page` - Items per page (default: 12, max: 100)
- `make` - Filter by make (e.g., BMW, Mercedes)
- `model` - Filter by model
- `year_from` - Minimum year
- `year_to` - Maximum year
- `price_from` - Minimum price
- `price_to` - Maximum price
- `fuel_type` - Filter by fuel (petrol, diesel, electric, hybrid)
- `transmission` - Filter by transmission (manual, automatic)
- `body_type` - Filter by body type (sedan, suv, coupe, etc.)
- `sort` - Sort field (price, year, mileage, created_at)
- `order` - Sort order (asc, desc)

**Response** (200):
```json
{
  "data": [
    {
      "id": 1,
      "make": "BMW",
      "model": "X5",
      "year": 2023,
      "price": 65000,
      "mileage": 15000,
      "fuel_type": "diesel",
      "transmission": "automatic",
      "body_type": "suv",
      "color": "Black",
      "images": [
        { "id": 1, "url": "http://...", "thumbnail": "http://..." }
      ],
      "dealer": {
        "id": 5,
        "name": "Auto Premium SRL",
        "phone": "+40123456789"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 21,
    "per_page": 12,
    "last_page": 2
  }
}
```

### Get Vehicle Details (Public)
```http
GET /api/v1/vehicles/{slug}
```

Example: `/api/v1/vehicles/bmw-x5-2023-1`

### Create Vehicle (Auth Required)
```http
POST /api/v1/vehicles
Authorization: Bearer {token}
Content-Type: application/json

{
  "make": "BMW",
  "model": "X5",
  "year": 2023,
  "price": 65000,
  "mileage": 15000,
  "fuel_type": "diesel",
  "transmission": "automatic",
  "body_type": "suv",
  "color": "Black",
  "description": "Excellent condition...",
  "city": "Bucharest",
  "country": "Romania"
}
```

### Update Vehicle (Auth Required)
```http
PUT /api/v1/vehicles/{id}
Authorization: Bearer {token}
```

### Delete Vehicle (Auth Required)
```http
DELETE /api/v1/vehicles/{id}
Authorization: Bearer {token}
```

---

## 🏢 Dealers

### List Dealers (Public)
```http
GET /api/v1/dealers
```

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Auto Premium SRL",
      "email": "contact@autopremium.ro",
      "phone": "+40123456789",
      "address": "Str. Exemplu Nr. 1",
      "city": "Bucharest",
      "logo": "http://...",
      "vehicles_count": 15
    }
  ]
}
```

### Get Dealer Details (Public)
```http
GET /api/v1/dealers/{id}
```

---

## ⭐ Favorites (Auth Required)

### Get My Favorites
```http
GET /api/v1/favorites
Authorization: Bearer {token}
```

### Toggle Favorite
```http
POST /api/v1/favorites/toggle
Authorization: Bearer {token}

{
  "vehicle_id": 1
}
```

**Response**:
```json
{
  "favorited": true,
  "message": "Added to favorites"
}
```

### Check if Favorited
```http
GET /api/v1/favorites/check/{vehicle_id}
Authorization: Bearer {token}
```

### Remove from Favorites
```http
DELETE /api/v1/favorites/{vehicle_id}
Authorization: Bearer {token}
```

---

## 📸 Vehicle Images (Auth Required)

### Upload Images
```http
POST /api/v1/vehicles/{vehicle_id}/images
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "images[]": [File, File, File]
}
```

Maximum 10 images per vehicle.

### Get Vehicle Images
```http
GET /api/v1/vehicles/{vehicle_id}/images
```

### Delete Image
```http
DELETE /api/v1/vehicles/{vehicle_id}/images/{media_id}
Authorization: Bearer {token}
```

### Set Primary Image
```http
POST /api/v1/vehicles/{vehicle_id}/images/{media_id}/primary
Authorization: Bearer {token}
```

---

## 🛒 Orders (Auth Required)

### Create Order
```http
POST /api/v1/orders
Authorization: Bearer {token}

{
  "vehicle_id": 1,
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+40123456789",
  "notes": "Please contact me ASAP"
}
```

### Get My Orders
```http
GET /api/v1/orders
Authorization: Bearer {token}
```

### Get Order Details
```http
GET /api/v1/orders/{id}
Authorization: Bearer {token}
```

---

## ⚙️ Settings (Public)

### Get All Settings
```http
GET /api/v1/settings
```

**Response**:
```json
{
  "site_name": "AutoMarket",
  "currency": "EUR",
  "languages": ["en", "ro", "de"]
}
```

### Get Specific Setting
```http
GET /api/v1/settings/{key}
```

---

## 💱 Exchange Rates (Public)

### Get Latest Rates
```http
GET /api/v1/exchange/latest
```

**Response**:
```json
{
  "base": "EUR",
  "rates": {
    "USD": 1.08,
    "RON": 4.97,
    "GBP": 0.86
  },
  "updated_at": "2025-10-26T00:00:00Z"
}
```

### Convert Currency
```http
POST /api/v1/exchange/convert

{
  "amount": 1000,
  "from": "EUR",
  "to": "RON"
}
```

**Response**:
```json
{
  "amount": 1000,
  "from": "EUR",
  "to": "RON",
  "result": 4970,
  "rate": 4.97
}
```

---

## 📊 Analytics (Auth Required)

### Dealer Dashboard Stats
```http
GET /api/v1/analytics/dealer/dashboard
Authorization: Bearer {token}
```

### Vehicle Stats
```http
GET /api/v1/analytics/vehicle/{vehicle_id}
Authorization: Bearer {token}
```

---

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required"]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "message": "Too many attempts. Please slow down."
}
```

---

## 🔒 Rate Limiting

- **Public endpoints**: 100 requests/minute
- **Authenticated endpoints**: 60 requests/minute  
- **Auth endpoints** (login/register): 10 requests/minute

---

## 📝 Notes

- All endpoints return JSON
- Dates are in ISO 8601 format (UTC)
- Pagination uses `page` and `per_page` parameters
- Use `Accept: application/json` header for proper error responses

**Last Updated**: 26 Oct 2025
