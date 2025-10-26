@echo off
echo ========================================
echo   AUTOSITE - Quick Start Script
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Starting Backend Server...
start "AUTOSITE Backend" cmd /k "php artisan serve --host=127.0.0.1 --port=8000"
timeout /t 3 /nobreak >nul

echo [2/4] Starting WebSocket Server...
start "AUTOSITE WebSocket" cmd /k "php artisan reverb:start --host=0.0.0.0 --port=8080"
timeout /t 3 /nobreak >nul

echo [3/4] Starting Frontend Server...
start "AUTOSITE Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   AUTOSITE is starting...
echo ========================================
echo.
echo Frontend:  http://localhost:3001
echo Backend:   http://127.0.0.1:8000
echo Admin:     http://127.0.0.1:8000/admin
echo WebSocket: ws://127.0.0.1:8080
echo API Docs:  http://127.0.0.1:8000/api/documentation
echo.
echo Admin Login:
echo   Email: admin@autosite.com
echo   Pass:  password
echo.
echo ========================================
echo   Press any key to open browser...
echo ========================================
pause >nul

start http://localhost:3001

echo.
echo Servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause
