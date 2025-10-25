# AUTOSITE Frontend - Deployment Guide

This guide covers deploying the AUTOSITE frontend to Vercel and other platforms.

## 🚀 Vercel Deployment (Recommended)

### Prerequisites
- GitHub account with repository access
- Vercel account (free tier available)
- Laravel backend API deployed and accessible

### Step 1: Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository `anemettemadsen33/AUTOSITE`
4. Select the `autosite-frontend` directory as the root

### Step 2: Configure Project Settings

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: `autosite-frontend`

**Build Command**: `npm run build`

**Output Directory**: `.next` (auto-detected)

**Install Command**: `npm install`

### Step 3: Environment Variables

Add the following environment variables in Vercel Project Settings → Environment Variables:

#### Required Variables

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

#### Optional Variables

```
# OpenAI Integration
OPENAI_API_KEY=sk-your-openai-key

# Stripe Payments
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
NEXT_PUBLIC_STRIPE_KEY=pk_live_your-stripe-public-key

# Debug Mode (set to "false" in production)
NEXT_PUBLIC_DEBUG=false

# Skip environment validation (not recommended)
SKIP_ENV_VALIDATION=false
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be live at `https://your-project.vercel.app`

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `autosite.com`)
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` environment variable with your custom domain

## 🔧 Configuration Notes

### API URL Configuration

Make sure your `NEXT_PUBLIC_API_URL` points to your deployed Laravel backend:

```
# Development
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Production
NEXT_PUBLIC_API_URL=https://api.autosite.com/api
```

### CORS Setup

Ensure your Laravel backend allows requests from your Vercel domain:

```php
// config/cors.php
'allowed_origins' => [
    'https://your-project.vercel.app',
    'https://autosite.com',
],
```

### Image Optimization

Update `next.config.ts` to allow your image domains:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-backend-domain.com',
    },
  ],
}
```

## 📊 Monitoring & Analytics

### Vercel Analytics

Enable in Project Settings → Analytics for:
- Page views
- User sessions
- Performance metrics
- Web Vitals

### Error Tracking

Consider integrating:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay

## 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production**: Commits to `main` branch
- **Preview**: Pull requests and other branches

Configure in Project Settings → Git

## 🌍 Multi-Region Deployment

For better global performance:

1. Upgrade to Vercel Pro
2. Enable Edge Network
3. Configure regions in `vercel.json`:

```json
{
  "regions": ["iad1", "fra1", "sfo1"]
}
```

## 🔐 Environment-Specific Builds

### Development Preview
```bash
vercel
```

### Production Deployment
```bash
vercel --prod
```

## 🐛 Troubleshooting

### Build Failures

**Issue**: Build fails with font loading errors

**Solution**: Fonts are fetched at build time. Ensure internet connection or use local fonts.

---

**Issue**: `metadata` export errors

**Solution**: Don't export metadata from 'use client' components. Move to server components.

---

**Issue**: API connection timeout

**Solution**: Check `NEXT_PUBLIC_API_URL` and ensure backend is accessible from Vercel IPs.

### Performance Issues

**Issue**: Slow page loads

**Solutions**:
- Enable Vercel Edge Caching
- Optimize images with Next.js Image component
- Use dynamic imports for heavy components
- Enable Vercel Analytics to identify bottlenecks

### Runtime Errors

**Issue**: `localStorage is not defined`

**Solution**: Use client components for localStorage access:

```typescript
'use client';
// localStorage code here
```

## 📱 Alternative Deployment Options

### Netlify

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### VPS/Cloud Server

```bash
# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and build
git clone <repo-url>
cd autosite-frontend
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "autosite-frontend" -- start
pm2 save
pm2 startup
```

## 🔒 Security Checklist

- [ ] Environment variables set correctly
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS configured on backend
- [ ] CSP headers configured
- [ ] Rate limiting on API
- [ ] Authentication tokens secure
- [ ] No sensitive data in client code

## 📈 Post-Deployment

1. **Test all features**:
   - Authentication flow
   - Vehicle browsing
   - Filters
   - Dealer pages
   - Compare functionality
   - Contact form
   - Multi-language switching
   - Dark/light mode

2. **Monitor performance**:
   - Check Vercel Analytics
   - Run Lighthouse audit
   - Test on mobile devices

3. **SEO Setup**:
   - Submit sitemap to Google Search Console
   - Verify meta tags
   - Check canonical URLs
   - Test social sharing (Open Graph)

## 📞 Support

For deployment issues:
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Documentation: [nextjs.org/docs](https://nextjs.org/docs)

---

**Last Updated**: December 2024
