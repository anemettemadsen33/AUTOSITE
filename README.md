# AutoMarket Backend

Backend API and Admin (Filament v4) for the AutoMarket platform.

### Stack
- Laravel 11 + Sanctum (API tokens)
- Filament v4 (Admin)
- Spatie Media Library (images)
- Spatie Translatable (i18n fields)
- Brick/Money (money math)
- L5 Swagger (API docs)

### Quick start
- Default DB: SQLite at `database/database.sqlite`
- Media symlink: `public/storage` (already linked)

#### Run locally
- Public routes: `/api/vehicles`, `/api/vehicles/{id}`, `/api/settings/public`, `/api/documentation`
- Auth routes: `/api/register`, `/api/login`, `/api/logout`
- Auth header: `Authorization: Bearer <token>`

#### Seeders
- Demo user: `admin@example.com` (password: `password`), plus basic `settings`

#### Exchange rates
- Manual run: `php artisan exchange:update`
- Scheduled daily at 02:00

### Next steps
- Filament resources for Vehicles, Dealers, Users, Settings
- Add Swagger annotations and publish docs
- Pest tests (auth, vehicles)
- CORS and Sanctum config for Next.js frontend

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
