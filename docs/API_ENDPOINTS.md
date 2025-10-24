# AUTOSITE - API Endpoints Documentation

## Base URL
- **Development**: `http://localhost:8000/api`
- **Production**: `https://api.autosite.com/api`

## Authentication
Most endpoints require authentication via Laravel Sanctum tokens.

**Headers:**
```
Authorization: Bearer {token}
Accept: application/json
Content-Type: application/json
```

---

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2025-10-24T18:00:00.000000Z"
  },
  "token": "1|abc123..."
}
```

---

### POST /auth/login
Authenticate user and receive token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "1|abc123..."
}
```

---

### POST /auth/logout
Logout user and revoke token.

**Request:** (empty body, requires authentication)

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### GET /auth/user
Get authenticated user details.

**Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "phone": "+1234567890",
  "avatar": "https://...",
  "created_at": "2025-10-24T18:00:00.000000Z"
}
```

---

## Vehicle Endpoints

### GET /vehicles
Get paginated list of vehicles with optional filters.

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `per_page` (int): Items per page (default: 15, max: 100)
- `make` (string): Filter by make
- `model` (string): Filter by model
- `year_min` (int): Minimum year
- `year_max` (int): Maximum year
- `price_min` (decimal): Minimum price
- `price_max` (decimal): Maximum price
- `mileage_max` (int): Maximum mileage
- `fuel_type` (string): Filter by fuel type
- `transmission` (string): Filter by transmission
- `body_type` (string): Filter by body type
- `condition` (string): new, used, certified
- `location_country` (string): Filter by country
- `location_city` (string): Filter by city
- `is_featured` (boolean): Featured only
- `sort` (string): Sort field (price, year, created_at, views_count)
- `order` (string): asc or desc

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "bmw-x5-2023",
      "make": "BMW",
      "model": "X5",
      "year": 2023,
      "price": 65000.00,
      "currency": "EUR",
      "mileage": 15000,
      "fuel_type": "petrol",
      "transmission": "automatic",
      "body_type": "suv",
      "title": {
        "en": "BMW X5 xDrive40i M Sport"
      },
      "location_city": "Munich",
      "location_country": "Germany",
      "is_featured": true,
      "images": [
        {
          "id": 1,
          "url": "https://...",
          "thumb_url": "https://..."
        }
      ],
      "dealer": {
        "id": 1,
        "company_name": "Premium Motors"
      },
      "created_at": "2025-10-24T18:00:00.000000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 10,
    "per_page": 15,
    "to": 15,
    "total": 150
  }
}
```

---

### GET /vehicles/{slug}
Get single vehicle by slug.

**Response (200):**
```json
{
  "id": 1,
  "slug": "bmw-x5-2023",
  "make": "BMW",
  "model": "X5",
  "year": 2023,
  "price": 65000.00,
  "currency": "EUR",
  "mileage": 15000,
  "fuel_type": "petrol",
  "transmission": "automatic",
  "body_type": "suv",
  "exterior_color": "Black",
  "interior_color": "Beige",
  "doors": 5,
  "seats": 7,
  "engine_size": 2998,
  "power": 340,
  "vin": "WBAXXXXX",
  "condition": "used",
  "title": {
    "en": "BMW X5 xDrive40i M Sport",
    "de": "BMW X5 xDrive40i M Sport"
  },
  "description": {
    "en": "Luxury SUV with full options...",
    "de": "Luxus-SUV mit voller Ausstattung..."
  },
  "features": [
    "Leather seats",
    "Panoramic roof",
    "Navigation system"
  ],
  "location_city": "Munich",
  "location_country": "Germany",
  "is_featured": true,
  "is_published": true,
  "views_count": 125,
  "images": [
    {
      "id": 1,
      "url": "https://...",
      "thumb_url": "https://...",
      "order": 1
    }
  ],
  "user": {
    "id": 1,
    "name": "John Doe"
  },
  "dealer": {
    "id": 1,
    "company_name": "Premium Motors",
    "phone": "+49...",
    "website": "https://..."
  },
  "created_at": "2025-10-24T18:00:00.000000Z",
  "updated_at": "2025-10-24T18:00:00.000000Z"
}
```

---

### POST /vehicles
Create a new vehicle (requires authentication).

**Request (multipart/form-data):**
```json
{
  "make": "BMW",
  "model": "X5",
  "year": 2023,
  "price": 65000,
  "currency": "EUR",
  "mileage": 15000,
  "fuel_type": "petrol",
  "transmission": "automatic",
  "body_type": "suv",
  "exterior_color": "Black",
  "interior_color": "Beige",
  "doors": 5,
  "seats": 7,
  "engine_size": 2998,
  "power": 340,
  "condition": "used",
  "title": {
    "en": "BMW X5 xDrive40i M Sport"
  },
  "description": {
    "en": "Luxury SUV with full options..."
  },
  "features": ["Leather seats", "Panoramic roof"],
  "location_city": "Munich",
  "location_country": "Germany",
  "images[]": [file1, file2, file3]
}
```

**Response (201):**
```json
{
  "id": 1,
  "slug": "bmw-x5-2023",
  "message": "Vehicle created successfully"
}
```

---

### PUT /vehicles/{id}
Update existing vehicle (requires authentication, owner only).

**Request:**
```json
{
  "price": 62000,
  "mileage": 16000,
  "description": {
    "en": "Updated description..."
  }
}
```

**Response (200):**
```json
{
  "id": 1,
  "slug": "bmw-x5-2023",
  "message": "Vehicle updated successfully"
}
```

---

### DELETE /vehicles/{id}
Delete vehicle (requires authentication, owner only).

**Response (200):**
```json
{
  "message": "Vehicle deleted successfully"
}
```

---

### POST /vehicles/{id}/images
Upload additional images to vehicle.

**Request (multipart/form-data):**
```
images[]: file1
images[]: file2
```

**Response (200):**
```json
{
  "message": "Images uploaded successfully",
  "images": [
    {
      "id": 5,
      "url": "https://...",
      "thumb_url": "https://..."
    }
  ]
}
```

---

### DELETE /vehicles/{vehicleId}/images/{imageId}
Delete vehicle image.

**Response (200):**
```json
{
  "message": "Image deleted successfully"
}
```

---

## Dealer Endpoints

### GET /dealers
Get paginated list of dealers.

**Query Parameters:**
- `page` (int)
- `per_page` (int)
- `country` (string)
- `city` (string)
- `is_verified` (boolean)

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "company_name": "Premium Motors",
      "city": "Munich",
      "country": "Germany",
      "phone": "+49...",
      "website": "https://...",
      "is_verified": true,
      "vehicles_count": 25
    }
  ],
  "meta": { ... }
}
```

---

### GET /dealers/{id}
Get dealer details.

**Response (200):**
```json
{
  "id": 1,
  "company_name": "Premium Motors",
  "description": {
    "en": "Leading BMW dealer..."
  },
  "address": "Main Street 123",
  "city": "Munich",
  "country": "Germany",
  "phone": "+49...",
  "website": "https://...",
  "logo": "https://...",
  "is_verified": true,
  "vehicles": [
    { ... }
  ]
}
```

---

### POST /dealers
Create dealer profile (requires authentication).

**Request:**
```json
{
  "company_name": "Premium Motors",
  "description": {
    "en": "Leading BMW dealer..."
  },
  "address": "Main Street 123",
  "city": "Munich",
  "country": "Germany",
  "postal_code": "80333",
  "phone": "+49...",
  "website": "https://..."
}
```

**Response (201):**
```json
{
  "id": 1,
  "message": "Dealer profile created successfully"
}
```

---

### PUT /dealers/{id}
Update dealer profile (requires authentication, owner only).

**Response (200):**
```json
{
  "id": 1,
  "message": "Dealer profile updated successfully"
}
```

---

## Settings Endpoints

### GET /settings/public
Get all public settings (no authentication required).

**Response (200):**
```json
{
  "app": {
    "name": "AUTOSITE",
    "locale": "en",
    "timezone": "Europe/Bucharest"
  },
  "currency": {
    "default": "EUR",
    "supported": ["EUR", "USD", "RON", "GBP"]
  },
  "filters": {
    "makes": ["BMW", "Mercedes", "Audi", "Volkswagen", ...],
    "body_types": ["sedan", "suv", "coupe", ...],
    "fuel_types": ["petrol", "diesel", "electric", "hybrid"],
    "transmissions": ["manual", "automatic", "semi-automatic"]
  }
}
```

---

### GET /settings/{key}
Get specific setting by key (public settings only).

**Response (200):**
```json
{
  "key": "currency.default",
  "value": "EUR"
}
```

---

## Exchange Rate Endpoints

### GET /exchange-rates
Get current exchange rates.

**Query Parameters:**
- `base` (string): Base currency (default: EUR)
- `targets` (string): Comma-separated target currencies

**Response (200):**
```json
{
  "base": "EUR",
  "date": "2025-10-24",
  "rates": {
    "USD": 1.095600,
    "RON": 4.976500,
    "GBP": 0.856300
  }
}
```

---

### GET /exchange-rates/convert
Convert amount between currencies.

**Query Parameters:**
- `amount` (decimal): Amount to convert
- `from` (string): Source currency
- `to` (string): Target currency

**Response (200):**
```json
{
  "amount": 100,
  "from": "EUR",
  "to": "USD",
  "rate": 1.095600,
  "converted": 109.56
}
```

---

## Search Endpoint

### GET /search
Global search across vehicles.

**Query Parameters:**
- `q` (string): Search query
- Other filter parameters from GET /vehicles

**Response (200):**
```json
{
  "query": "BMW X5",
  "results": {
    "vehicles": [ ... ],
    "total": 45
  }
}
```

---

## Statistics Endpoints

### GET /statistics/makes
Get vehicle count by make.

**Response (200):**
```json
{
  "BMW": 150,
  "Mercedes": 120,
  "Audi": 100
}
```

---

### GET /statistics/popular
Get most popular/viewed vehicles.

**Response (200):**
```json
{
  "vehicles": [ ... ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "price": ["The price must be a number."]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

### 403 Forbidden
```json
{
  "message": "This action is unauthorized."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found."
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error occurred."
}
```

---

## Rate Limiting
- Public endpoints: 60 requests per minute
- Authenticated endpoints: 120 requests per minute
- Headers included:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

## Pagination
All list endpoints support pagination with metadata:

```json
{
  "data": [ ... ],
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 10,
    "per_page": 15,
    "to": 15,
    "total": 150
  },
  "links": {
    "first": "http://api.../vehicles?page=1",
    "last": "http://api.../vehicles?page=10",
    "prev": null,
    "next": "http://api.../vehicles?page=2"
  }
}
```

---

## Versioning
API version is included in URL when multiple versions exist:
- `/api/v1/vehicles`
- `/api/v2/vehicles`

Current version: v1 (default, no version prefix required)
