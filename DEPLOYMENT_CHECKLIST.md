# Production Deployment Checklist

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (backend and frontend)
- [ ] No critical security vulnerabilities (CodeQL scan clean)
- [ ] Code review completed
- [ ] Performance benchmarks met (Lighthouse >90)
- [ ] No console.log or debug statements in production code
- [ ] All TODOs and FIXMEs addressed or documented

### Configuration
- [ ] Environment variables configured for production
- [ ] API keys and secrets stored securely (not in code)
- [ ] Database credentials secured
- [ ] CORS settings configured correctly
- [ ] Rate limiting configured
- [ ] Email service configured
- [ ] File storage configured (S3/local)

### Database
- [ ] Database migrations tested
- [ ] Database backups configured
- [ ] Production database created
- [ ] Database indexes optimized
- [ ] Seeders reviewed (no test data in production)

### Security
- [ ] HTTPS/SSL certificates installed
- [ ] Security headers configured
- [ ] CSRF protection enabled
- [ ] XSS protection enabled
- [ ] SQL injection protection verified
- [ ] File upload security configured
- [ ] Authentication security reviewed
- [ ] API authentication secured
- [ ] Rate limiting enabled

### Performance
- [ ] Caching strategy implemented
- [ ] Asset optimization completed
- [ ] CDN configured (if applicable)
- [ ] Database query optimization verified
- [ ] Image optimization enabled
- [ ] Lazy loading implemented
- [ ] Bundle size optimized

## Backend Deployment

### Laravel (Backend) - Manual Deployment

#### 1. Server Requirements
```
PHP >= 8.2
MySQL >= 8.0 or PostgreSQL >= 13
Composer >= 2.0
Nginx or Apache
Redis (optional, for caching/queues)
Node.js >= 18 (for asset compilation)
```

#### 2. Initial Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP and extensions
sudo apt install php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-xml \
  php8.3-bcmath php8.3-curl php8.3-zip php8.3-gd -y

# Install MySQL
sudo apt install mysql-server -y

# Install Nginx
sudo apt install nginx -y

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

#### 3. Deploy Application
```bash
# Navigate to web directory
cd /var/www

# Clone repository
git clone https://github.com/yourusername/AUTOSITE.git
cd AUTOSITE/backend

# Install dependencies
composer install --no-dev --optimize-autoloader

# Set permissions
sudo chown -R www-data:www-data /var/www/AUTOSITE
sudo chmod -R 755 /var/www/AUTOSITE
sudo chmod -R 775 storage bootstrap/cache

# Environment setup
cp .env.example .env
nano .env  # Configure production settings

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage link
php artisan storage:link
```

#### 4. Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.autosite.com;
    root /var/www/AUTOSITE/backend/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

#### 5. SSL Certificate (Let's Encrypt)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d api.autosite.com

# Auto-renewal (already configured by certbot)
sudo systemctl status certbot.timer
```

#### 6. Queue Worker Setup
```bash
# Create systemd service
sudo nano /etc/systemd/system/autosite-worker.service
```

```ini
[Unit]
Description=AUTOSITE Queue Worker
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/AUTOSITE/backend
ExecStart=/usr/bin/php artisan queue:work --sleep=3 --tries=3
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable autosite-worker
sudo systemctl start autosite-worker
```

#### 7. Scheduled Tasks (Cron)
```bash
# Edit crontab
sudo crontab -e -u www-data

# Add Laravel scheduler
* * * * * cd /var/www/AUTOSITE/backend && php artisan schedule:run >> /dev/null 2>&1
```

### Laravel Forge Deployment (Recommended)

1. **Connect Server to Forge**
   - Add your server to Laravel Forge
   - Install PHP, MySQL, Nginx automatically

2. **Create Site**
   - Add new site: api.autosite.com
   - Set web directory: /public

3. **Deploy Repository**
   - Connect GitHub repository
   - Set branch: main
   - Configure deploy script

4. **Environment Variables**
   - Add all production .env variables
   - Update APP_ENV=production
   - Set APP_DEBUG=false

5. **SSL Certificate**
   - Enable Let's Encrypt SSL
   - Force HTTPS

6. **Queue Workers**
   - Enable queue daemon
   - Set connection and processes

7. **Scheduled Jobs**
   - Enable scheduler (automatic)

## Frontend Deployment

### Vercel Deployment (Recommended)

#### 1. Vercel CLI Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login
```

#### 2. Configure Project
```bash
cd frontend

# Initialize Vercel project
vercel

# Follow prompts:
# - Link to existing project or create new
# - Select framework preset: Vite
# - Build command: npm run build
# - Output directory: dist
```

#### 3. Environment Variables
Add in Vercel dashboard or CLI:
```bash
vercel env add VITE_API_URL production
# Enter: https://api.autosite.com/api
```

Required environment variables:
- `VITE_API_URL`: Backend API URL
- Any other VITE_* prefixed variables

#### 4. Deploy to Production
```bash
# Deploy to production
vercel --prod

# Or use GitHub integration for automatic deploys
```

#### 5. Custom Domain
```bash
# Add custom domain
vercel domains add autosite.com
vercel domains add www.autosite.com

# Follow DNS configuration instructions
```

### Alternative: Netlify Deployment

#### 1. Netlify CLI Setup
```bash
npm install -g netlify-cli
netlify login
```

#### 2. Deploy
```bash
cd frontend
netlify init

# Configure build settings:
# Build command: npm run build
# Publish directory: dist
```

#### 3. Environment Variables
```bash
netlify env:set VITE_API_URL https://api.autosite.com/api
```

#### 4. Deploy to Production
```bash
netlify deploy --prod
```

### Alternative: Self-Hosted (Nginx)

#### 1. Build Application
```bash
cd frontend
npm install
npm run build
```

#### 2. Nginx Configuration
```nginx
server {
    listen 80;
    server_name autosite.com www.autosite.com;
    root /var/www/AUTOSITE/frontend/dist;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
```

#### 3. Deploy Files
```bash
# Copy built files
sudo cp -r dist/* /var/www/AUTOSITE/frontend/dist/

# Set permissions
sudo chown -R www-data:www-data /var/www/AUTOSITE/frontend/dist
```

## Post-Deployment

### Verification Checklist
- [ ] Homepage loads correctly
- [ ] API endpoints responding
- [ ] Authentication working
- [ ] Database queries executing
- [ ] Images loading
- [ ] Forms submitting
- [ ] Email notifications sending
- [ ] SSL certificate valid
- [ ] Performance metrics acceptable
- [ ] Error monitoring active

### Monitoring Setup
- [ ] Configure application monitoring (e.g., Sentry)
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Configure log aggregation (e.g., Papertrail)
- [ ] Set up performance monitoring (e.g., New Relic)
- [ ] Configure error alerting
- [ ] Set up backup monitoring

### Backup Strategy
- [ ] Database backups configured (daily)
- [ ] File backups configured (daily)
- [ ] Backup restoration tested
- [ ] Backup retention policy set (30 days)

### Documentation
- [ ] Deployment process documented
- [ ] Server access documented
- [ ] Emergency contacts listed
- [ ] Rollback procedure documented
- [ ] Troubleshooting guide created

## CI/CD Pipeline

### GitHub Actions
The project includes automated workflows:

1. **Backend Tests** (`.github/workflows/backend-tests.yml`)
   - Runs on every push
   - Tests all backend functionality
   - Required for deployment

2. **Frontend Tests** (`.github/workflows/frontend-tests.yml`)
   - Runs on every push
   - Tests frontend components
   - Required for deployment

3. **E2E Tests** (`.github/workflows/e2e-tests.yml`)
   - Runs on every push to main
   - Tests complete user flows
   - Required for deployment

4. **CodeQL Security** (`.github/workflows/codeql.yml`)
   - Runs on every push
   - Scans for security vulnerabilities
   - Blocks deployment on critical issues

5. **Deploy** (`.github/workflows/deploy.yml`)
   - Runs on push to main
   - Deploys backend and frontend
   - Only runs if tests pass

### Required Secrets

Add these secrets in GitHub Settings > Secrets and variables > Actions:

#### Backend (SSH Deployment)
- `SSH_HOST`: Server IP or hostname
- `SSH_USERNAME`: SSH username
- `SSH_PRIVATE_KEY`: SSH private key
- `SSH_PORT`: SSH port (default: 22)

#### Frontend (Vercel)
- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `API_URL`: Production API URL

#### Optional
- `SLACK_WEBHOOK`: Slack webhook for deployment notifications

## Rollback Procedure

### Backend Rollback
```bash
# SSH to server
ssh user@api.autosite.com

# Navigate to app
cd /var/www/AUTOSITE/backend

# View recent commits
git log --oneline -10

# Rollback to previous commit
git reset --hard <commit-hash>

# Reinstall dependencies
composer install --no-dev --optimize-autoloader

# Clear and rebuild cache
php artisan cache:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart services
sudo systemctl restart php8.3-fpm
sudo systemctl restart autosite-worker
```

### Frontend Rollback (Vercel)
```bash
# Vercel keeps deployment history
# Use Vercel dashboard to rollback to previous deployment
# Or via CLI:
vercel rollback
```

### Database Rollback
```bash
# Restore from backup
mysql -u root -p autosite_production < backup_YYYY-MM-DD.sql

# Or using Laravel migrations
php artisan migrate:rollback --step=1
```

## Troubleshooting

### Common Issues

**Issue**: 500 Internal Server Error
- Check Laravel logs: `storage/logs/laravel.log`
- Check Nginx error logs: `/var/log/nginx/error.log`
- Verify file permissions
- Check .env configuration

**Issue**: Database Connection Failed
- Verify database credentials in .env
- Check database server is running
- Verify firewall rules
- Check database user permissions

**Issue**: Assets Not Loading
- Verify storage symlink: `php artisan storage:link`
- Check file permissions
- Verify CDN configuration
- Clear browser cache

**Issue**: Queue Jobs Not Processing
- Check worker status: `sudo systemctl status autosite-worker`
- Check logs: `storage/logs/laravel.log`
- Restart worker: `sudo systemctl restart autosite-worker`
- Verify Redis connection (if using)

## Support

For deployment issues:
1. Check logs first
2. Consult documentation
3. Review GitHub Issues
4. Contact development team

---

**Last Updated**: October 30, 2025  
**Version**: 1.0.0  
**Status**: Ready for Production Deployment
