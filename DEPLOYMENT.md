# AUTOSITE Deployment Guide

Complete guide for deploying AUTOSITE to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Post-Deployment](#post-deployment)
5. [Monitoring](#monitoring)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### Server Requirements

**Backend (Laravel)**
- Ubuntu 22.04 LTS (recommended) or similar
- PHP 8.2 or higher
- MySQL 8.0+ or PostgreSQL 14+
- Redis 6.0+
- Nginx or Apache
- Composer 2.x
- Node.js 18+ (for asset compilation)
- SSL certificate (Let's Encrypt recommended)

**Frontend (Next.js)**
- Node.js 18+ (20+ recommended)
- npm 10+
- Vercel/Netlify account OR VPS with PM2

### Domain Setup
- Main domain: `autosite.example.com`
- API subdomain: `api.autosite.example.com` (optional)
- Admin subdomain: `admin.autosite.example.com` (optional)

## Backend Deployment

### Option 1: Laravel Forge (Recommended)

1. **Create Server on Laravel Forge**
   ```
   - Provider: DigitalOcean, AWS, etc.
   - Server Size: 2GB RAM minimum
   - PHP Version: 8.2+
   - Database: MySQL 8.0+
   ```

2. **Create Site**
   ```
   - Domain: api.autosite.example.com
   - Project Type: Laravel
   - Web Directory: /public
   ```

3. **Configure Repository**
   ```
   - Connect GitHub repository
   - Branch: main
   - Enable Quick Deploy
   ```

4. **Environment Variables**
   - Copy `.env.production.example` to `.env`
   - Update all sensitive values
   - Run: `php artisan key:generate`

5. **Deploy Script** (Forge deployment script)
   ```bash
   cd /home/forge/api.autosite.example.com
   git pull origin main
   composer install --no-dev --optimize-autoloader
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan storage:link
   php artisan queue:restart
   php artisan reverb:restart  # if using Reverb
   ```

### Option 2: Manual VPS Deployment

1. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install PHP 8.2
   sudo apt install -y software-properties-common
   sudo add-apt-repository ppa:ondrej/php
   sudo apt update
   sudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-redis \
       php8.2-mbstring php8.2-xml php8.2-bcmath php8.2-curl \
       php8.2-gd php8.2-zip php8.2-intl
   
   # Install Composer
   curl -sS https://getcomposer.org/installer | php
   sudo mv composer.phar /usr/local/bin/composer
   
   # Install MySQL
   sudo apt install -y mysql-server
   sudo mysql_secure_installation
   
   # Install Redis
   sudo apt install -y redis-server
   sudo systemctl enable redis-server
   
   # Install Nginx
   sudo apt install -y nginx
   sudo systemctl enable nginx
   ```

2. **Create Database**
   ```bash
   sudo mysql
   ```
   ```sql
   CREATE DATABASE autosite_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'autosite_user'@'localhost' IDENTIFIED BY 'strong_password_here';
   GRANT ALL PRIVILEGES ON autosite_production.* TO 'autosite_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Clone Repository**
   ```bash
   cd /var/www
   sudo git clone https://github.com/anemettemadsen33/AUTOSITE.git autosite
   sudo chown -R www-data:www-data /var/www/autosite
   cd autosite/backend
   ```

4. **Install Dependencies**
   ```bash
   composer install --no-dev --optimize-autoloader
   npm install && npm run build
   ```

5. **Configure Environment**
   ```bash
   cp .env.production.example .env
   nano .env  # Edit configuration
   php artisan key:generate
   ```

6. **Run Migrations**
   ```bash
   php artisan migrate --force
   php artisan db:seed --force  # Only for initial setup
   php artisan storage:link
   ```

7. **Optimize for Production**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   composer dump-autoload --optimize --classmap-authoritative
   ```

8. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/autosite
   ```
   
   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name api.autosite.example.com;
       
       # Redirect to HTTPS
       return 301 https://$server_name$request_uri;
   }
   
   server {
       listen 443 ssl http2;
       listen [::]:443 ssl http2;
       server_name api.autosite.example.com;
       
       root /var/www/autosite/backend/public;
       index index.php index.html;
       
       # SSL Configuration
       ssl_certificate /etc/letsencrypt/live/api.autosite.example.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/api.autosite.example.com/privkey.pem;
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers HIGH:!aNULL:!MD5;
       
       # Security Headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header Referrer-Policy "strict-origin-when-cross-origin" always;
       add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
       
       # Gzip Compression
       gzip on;
       gzip_vary on;
       gzip_min_length 1024;
       gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
       
       location / {
           try_files $uri $uri/ /index.php?$query_string;
       }
       
       location ~ \.php$ {
           include snippets/fastcgi-php.conf;
           fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
           fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
           include fastcgi_params;
       }
       
       location ~ /\.(?!well-known).* {
           deny all;
       }
       
       # Client Body Size (for file uploads)
       client_max_body_size 20M;
   }
   ```
   
   ```bash
   sudo ln -s /etc/nginx/sites-available/autosite /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

9. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d api.autosite.example.com
   ```

10. **Configure Queue Worker**
    ```bash
    sudo nano /etc/systemd/system/autosite-worker.service
    ```
    
    ```ini
    [Unit]
    Description=AUTOSITE Queue Worker
    After=network.target
    
    [Service]
    User=www-data
    Group=www-data
    Restart=always
    ExecStart=/usr/bin/php /var/www/autosite/backend/artisan queue:work database --sleep=3 --tries=3 --max-time=3600
    
    [Install]
    WantedBy=multi-user.target
    ```
    
    ```bash
    sudo systemctl enable autosite-worker
    sudo systemctl start autosite-worker
    ```

11. **Configure Scheduler (Cron)**
    ```bash
    sudo crontab -e -u www-data
    ```
    
    Add:
    ```cron
    * * * * * cd /var/www/autosite/backend && php artisan schedule:run >> /dev/null 2>&1
    ```

12. **Configure Laravel Reverb (WebSockets)**
    ```bash
    sudo nano /etc/systemd/system/autosite-reverb.service
    ```
    
    ```ini
    [Unit]
    Description=AUTOSITE Reverb Server
    After=network.target
    
    [Service]
    User=www-data
    Group=www-data
    Restart=always
    ExecStart=/usr/bin/php /var/www/autosite/backend/artisan reverb:start --host=0.0.0.0 --port=8080
    
    [Install]
    WantedBy=multi-user.target
    ```
    
    ```bash
    sudo systemctl enable autosite-reverb
    sudo systemctl start autosite-reverb
    ```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to vercel.com
   - Click "New Project"
   - Import from GitHub: `anemettemadsen33/AUTOSITE`
   - Root Directory: `autosite-frontend`

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://api.autosite.example.com/api
   NEXT_PUBLIC_SITE_URL=https://autosite.example.com
   NEXT_PUBLIC_SITE_NAME=AUTOSITE
   NEXT_PUBLIC_DEFAULT_LOCALE=en
   NEXT_PUBLIC_DEFAULT_CURRENCY=EUR
   ```

4. **Custom Domain**
   - Add domain: `autosite.example.com`
   - Configure DNS: Add CNAME record pointing to Vercel

5. **Deploy**
   - Click "Deploy"
   - Vercel will auto-deploy on git push to main

### Option 2: Netlify

1. **Connect Repository**
   - Go to netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select repository
   - Base directory: `autosite-frontend`

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   (Same as Vercel above)

4. **Deploy**

### Option 3: VPS with PM2

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   sudo npm install -g pm2
   ```

2. **Build Application**
   ```bash
   cd /var/www/autosite/autosite-frontend
   npm install
   cp .env.example .env.local
   nano .env.local  # Configure
   npm run build
   ```

3. **Start with PM2**
   ```bash
   pm2 start npm --name "autosite-frontend" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx Reverse Proxy**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name autosite.example.com;
       
       # SSL config (same as above)
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Post-Deployment

### 1. Verify Deployment
```bash
# Backend health check
curl https://api.autosite.example.com/api/settings/public

# Frontend
curl https://autosite.example.com
```

### 2. Initial Admin User
```bash
cd /var/www/autosite/backend
php artisan tinker
```
```php
$user = \App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@autosite.example.com',
    'password' => bcrypt('secure_password'),
    'role' => 'admin',
]);
```

### 3. Schedule Exchange Rate Updates
Already configured in cron (runs every minute, checks schedule)

### 4. Test Features
- [ ] User registration
- [ ] Login/Logout
- [ ] Vehicle creation
- [ ] Image upload
- [ ] Search and filters
- [ ] Currency conversion
- [ ] Multi-language switching
- [ ] Admin panel access

## Monitoring

### 1. Application Logs
```bash
# Laravel logs
tail -f /var/www/autosite/backend/storage/logs/laravel.log

# Nginx error logs
tail -f /var/log/nginx/error.log

# Queue worker
sudo journalctl -u autosite-worker -f
```

### 2. Performance Monitoring
- Use Laravel Telescope (development only)
- Setup Sentry for error tracking
- Use New Relic or DataDog for APM

### 3. Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

### 4. Database Backups
```bash
# Manual backup
mysqldump -u autosite_user -p autosite_production > backup.sql

# Automated (add to crontab)
0 2 * * * mysqldump -u autosite_user -p'password' autosite_production | gzip > /backups/autosite_$(date +\%Y\%m\%d).sql.gz
```

## Troubleshooting

### 500 Internal Server Error
```bash
# Check Laravel logs
tail -100 /var/www/autosite/backend/storage/logs/laravel.log

# Check permissions
sudo chown -R www-data:www-data /var/www/autosite/backend/storage
sudo chmod -R 775 /var/www/autosite/backend/storage
```

### Queue Jobs Not Processing
```bash
# Check worker status
sudo systemctl status autosite-worker

# Restart worker
sudo systemctl restart autosite-worker

# Check for failed jobs
php artisan queue:failed
php artisan queue:retry all
```

### Frontend Not Updating
```bash
# Rebuild frontend
cd /var/www/autosite/autosite-frontend
npm run build
pm2 restart autosite-frontend
```

### Database Connection Issues
```bash
# Test connection
php artisan tinker
DB::connection()->getPdo();

# Check MySQL status
sudo systemctl status mysql
```

## Security Checklist

- [ ] SSL certificate installed and auto-renewing
- [ ] Firewall configured (UFW or similar)
- [ ] SSH key authentication only (no password login)
- [ ] Database not accessible from public internet
- [ ] Strong passwords for all services
- [ ] Regular security updates
- [ ] CORS properly configured
- [ ] Rate limiting active
- [ ] File upload validation
- [ ] SQL injection prevention (Eloquent ORM)
- [ ] XSS prevention
- [ ] CSRF protection enabled

## Performance Checklist

- [ ] Redis caching enabled
- [ ] OPcache enabled for PHP
- [ ] Gzip compression enabled
- [ ] CDN configured for static assets
- [ ] Database queries optimized
- [ ] Images optimized (WebP, lazy loading)
- [ ] HTTP/2 enabled
- [ ] Browser caching configured
- [ ] Queue workers running
- [ ] Database indexes created

---

**Last Updated**: 2025-10-25  
**Maintained by**: AUTOSITE Development Team
