@echo off
echo ========================================
echo Starting Portfolio CMS Development Servers
echo ========================================
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo ERROR: backend directory not found!
    pause
    exit /b 1
)

REM Check if frontend directory exists
if not exist "frontend" (
    echo ERROR: frontend directory not found!
    pause
    exit /b 1
)

REM Check if admin directory exists
if not exist "admin" (
    echo ERROR: admin directory not found!
    pause
    exit /b 1
)

echo [1/3] Starting Django Backend Server...
cd backend
if exist "venv\Scripts\activate.bat" (
    start "Django Backend - Port 8000" cmd /k "venv\Scripts\activate.bat && python manage.py runserver"
) else (
    echo WARNING: Virtual environment not found. Starting without venv...
    start "Django Backend - Port 8000" cmd /k "python manage.py runserver"
)
cd ..

timeout /t 2 /nobreak >nul

echo [2/3] Starting Public Frontend Server...
cd frontend
if exist "node_modules" (
    start "Public Frontend - Port 5173" cmd /k "npm run dev"
) else (
    echo WARNING: node_modules not found. Installing dependencies first...
    call npm install
    start "Public Frontend - Port 5173" cmd /k "npm run dev"
)
cd ..

timeout /t 2 /nobreak >nul

echo [3/3] Starting Admin CMS Server...
cd admin
if exist "node_modules" (
    start "Admin CMS - Port 5174" cmd /k "npm run dev"
) else (
    echo WARNING: node_modules not found. Installing dependencies first...
    call npm install
    start "Admin CMS - Port 5174" cmd /k "npm run dev"
)
cd ..

echo.
echo ========================================
echo All servers are starting!
echo ========================================
echo.
echo Backend API:    http://localhost:8000
echo Public Site:    http://localhost:5173
echo Admin CMS:      http://localhost:5174
echo Django Admin:   http://localhost:8000/admin
echo.
echo Press any key to close this window (servers will keep running)...
pause >nul

