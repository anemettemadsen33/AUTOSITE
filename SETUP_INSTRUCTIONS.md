# Setup Instructions for AUTOSITE

## Prerequisites

Ensure you have the following installed:
- **Node.js**: v20.19.5 or higher
- **npm**: v10.8.2 or higher

You can check your versions with:
```bash
node -v
npm -v
```

## Installing Dependencies

This project has multiple frontend applications that require separate dependency installations:

### 1. Root Dependencies
```bash
npm install
```

### 2. Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 3. Frontend (Main) Dependencies
```bash
cd frontend
npm install
cd ..
```

### 4. Autosite-Frontend Dependencies
```bash
cd autosite-frontend
npm install
cd ..
```

**Tip**: You can use subshells to avoid manual directory navigation:
```bash
(cd backend && npm install)
(cd frontend && npm install)
(cd autosite-frontend && npm install)
```

## PostCSS and Tailwind CSS Configuration

This project uses different Tailwind CSS versions depending on the application:

- **Frontend applications** (frontend/ and autosite-frontend/): Use **Tailwind CSS v4** with the modern `@tailwindcss/postcss` plugin
- **Backend application**: Uses **Tailwind CSS v3** with traditional `tailwindcss` and `autoprefixer` plugins

The configurations are already set up correctly:

### Frontend PostCSS Configuration
**File**: `frontend/postcss.config.mjs`
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### Autosite-Frontend PostCSS Configuration
**File**: `autosite-frontend/postcss.config.mjs`
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### Backend PostCSS Configuration (Tailwind CSS v3)
**File**: `backend/postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**Note**: The backend uses Tailwind CSS v3.4.18 with traditional plugins, while frontend applications use Tailwind CSS v4 with @tailwindcss/postcss.

## Running the Applications

### Frontend (Main)
```bash
cd frontend
npm run dev
# Server runs on http://localhost:3001
```

### Autosite-Frontend
```bash
cd autosite-frontend
npm run dev
# Server runs on http://localhost:3000
```

### Backend
```bash
cd backend
npm run dev
```

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Autosite-Frontend
```bash
cd autosite-frontend
npm run build
```

## Troubleshooting

### Missing Module Errors
If you encounter errors about missing modules like `@tailwindcss/postcss`, ensure you have:

1. **Installed all dependencies** in each directory as outlined above
2. **Cleared cache and rebuilt** if necessary:
   ```bash
   # For Next.js projects
   rm -rf .next
   npm run build
   ```

3. **Verified Node.js and npm versions** are compatible

### Common Issues

- **Error**: `Cannot find module '@tailwindcss/postcss'`
  - **Solution**: Run `npm install` in the respective frontend directory

- **Error**: Multiple lockfiles warning
  - **Note**: This is expected as the project has multiple frontend applications. You can ignore this warning or configure `turbopack.root` in your Next.js config.

## Project Structure

```
AUTOSITE/
├── backend/              # Backend application with Laravel
├── frontend/            # Main Next.js frontend (port 3001)
├── autosite-frontend/   # Secondary Next.js frontend (port 3000)
└── package.json         # Root dependencies
```

## Notes

- **Frontend applications** (frontend/ and autosite-frontend/) use **Tailwind CSS v4** with the `@tailwindcss/postcss` plugin
- **Backend application** uses **Tailwind CSS v3** with the traditional `tailwindcss` and `autoprefixer` plugin setup
- All dependencies are tracked via `package-lock.json` files for consistency
- Node modules are excluded from git via `.gitignore`
