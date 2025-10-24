# AUTOSITE - Deployment Guide

## Overview

This guide covers deployment procedures for both backend (Laravel) and frontend (Next.js) components of AUTOSITE.

---

## Prerequisites

### Backend Requirements
- PHP 8.2 or higher
- Composer 2.x
- MySQL 8.0+ or MariaDB 10.3+
- Web server (Nginx or Apache)
- SSL certificate
- Cron access for scheduled tasks

### Frontend Requirements
- Node.js 18.x or higher
- npm or yarn
- Vercel/Netlify account (recommended) or custom server

---

## Backend Deployment (Laravel + Filament)

### Option 1: Laravel Forge (Recommended)

Laravel Forge provides automated deployment for Laravel applications.

#### Setup Steps:

1. **Connect Forge to Your Server**
   - Sign up at forge.laravel.com
   - Connect your server (DigitalOcean, AWS, Vultr, etc.)
   - Install PHP 8.2, MySQL, Nginx

2. **Create New Site**
   ```
   Domain: api.autosite.com
   Project Type: Laravel/PHP
   PHP Version: 8.2
   ```

3. **Deploy from Git**
   ```
   Repository: github.com/anemettemadsen33/AUTOSITE
   Branch: main
   Deploy Path: /backend
   ```

4. **Environment Variables**
   Update `.env` in Forge:
   ```env
   APP_NAME=AUTOSITE
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://api.autosite.com
   
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=autosite_prod
   DB_USERNAME=autosite_user
   DB_PASSWORD=SECURE_PASSWORD_HERE
   
   FRONTEND_URL=https://autosite.com
   SANCTUM_STATEFUL_DOMAINS=autosite.com,www.autosite.com
   
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USERNAME=your-username
   MAIL_PASSWORD=your-password
   ```

5. **SSL Certificate**
   - Enable LetsEncrypt SSL in Forge
   - Or upload custom SSL certificate

6. **Deploy Script**
   Update Forge deploy script:
   ```bash
   cd /home/forge/api.autosite.com/backend
   git pull origin main
   composer install --no-dev --optimize-autoloader
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan storage:link
   php artisan optimize
   ```

7. **Scheduled Jobs**
   Forge automatically sets up cron. Verify:
   ```
   * * * * * cd /home/forge/api.autosite.com/backend && php artisan schedule:run >> /dev/null 2>&1
   ```

8. **Queue Workers**
   Setup queue worker in Forge:
   ```
   Connection: database
   Queue: default
   Processes: 1
   ```

---

### Option 2: Manual VPS Deployment

#### 1. Server Setup (Ubuntu 22.04)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP 8.2
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-xml \
    php8.2-mbstring php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install MySQL
sudo apt install -y mysql-server
sudo mysql_secure_installation

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. MySQL Database Setup

```bash
sudo mysql -u root -p

# Create database and user
CREATE DATABASE autosite_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'autosite_user'@'localhost' IDENTIFIED BY 'SECURE_PASSWORD';
GRANT ALL PRIVILEGES ON autosite_prod.* TO 'autosite_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Deploy Application

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/anemettemadsen33/AUTOSITE.git
cd AUTOSITE/backend

# Set permissions
sudo chown -R www-data:www-data /var/www/AUTOSITE/backend
sudo chmod -R 755 /var/www/AUTOSITE/backend
sudo chmod -R 775 /var/www/AUTOSITE/backend/storage
sudo chmod -R 775 /var/www/AUTOSITE/backend/bootstrap/cache

# Install dependencies
composer install --no-dev --optimize-autoloader

# Environment setup
cp .env.example .env
nano .env  # Configure as shown above

# Generate key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
```

#### 4. Nginx Configuration

Create `/etc/nginx/sites-available/api.autosite.com`:

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
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/api.autosite.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. SSL Certificate

```bash
sudo certbot --nginx -d api.autosite.com
```

#### 6. Setup Cron

```bash
sudo crontab -e

# Add:
* * * * * cd /var/www/AUTOSITE/backend && php artisan schedule:run >> /dev/null 2>&1
```

#### 7. Setup Queue Worker (Systemd)

Create `/etc/systemd/system/autosite-worker.service`:

```ini
[Unit]
Description=AUTOSITE Queue Worker
After=network.target

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/AUTOSITE/backend/artisan queue:work database --sleep=3 --tries=3

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable autosite-worker
sudo systemctl start autosite-worker
```

---

## Frontend Deployment (Next.js)

### Option 1: Vercel (Recommended)

Vercel is the creators of Next.js and provides optimal deployment.

#### Setup Steps:

1. **Import Project**
   - Go to vercel.com
   - Click "New Project"
   - Import from GitHub: `anemettemadsen33/AUTOSITE`
   - Root Directory: `frontend`

2. **Configure Build**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables**
   Add in Vercel dashboard:
   ```env
   NEXT_PUBLIC_API_URL=https://api.autosite.com/api
   NEXT_PUBLIC_APP_URL=https://autosite.com
   NEXT_PUBLIC_DEFAULT_LOCALE=en
   NEXT_PUBLIC_SUPPORTED_LOCALES=en,de,fr,es,it,pt,ro,pl
   NEXT_PUBLIC_DEFAULT_CURRENCY=EUR
   ```

4. **Custom Domain**
   - Add domain: `autosite.com`
   - Add www redirect: `www.autosite.com` → `autosite.com`
   - SSL is automatic

5. **Deploy**
   - Click "Deploy"
   - Automatic deployments on git push

---

### Option 2: Netlify

Similar to Vercel:

1. Connect repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

---

### Option 3: Custom Server (Node.js)

#### 1. Server Setup

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2
```

#### 2. Deploy Application

```bash
cd /var/www/AUTOSITE/frontend

# Install dependencies
npm install

# Build application
npm run build

# Create .env.local
cp .env.example .env.local
nano .env.local  # Configure environment variables
```

#### 3. PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'autosite-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/AUTOSITE/frontend',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. Nginx Reverse Proxy

Create `/etc/nginx/sites-available/autosite.com`:

```nginx
server {
    listen 80;
    server_name autosite.com www.autosite.com;

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

Enable and get SSL:
```bash
sudo ln -s /etc/nginx/sites-available/autosite.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d autosite.com -d www.autosite.com
```

---

## Post-Deployment Checklist

### Backend
- [ ] SSL certificate installed and working
- [ ] Database connection successful
- [ ] Migrations run successfully
- [ ] Seeders run (admin user, settings)
- [ ] Storage linked (`php artisan storage:link`)
- [ ] Cron job running (check exchange rates update)
- [ ] Queue worker running
- [ ] File permissions correct (storage, bootstrap/cache)
- [ ] CORS configured for frontend domain
- [ ] API rate limiting active
- [ ] Filament admin accessible at /admin
- [ ] Email configured and tested

### Frontend
- [ ] SSL certificate installed
- [ ] Environment variables set correctly
- [ ] API connection working
- [ ] All 8 languages loading
- [ ] Currency conversion working
- [ ] Images loading from backend
- [ ] Sitemap generated
- [ ] robots.txt accessible
- [ ] SEO meta tags present
- [ ] Google Analytics configured
- [ ] 404 pages working
- [ ] Forms submitting correctly

---

## Monitoring & Maintenance

### Backend Monitoring

```bash
# Check Laravel logs
tail -f /var/www/AUTOSITE/backend/storage/logs/laravel.log

# Check queue worker status
sudo systemctl status autosite-worker

# Check scheduled tasks
php artisan schedule:list

# Monitor database
mysqldump -u autosite_user -p autosite_prod > backup.sql
```

### Frontend Monitoring

```bash
# Check PM2 status
pm2 status
pm2 logs autosite-frontend

# Monitor with PM2
pm2 monit
```

---

## Rollback Procedure

### Backend
```bash
cd /var/www/AUTOSITE/backend
git reset --hard HEAD~1  # Rollback one commit
composer install --no-dev --optimize-autoloader
php artisan migrate:rollback
php artisan config:cache
sudo systemctl restart php8.2-fpm
```

### Frontend
```bash
cd /var/www/AUTOSITE/frontend
git reset --hard HEAD~1
npm install
npm run build
pm2 restart autosite-frontend
```

---

## Backup Strategy

### Daily Backups (Automated)

```bash
#!/bin/bash
# /usr/local/bin/backup-autosite.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/autosite"

# Backup database
mysqldump -u autosite_user -p'PASSWORD' autosite_prod > $BACKUP_DIR/db_$DATE.sql

# Backup uploaded files
tar -czf $BACKUP_DIR/storage_$DATE.tar.gz /var/www/AUTOSITE/backend/storage/app

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

Add to cron:
```bash
0 2 * * * /usr/local/bin/backup-autosite.sh
```

---

## Support

For deployment issues:
- Check logs first
- Review environment variables
- Verify file permissions
- Check firewall rules
- Confirm DNS settings

---

**Last Updated**: 2025-10-24  
**Status**: Production Deployment Guide