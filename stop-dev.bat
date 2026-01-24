@echo off
echo Stopping all development servers...
echo.

REM Kill Django server (port 8000)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    echo Stopping Django Backend (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

REM Kill Vite servers (ports 5173 and 5174)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do (
    echo Stopping Public Frontend (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5174 ^| findstr LISTENING') do (
    echo Stopping Admin CMS (PID: %%a)...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo All servers stopped!
timeout /t 2 /nobreak >nul

