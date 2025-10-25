@echo off
title AUTOSITE - Final Verification Check
color 0A

echo ========================================
echo    AUTOSITE FINAL VERIFICATION CHECK
echo ========================================
echo.

echo [1/5] Checking PHP Environment...
cd backend
php --version | findstr /C:"PHP 8"
if %errorlevel% neq 0 (
    echo [ERROR] PHP 8+ not found!
    pause
    exit /b 1
)
echo [OK] PHP Environment Ready
echo.

echo [2/5] Checking Database...
if exist "database\database.sqlite" (
    echo [OK] Database file exists
) else (
    echo [ERROR] Database missing! Run: php artisan migrate --seed
    pause
    exit /b 1
)
echo.

echo [3/5] Checking Backend Dependencies...
if exist "vendor\autoload.php" (
    echo [OK] Composer dependencies installed
) else (
    echo [WARN] Running composer install...
    composer install --quiet
)
echo.

echo [4/5] Checking Frontend...
cd ..\frontend
if exist "node_modules" (
    echo [OK] Node modules installed
) else (
    echo [ERROR] Frontend dependencies missing! Run: npm install
    pause
    exit /b 1
)
echo.

echo [5/5] Checking Environment Files...
cd ..\backend
if exist ".env" (
    echo [OK] Backend .env exists
) else (
    echo [WARN] Backend .env missing - copying from .env.example
    copy .env.example .env
    php artisan key:generate
)
cd ..\frontend
if exist ".env.local" (
    echo [OK] Frontend .env.local exists
) else (
    echo [WARN] Frontend .env.local missing
)
cd ..
echo.

echo ========================================
echo           VERIFICATION COMPLETE!
echo ========================================
echo.
echo STATUS: ALL SYSTEMS READY
echo.
echo To start the project:
echo   1. Double-click START.bat
echo   2. Open http://localhost:3000
echo.
echo ========================================
pause
