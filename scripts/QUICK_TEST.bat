@echo off
echo ================================
echo AUTOSITE - Quick Test Script
echo ================================
echo.

echo [1/5] Checking Admin User...
php artisan tinker --execute="echo App\Models\User::where('email', 'admin@autosite.com')->first() ? 'Admin exists!' : 'Admin not found!'"
echo.

echo [2/5] Checking Database Tables...
php artisan db:show --database=mysql
echo.

echo [3/5] Listing API Routes...
php artisan route:list --path=api --columns=method,uri,name | findstr /C:"vehicle-configurations" /C:"bookings" /C:"chat"
echo.

echo [4/5] Running Application...
echo Starting Laravel server on http://localhost:8000
echo Press Ctrl+C to stop
echo.
start http://localhost:8000
php artisan serve

pause
