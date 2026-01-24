# Render Deployment Guide

## Media Files on Render

**Important:** Render's filesystem is **ephemeral**, meaning:
- Files uploaded during local development won't exist on Render
- Files uploaded after deployment will persist until the service restarts
- For production, you should use cloud storage (AWS S3, Cloudinary, etc.)

## Current Configuration

The backend is now configured to serve media files in production. However, you need to:

### Option 1: Re-upload Media Files (Quick Fix)

After deploying to Render:

1. **Access your admin CMS** at `https://your-admin-app.vercel.app` (or wherever it's deployed)
2. **Log in** with your superuser credentials
3. **Re-upload all media files**:
   - Profile images
   - About section images
   - Social link icons
   - Contact icons
   - Resume files

**Note:** These files will persist until the service restarts. For permanent storage, use Option 2.

### Option 2: Use Cloud Storage (Recommended for Production)

For production, configure cloud storage:

#### AWS S3 Setup

1. **Install django-storages:**
   ```bash
   pip install django-storages boto3
   ```

2. **Add to requirements.txt:**
   ```
   django-storages>=1.14.0
   boto3>=1.34.0
   ```

3. **Update settings.py:**
   ```python
   # Add to INSTALLED_APPS
   'storages',
   
   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
   AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
   AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
   AWS_S3_REGION_NAME = os.getenv('AWS_S3_REGION_NAME', 'us-east-1')
   AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
   AWS_S3_OBJECT_PARAMETERS = {
       'CacheControl': 'max-age=86400',
   }
   
   # Use S3 for media files
   DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
   MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'
   ```

4. **Set environment variables in Render:**
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_STORAGE_BUCKET_NAME`
   - `AWS_S3_REGION_NAME`

#### Cloudinary Setup (Alternative)

1. **Install cloudinary:**
   ```bash
   pip install django-cloudinary-storage
   ```

2. **Add to requirements.txt:**
   ```
   django-cloudinary-storage>=0.3.0
   ```

3. **Update settings.py:**
   ```python
   # Add to INSTALLED_APPS
   'cloudinary_storage',
   'cloudinary',
   
   # Cloudinary Configuration
   CLOUDINARY_STORAGE = {
       'CLOUD_NAME': os.getenv('CLOUDINARY_CLOUD_NAME'),
       'API_KEY': os.getenv('CLOUDINARY_API_KEY'),
       'API_SECRET': os.getenv('CLOUDINARY_API_SECRET'),
   }
   
   DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
   ```

## Static Files

Static files are handled by WhiteNoise and will be collected during the build process.

## Build Command for Render

```bash
cd backend && pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
```

## Start Command for Render

```bash
cd backend && gunicorn portfolio_cms.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120
```

## Environment Variables for Render

Set these in the Render dashboard:

```env
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=portfolio-bvn6.onrender.com,yourdomain.com
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com

# Contact Form
CONTACT_API_KEY=your-secure-api-key
CONTACT_EMAIL_RATE_LIMIT_MINUTES=5
CONTACT_EMAIL_RATE_LIMIT_COUNT=1
```

## Troubleshooting

**Media files return 404:**
- Files need to be re-uploaded after deployment (Render's filesystem is ephemeral)
- Check that `MEDIA_ROOT` directory exists
- Verify file permissions

**Static files not loading:**
- Run `python manage.py collectstatic` in the build command
- Check WhiteNoise middleware is in MIDDLEWARE list
- Verify STATIC_ROOT is set correctly

