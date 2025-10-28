#!/bin/bash

# AUTOSITE - Setup Verification Script
# Checks if everything is configured correctly

echo "========================================="
echo "  AUTOSITE - Setup Verification"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check backend
echo "Checking Backend..."
echo "-------------------"

if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC} backend/.env exists"
else
    echo -e "${RED}✗${NC} backend/.env missing"
    echo "  Run: cd backend && cp .env.example .env"
fi

if [ -d "backend/vendor" ]; then
    echo -e "${GREEN}✓${NC} backend/vendor exists (composer installed)"
else
    echo -e "${RED}✗${NC} backend/vendor missing"
    echo "  Run: cd backend && composer install"
fi

if [ -f "backend/database/database.sqlite" ]; then
    echo -e "${GREEN}✓${NC} backend/database/database.sqlite exists"
else
    echo -e "${RED}✗${NC} backend/database/database.sqlite missing"
    echo "  Run: cd backend && touch database/database.sqlite && php artisan migrate:fresh --seed"
fi

echo ""

# Check frontend
echo "Checking Frontend..."
echo "--------------------"

if [ -f "frontend/.env.local" ]; then
    echo -e "${GREEN}✓${NC} frontend/.env.local exists"
else
    echo -e "${YELLOW}⚠${NC} frontend/.env.local missing (optional)"
    echo "  Run: cd frontend && cp .env.example .env.local"
fi

if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} frontend/node_modules exists (npm installed)"
else
    echo -e "${RED}✗${NC} frontend/node_modules missing"
    echo "  Run: cd frontend && npm install"
fi

echo ""

# Check documentation
echo "Checking Documentation..."
echo "-------------------------"

DOCS=("README.md" "README_QUICK.md" "MVP_COMPLETE.md" "TESTING_GUIDE.md" "STATUS_FINAL.md" "START.bat")

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc exists"
    else
        echo -e "${RED}✗${NC} $doc missing"
    fi
done

echo ""
echo "========================================="
echo "  Verification Complete!"
echo "========================================="
echo ""
echo "If all checks passed, you can start the servers:"
echo "  Windows: Double-click START.bat"
echo "  Linux/Mac: Run backend and frontend manually"
echo ""
