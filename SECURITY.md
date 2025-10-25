# AUTOSITE Security Guide

## Security Best Practices

### 1. Authentication & Authorization

#### Implemented Security Features
- ✅ Laravel Sanctum token-based authentication
- ✅ Bcrypt password hashing (12 rounds)
- ✅ CSRF protection enabled
- ✅ API rate limiting configured
- ✅ Two-factor authentication ready (Laravel Fortify)
- ✅ Social login (Google/Facebook) with OAuth2

#### Routes Protection
- All user-specific endpoints require `auth:sanctum` middleware
- Admin routes protected with Filament's authentication
- Public routes: `/api/v1/vehicles`, `/api/v1/dealers`, `/api/v1/settings`
- Auth routes: `/api/v1/auth/login`, `/api/v1/auth/register`

#### Password Policy
```php
// Recommended password requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
```

### 2. Input Validation

#### Request Validation
All API endpoints use Laravel Form Requests with validation rules:

```php
// Example: VehicleRequest
public function rules(): array
{
    return [
        'make' => 'required|string|max:255',
        'model' => 'required|string|max:255',
        'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
        'price' => 'required|numeric|min:0',
        'mileage' => 'required|integer|min:0',
        // ... more rules
    ];
}
```

#### SQL Injection Prevention
- ✅ Eloquent ORM used for all database queries
- ✅ Query Builder with parameter binding
- ✅ No raw SQL queries except when necessary (and parameterized)

#### XSS Prevention
- ✅ Blade templating engine auto-escapes output
- ✅ Input sanitization on all form submissions
- ✅ Content Security Policy headers

### 3. File Upload Security

#### Current Implementation
```php
// In VehicleController or similar
- File type validation: images only (jpg, png, webp)
- File size limit: 10MB per image
- Virus scanning: Recommended (ClamAV)
- Storage: Spatie Media Library with conversions
```

#### Recommendations
```php
// Add to config/media-library.php
'max_file_size' => 10 * 1024 * 1024, // 10MB

// Allowed MIME types
'allowed_mime_types' => [
    'image/jpeg',
    'image/png',
    'image/webp',
],
```

### 4. API Security

#### Rate Limiting
```php
// Already configured in RouteServiceProvider
- API: 60 requests/minute (authenticated)
- Guest: 30 requests/minute
- Auth: 5 requests/minute (login, 2FA)
- Search: 100 requests/minute
- Webhooks: 10 requests/minute
- PDF: 20 requests/minute
```

#### CORS Configuration
```php
// config/cors.php (if exists) or add middleware
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [env('FRONTEND_URL')],
'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
'exposed_headers' => [],
'max_age' => 86400,
'supports_credentials' => true,
```

#### API Token Security
- Tokens stored hashed in database
- Token expiration: Configurable (recommended: 30 days)
- Token abilities: Limited scope per token
- Revocation: Supported through Sanctum

### 5. Security Headers

#### Recommended Nginx Configuration
```nginx
# Add to server block
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.autosite.example.com;" always;
```

### 6. Database Security

#### Connection Security
```env
# Use SSL for database connection in production
DB_CONNECTION=mysql
DB_HOST=127.0.0.1  # Never expose publicly
DB_PORT=3306
DB_SSL_MODE=REQUIRED  # For MySQL 8.0+
```

#### Backup Strategy
```bash
# Automated daily backups
0 2 * * * mysqldump -u autosite_user -p'password' --single-transaction autosite_production | gzip > /backups/autosite_$(date +\%Y\%m\%d).sql.gz

# Retention: Keep last 30 days
0 3 * * * find /backups -name "autosite_*.sql.gz" -mtime +30 -delete
```

#### Database User Permissions
```sql
-- Create user with minimal permissions
CREATE USER 'autosite_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON autosite_production.* TO 'autosite_user'@'localhost';
FLUSH PRIVILEGES;

-- DO NOT grant:
-- - DROP, CREATE, ALTER (structure changes)
-- - SUPER, FILE, PROCESS (admin privileges)
```

### 7. Session Security

#### Configuration
```env
SESSION_DRIVER=database
SESSION_LIFETIME=120  # minutes
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true  # HTTPS only
SESSION_HTTP_ONLY=true      # No JavaScript access
SESSION_SAME_SITE=lax       # CSRF protection
```

### 8. Logging & Monitoring

#### Security Logging
```php
// Log suspicious activities
- Failed login attempts
- Multiple password reset requests
- Unusual API usage patterns
- File upload rejections
- Rate limit violations
```

#### Log Monitoring
```bash
# Monitor authentication failures
tail -f storage/logs/laravel.log | grep "Failed login"

# Monitor API errors
tail -f storage/logs/laravel.log | grep "ERROR"
```

#### Recommended Monitoring Tools
- Sentry: Error tracking
- Papertrail: Log aggregation
- New Relic: Performance monitoring
- AWS CloudWatch: Infrastructure monitoring

### 9. Dependency Security

#### Regular Updates
```bash
# Check for vulnerabilities
composer audit

# Update dependencies
composer update --with-dependencies

# Frontend
npm audit
npm audit fix

# Update packages
npm update
```

#### Security Advisories
- Subscribe to Laravel Security newsletter
- Monitor GitHub Security Advisories
- Use Dependabot for automated updates

### 10. Environment Security

#### .env File Protection
```nginx
# Nginx configuration
location ~ /\.env {
    deny all;
    return 404;
}

location ~ /\. {
    deny all;
    return 404;
}
```

#### File Permissions
```bash
# Secure permissions
sudo chown -R www-data:www-data /var/www/autosite
sudo find /var/www/autosite -type f -exec chmod 644 {} \;
sudo find /var/www/autosite -type d -exec chmod 755 {} \;
sudo chmod -R 775 /var/www/autosite/backend/storage
sudo chmod -R 775 /var/www/autosite/backend/bootstrap/cache
```

#### Git Security
```bash
# Never commit:
- .env files
- vendor/ directory
- node_modules/
- storage/logs/*
- Private keys
- API credentials
```

### 11. Two-Factor Authentication

#### Implementation (Laravel Fortify)
```php
// Already integrated
- QR code generation for Google Authenticator
- TOTP verification
- Recovery codes (10 codes per user)
- Password confirmation for disable
```

#### Enable for Users
```php
// In controller
use App\Http\Controllers\Api\TwoFactorController;

// Routes already defined:
POST /api/2fa/enable
POST /api/2fa/confirm
POST /api/2fa/disable
GET  /api/2fa/recovery-codes
POST /api/2fa/recovery-codes/regenerate
POST /api/2fa/verify
```

### 12. Webhook Security

#### Signature Verification
```php
// Webhook model already includes:
- Secret key per webhook
- Signature verification
- Failed attempts tracking
- IP whitelist (optional)
```

### 13. Social Login Security

#### OAuth2 Best Practices
```env
# Use environment variables
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret
GOOGLE_REDIRECT_URI=${APP_URL}/api/auth/google/callback

FACEBOOK_CLIENT_ID=your-app-id
FACEBOOK_CLIENT_SECRET=your-secret
FACEBOOK_REDIRECT_URI=${APP_URL}/api/auth/facebook/callback
```

#### Validation
- Verify email from OAuth provider
- Check if user already exists
- Link accounts securely
- Store provider ID for future logins

## Security Checklist

### Pre-Production
- [ ] All passwords changed from defaults
- [ ] APP_DEBUG=false in production
- [ ] APP_ENV=production
- [ ] Strong APP_KEY generated
- [ ] Database credentials secured
- [ ] API keys stored in .env
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] CORS properly configured
- [ ] File upload validation tested
- [ ] SQL injection tests passed
- [ ] XSS prevention verified
- [ ] CSRF protection enabled
- [ ] Session security configured
- [ ] Logs not publicly accessible

### Post-Deployment
- [ ] Security scan completed
- [ ] Penetration test performed
- [ ] Backup system verified
- [ ] Monitoring alerts configured
- [ ] Incident response plan documented
- [ ] Regular security updates scheduled
- [ ] SSL certificate auto-renewal tested
- [ ] Database backups verified
- [ ] Disaster recovery plan tested

### Ongoing
- [ ] Weekly dependency updates
- [ ] Monthly security audits
- [ ] Quarterly penetration tests
- [ ] Regular backup verifications
- [ ] Log review (weekly)
- [ ] SSL certificate renewal (before expiry)
- [ ] Security patch deployment (ASAP)

## Incident Response

### In Case of Security Breach

1. **Immediate Actions**
   ```bash
   # Disable affected accounts
   php artisan user:disable {user_id}
   
   # Rotate API keys
   php artisan key:generate
   
   # Clear all sessions
   php artisan session:flush
   
   # Clear cache
   php artisan cache:clear
   ```

2. **Investigation**
   - Check logs for suspicious activity
   - Identify attack vector
   - Assess data exposure
   - Document timeline

3. **Remediation**
   - Patch vulnerability
   - Reset affected passwords
   - Notify affected users
   - Update security measures

4. **Post-Incident**
   - Conduct security audit
   - Update documentation
   - Implement additional safeguards
   - Train team on lessons learned

## Security Contacts

- **Security Issues**: security@autosite.example.com
- **Bug Reports**: bugs@autosite.example.com
- **Responsible Disclosure**: Follow responsible disclosure policy

## References

- [Laravel Security Documentation](https://laravel.com/docs/11.x/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PHP Security Guide](https://www.php.net/manual/en/security.php)
- [Next.js Security](https://nextjs.org/docs/basic-features/security)

---

**Last Updated**: 2025-10-25  
**Version**: 1.0  
**Maintained by**: AUTOSITE Security Team
