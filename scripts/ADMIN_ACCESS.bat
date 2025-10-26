@echo off
title AUTOSITE - Admin Panel Access
color 0B

echo ========================================
echo      AUTOSITE ADMIN PANEL INFO
echo ========================================
echo.
echo Admin credentials created successfully!
echo.
echo ----------------------------------------
echo   ADMIN LOGIN DETAILS
echo ----------------------------------------
echo.
echo URL:      http://127.0.0.1:8000/admin
echo Email:    admin@autosite.com
echo Password: password
echo.
echo ----------------------------------------
echo   QUICK ACTIONS
echo ----------------------------------------
echo.
echo 1. Make sure backend is running:
echo    cd backend
echo    php artisan serve --port=8000
echo.
echo 2. Open admin panel in browser:
echo    http://127.0.0.1:8000/admin
echo.
echo 3. Login with credentials above
echo.
echo ========================================
echo.
echo Press any key to open admin panel...
pause >nul

start http://127.0.0.1:8000/admin

echo.
echo Admin panel opened in browser!
echo.
pause
