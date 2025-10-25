# AUTOSITE Frontend

A modern, full-featured automotive marketplace built with Next.js 16, designed to connect car buyers with dealers across Europe.

## 🚀 Features

### Core Functionality
- **Multi-language Support**: EN, RO, DE, FR, IT, ES, PL, HU with i18n
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Multi-currency**: Support for multiple currencies with automatic conversion
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Server-side rendering, metadata, and sitemap generation

### Pages & Routes
- **Homepage** (`/`): Featured vehicles with advanced filtering
- **Vehicles Listing** (`/vehicles`): Browse all available vehicles
- **Vehicle Details** (`/vehicle/[slug]`): Complete vehicle information with image gallery
- **Dealers** (`/dealers`): Browse and search automotive dealers
- **Compare** (`/compare`): Side-by-side comparison of up to 3 vehicles
- **Contact** (`/contact`): Contact form with business information
- **Authentication**: Login, register, password reset
- **User Dashboard**: Manage listings, favorites, messages, subscriptions

### Advanced Features
- **Infinite Scroll**: Smooth pagination for vehicle listings
- **Real-time Filters**: Filter by brand, price, year, mileage, fuel type, etc.
- **Favorites System**: Save and manage favorite vehicles
- **Messaging**: Direct communication with dealers
- **Subscription Plans**: Tiered pricing for dealers
- **Image Carousel**: Professional photo galleries
- **Form Validation**: React Hook Form with comprehensive error handling

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router & Turbopack
- **Language**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with persistence
- **API Client**: [Axios](https://axios-http.com/) with interceptors
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Testing**: Jest + React Testing Library + Playwright
- **SEO**: next-seo + next-sitemap
- **Linting**: ESLint + TypeScript ESLint

## 📋 Prerequisites

- **Node.js**: 20.x or higher
- **Package Manager**: npm, yarn, or pnpm
- **Laravel Backend**: Running on `http://localhost:8000/api`

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AUTOSITE/autosite-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Laravel Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Site URL (for SEO and canonical links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: OpenAI API Key (for intelligent search)
OPENAI_API_KEY=your_openai_api_key

# Optional: Stripe Keys (for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key

# Debug Mode
NEXT_PUBLIC_DEBUG=false
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Testing
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run e2e              # Run Playwright E2E tests
npm run e2e:ui           # Run E2E tests with UI
npm run e2e:debug        # Debug E2E tests
```

## 🗂 Project Structure

```
autosite-frontend/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Internationalized routes
│   │   ├── page.tsx             # Homepage
│   │   ├── vehicles/            # Vehicle listing
│   │   ├── dealers/             # Dealer listing
│   │   ├── compare/             # Vehicle comparison
│   │   ├── contact/             # Contact page
│   │   ├── auth/                # Authentication pages
│   │   ├── user/                # User dashboard
│   │   └── vehicle/[slug]/      # Vehicle details
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # Base UI components
│   ├── VehicleCard.tsx          # Vehicle card component
│   ├── DealerCard.tsx           # Dealer card component
│   ├── CompareTable.tsx         # Comparison table
│   ├── Filters.tsx              # Filter panel
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer
│   └── ...
├── lib/                         # Utilities and API
│   ├── api.ts                   # Axios instance
│   ├── vehicles.ts              # Vehicle API functions
│   ├── dealers.ts               # Dealer API functions
│   ├── auth.ts                  # Authentication
│   ├── messages.ts              # Messaging
│   └── ...
├── stores/                      # Zustand state stores
│   ├── authStore.ts             # Authentication state
│   ├── settingsStore.ts         # App settings
│   ├── favoritesStore.ts        # Favorites management
│   └── compareStore.ts          # Comparison state
├── messages/                    # i18n translations
│   ├── en.json                  # English
│   ├── ro.json                  # Romanian
│   ├── de.json                  # German
│   └── ...
├── i18n/                        # i18n configuration
├── __tests__/                   # Unit tests
├── e2e/                         # End-to-end tests
├── public/                      # Static assets
├── env.mjs                      # Environment validation
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

## 🎨 UI Components

The project uses a custom component library built with Tailwind CSS:

- **Button**: Styled buttons with variants
- **Input**: Form inputs with validation states
- **Select**: Dropdown selects
- **Spinner**: Loading indicators
- **Modal**: Dialog components
- **Toast**: Notification system

## 🌐 API Integration

The frontend communicates with the Laravel backend through REST APIs:

### Endpoints

```typescript
// Vehicles
GET    /vehicles              // List vehicles
GET    /vehicles/{id}         // Get vehicle details
POST   /vehicles              // Create vehicle (auth required)
PUT    /vehicles/{id}         // Update vehicle (auth required)
DELETE /vehicles/{id}         // Delete vehicle (auth required)

// Dealers
GET    /dealers               // List dealers
GET    /dealers/{id}          // Get dealer details

// Messages
POST   /messages              // Send message

// Settings
GET    /settings              // Get public settings

// Brands
GET    /brands                // List vehicle brands

// Authentication
POST   /auth/login            // Login
POST   /auth/register         // Register
POST   /auth/logout           // Logout
POST   /auth/forgot-password  // Request password reset
POST   /auth/reset-password   // Reset password
```

### Authentication

The app uses Bearer token authentication (Laravel Sanctum/JWT):

```typescript
// Stored in localStorage
localStorage.setItem('auth_token', token);
localStorage.setItem('auth_user', JSON.stringify(user));

// Automatically added to requests via Axios interceptor
headers: {
  'Authorization': `Bearer ${token}`
}
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run e2e

# Interactive UI mode
npm run e2e:ui

# Debug mode
npm run e2e:debug
```

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Environment Variables (Vercel)

Add these in Vercel Project Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-api.com/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
OPENAI_API_KEY=your_key
STRIPE_SECRET_KEY=your_key
NEXT_PUBLIC_STRIPE_KEY=your_key
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🔧 Configuration

### Next.js Config

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: true,  // Enable React Compiler
  images: {
    domains: ['localhost'],
  },
};
```

### Tailwind Config

Custom theme configuration in `tailwind.config.ts` with dark mode support.

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first approach.

## 🌍 Internationalization

Supported languages:
- 🇬🇧 English (en)
- 🇷🇴 Romanian (ro)
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇮🇹 Italian (it)
- 🇪🇸 Spanish (es)
- 🇵🇱 Polish (pl)
- 🇭🇺 Hungarian (hu)

To add a new language:

1. Create `messages/{locale}.json`
2. Add locale to `middleware.ts`
3. Update language selector in `Header.tsx`

## 🎯 Performance

- **Lighthouse Score**: Optimized for 100/100
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: API response caching with React Query ready

## 🔒 Security

- **CSRF Protection**: Via Laravel Sanctum
- **XSS Protection**: React auto-escaping
- **Environment Variables**: Validated with env.mjs
- **Auth Token**: Secure storage in localStorage
- **Input Validation**: React Hook Form + server-side validation

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors related to metadata exports:

```typescript
// Don't export metadata from 'use client' components
// Remove 'use client' or move metadata to server component
```

### Font Loading Issues

If Google Fonts fail to load during build (offline):

```typescript
// Fonts are cached locally after first successful load
// Build will work once fonts are cached
```

### API Connection

Ensure Laravel backend is running:

```bash
# In Laravel project
php artisan serve
```

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: info@autosite.com

## 📄 License

Private/Commercial

## 🙏 Acknowledgments

- Built with [Blazity/next-enterprise](https://github.com/Blazity/next-enterprise) template
- Inspired by mobile.de and autoscout24.de
- Icons from Heroicons

---

**Made with ❤️ for the automotive industry**
