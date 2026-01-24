"""
Quick script to test database connection.
Run this to verify your Neon database connection is working.
"""
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_cms.settings')
django.setup()

from django.db import connection

try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        print("✅ Database connection successful!")
        print(f"Database: {connection.settings_dict['NAME']}")
        print(f"Host: {connection.settings_dict['HOST']}")
        print(f"User: {connection.settings_dict['USER']}")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    print("\nPlease check:")
    print("1. Your .env file exists in the backend/ directory")
    print("2. DATABASE_URL is set correctly (or DB_NAME, DB_USER, etc.)")
    print("3. Your Neon database is active")
    sys.exit(1)

