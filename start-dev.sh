#!/bin/bash

echo "========================================"
echo "Starting Portfolio CMS Development Servers"
echo "========================================"
echo ""

# Check if directories exist
if [ ! -d "backend" ]; then
    echo "ERROR: backend directory not found!"
    exit 1
fi

if [ ! -d "frontend" ]; then
    echo "ERROR: frontend directory not found!"
    exit 1
fi

if [ ! -d "admin" ]; then
    echo "ERROR: admin directory not found!"
    exit 1
fi

# Start Django Backend
echo "[1/3] Starting Django Backend Server..."
cd backend
if [ -d "venv" ]; then
    source venv/bin/activate
    python manage.py runserver &
    DJANGO_PID=$!
    echo "Django Backend started (PID: $DJANGO_PID)"
else
    echo "WARNING: Virtual environment not found. Starting without venv..."
    python manage.py runserver &
    DJANGO_PID=$!
    echo "Django Backend started (PID: $DJANGO_PID)"
fi
cd ..
sleep 2

# Start Public Frontend
echo "[2/3] Starting Public Frontend Server..."
cd frontend
if [ -d "node_modules" ]; then
    npm run dev &
    FRONTEND_PID=$!
    echo "Public Frontend started (PID: $FRONTEND_PID)"
else
    echo "WARNING: node_modules not found. Installing dependencies first..."
    npm install
    npm run dev &
    FRONTEND_PID=$!
    echo "Public Frontend started (PID: $FRONTEND_PID)"
fi
cd ..
sleep 2

# Start Admin CMS
echo "[3/3] Starting Admin CMS Server..."
cd admin
if [ -d "node_modules" ]; then
    npm run dev &
    ADMIN_PID=$!
    echo "Admin CMS started (PID: $ADMIN_PID)"
else
    echo "WARNING: node_modules not found. Installing dependencies first..."
    npm install
    npm run dev &
    ADMIN_PID=$!
    echo "Admin CMS started (PID: $ADMIN_PID)"
fi
cd ..

echo ""
echo "========================================"
echo "All servers are starting!"
echo "========================================"
echo ""
echo "Backend API:    http://localhost:8000"
echo "Public Site:    http://localhost:5173"
echo "Admin CMS:      http://localhost:5174"
echo "Django Admin:   http://localhost:8000/admin"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
trap "echo ''; echo 'Stopping all servers...'; kill $DJANGO_PID $FRONTEND_PID $ADMIN_PID 2>/dev/null; exit" INT

# Keep script running
wait

