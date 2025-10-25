@echo off
echo ========================================
echo   AUTOSITE - Quick Start Script
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Starting Backend Server...
start "AUTOSITE Backend" cmd /k "cd backend && php artisan serve --port=8000"
timeout /t 3 /nobreak >nul

echo [2/4] Starting Frontend Server...
start "AUTOSITE Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   AUTOSITE is starting...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://127.0.0.1:8000
echo Admin:    http://127.0.0.1:8000/admin
echo.
echo Admin Login:
echo   Email: admin@autosite.com
echo   Pass:  password
echo.
echo ========================================
echo   Press any key to open browser...
echo ========================================
pause >nul

start http://localhost:3000

echo.
echo Servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause
