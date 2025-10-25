# AUTOSITE Backend

Laravel 11 API + Filament v4 Admin Panel for the AUTOSITE automotive marketplace platform.

## Features

- 🔐 **Authentication**: Laravel Sanctum token-based API authentication
- 🎨 **Admin Panel**: Filament v4 for complete content management
- 📸 **Media Management**: Spatie Media Library for vehicle images
- 🌍 **Multi-Language**: Spatie Translatable for content in 8 languages
- 📊 **API Documentation**: L5 Swagger (OpenAPI) for complete API docs
- 💱 **Exchange Rates**: Daily currency rates from European Central Bank
- 🔍 **Advanced Search**: Filterable vehicle listings with 14 parameters
- 📦 **RESTful API**: Complete API for frontend integration

## Requirements

- PHP 8.2+
- Composer 2.x
- MySQL 8.0+ / MariaDB 10.3+ (or SQLite for development)

## Installation

### 1. Install Dependencies

```bash
composer install
```

### 2. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
# For development (SQLite):
DB_CONNECTION=sqlite

# For production (MySQL):
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autosite
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 3. Database Setup

```bash
# Run migrations
php artisan migrate

# Seed database with demo data
php artisan db:seed
```

### 4. Storage Link

```bash
# Create symbolic link for file storage
php artisan storage:link
```

### 5. Start Development Server

```bash
php artisan serve
```

The API will be available at: `http://localhost:8000`

### 6. Access Admin Panel

After seeding, access Filament admin at:
- **URL**: `http://localhost:8000/admin`
- **Email**: `admin@autosite.com`
- **Password**: `password`

## API Endpoints

Complete API documentation is available in:
- **Swagger UI**: `http://localhost:8000/api/documentation` (after L5 Swagger setup)
- **Documentation**: See `/docs/API_ENDPOINTS.md`

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get authenticated user

#### Vehicles
- `GET /api/vehicles` - List vehicles (with filters)
- `GET /api/vehicles/{slug}` - Get vehicle details
- `POST /api/vehicles` - Create vehicle (auth required)
- `PUT /api/vehicles/{id}` - Update vehicle (auth required)
- `DELETE /api/vehicles/{id}` - Delete vehicle (auth required)

#### Settings
- `GET /api/settings/public` - Get public settings
- `GET /api/exchange-rates` - Get current exchange rates

## Development

### Running Tests

```bash
# Run all tests
php artisan test

# Run with coverage
php artisan test --coverage
```

### Code Quality

```bash
# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### Scheduled Tasks

The application includes scheduled tasks (e.g., fetching exchange rates):

```bash
# Run scheduler (in development)
php artisan schedule:run

# In production, add to crontab:
* * * * * cd /path/to/backend && php artisan schedule:run >> /dev/null 2>&1
```

### Queue Workers

For background jobs:

```bash
# Run queue worker
php artisan queue:work

# In production, use Supervisor or systemd
```

## Project Structure

```
backend/
├── app/
│   ├── Filament/              # Filament admin resources
│   │   └── Resources/
│   ├── Http/
│   │   ├── Controllers/       # API controllers
│   │   ├── Middleware/
│   │   ├── Requests/          # Form request validators
│   │   └── Resources/         # API resources
│   ├── Models/                # Eloquent models
│   ├── Services/              # Business logic services
│   └── Jobs/                  # Queue jobs
├── database/
│   ├── migrations/            # Database migrations
│   ├── seeders/               # Database seeders
│   └── factories/             # Model factories
├── routes/
│   ├── api.php               # API routes
│   └── web.php               # Web routes
└── config/                    # Configuration files
```

## Configuration

### CORS

Configure CORS in `config/cors.php` to allow frontend access:

```php
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
'supports_credentials' => true,
```

### Sanctum

Sanctum configuration in `config/sanctum.php`:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:3000')),
```

### Media Library

Media conversions are configured in the Vehicle model for:
- Thumbnail (300x200)
- Medium (800x600)
- Large (1200x900)

## Troubleshooting

### Common Issues

**Issue**: 500 error on API requests
- Solution: Check storage permissions: `chmod -R 775 storage bootstrap/cache`

**Issue**: CORS errors
- Solution: Verify `FRONTEND_URL` in .env and CORS configuration

**Issue**: Images not uploading
- Solution: Run `php artisan storage:link` and check disk configuration

**Issue**: Migrations fail
- Solution: Check database credentials and connection

## Support

- **Documentation**: `/docs` folder
- **API Docs**: `/docs/API_ENDPOINTS.md`
- **Database Schema**: `/docs/DATABASE_SCHEMA.md`

## License

Proprietary - AUTOSITE Platform
