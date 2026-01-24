# Database Setup Guide - Neon PostgreSQL

This guide will help you set up your Neon PostgreSQL database for the Portfolio CMS project.

## Step 1: Create a Neon Account

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up for a free account (or log in if you already have one)
3. Neon offers a free tier that's perfect for development

## Step 2: Create a New Project

1. Once logged in, click **"Create a project"**
2. Choose a project name (e.g., "portfolio-cms")
3. Select a region closest to you
4. Choose PostgreSQL version (15 or 16 recommended)
5. Click **"Create project"**

## Step 3: Get Your Connection String

After creating the project, Neon will provide you with a connection string. You have two options:

### Option A: Use Connection String (Recommended)

Neon provides a connection string that looks like:
```
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
```

### Option B: Use Individual Parameters

You can also extract the individual components:
- **Host**: `ep-xxx-xxx.region.aws.neon.tech`
- **Database**: `neondb` (or your database name)
- **User**: Your username
- **Password**: Your password
- **Port**: `5432`

## Step 4: Configure Django Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file in the `backend` directory:
   ```bash
   # Windows
   type nul > .env
   
   # Linux/Mac
   touch .env
   ```

3. Open the `.env` file and add your database credentials:

   **If using individual parameters:**
   ```env
   SECRET_KEY=your-django-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1

   DB_NAME=neondb
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_HOST=ep-xxx-xxx.region.aws.neon.tech
   DB_PORT=5432
   ```

   **If using connection string:**
   ```env
   SECRET_KEY=your-django-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1

   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

   **Note:** Generate a Django secret key:
   ```python
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

## Step 5: Update Django Settings (if using connection string)

If you prefer using the connection string, you'll need to update `backend/portfolio_cms/settings.py` to parse it. However, the current setup uses individual parameters, which is simpler.

## Step 6: Test the Connection

1. Activate your virtual environment:
   ```bash
   # Windows
   .\venv\Scripts\Activate.ps1
   
   # Linux/Mac
   source venv/bin/activate
   ```

2. Run migrations to create the database tables:
   ```bash
   python manage.py migrate
   ```

   If this succeeds, your database connection is working!

3. Create a superuser for admin access:
   ```bash
   python manage.py createsuperuser
   ```

   Follow the prompts to create your admin account.

## Step 7: Verify Connection

You can verify your connection by:

1. Starting the Django server:
   ```bash
   python manage.py runserver
   ```

2. Accessing the Django admin panel:
   - Go to `http://localhost:8000/admin/`
   - Log in with your superuser credentials
   - You should see all the portfolio models

## Troubleshooting

### Connection Refused

- **Check your firewall**: Ensure port 5432 is not blocked
- **Verify credentials**: Double-check your username, password, and host
- **Check SSL mode**: Neon requires SSL, ensure `sslmode=require` is set

### Authentication Failed

- **Reset password**: In Neon console, go to your project → Settings → Reset password
- **Check username**: Ensure you're using the correct username (not your Neon account email)

### Database Does Not Exist

- **Create database**: In Neon console, you can create additional databases if needed
- **Check database name**: Default is usually `neondb` or `postgres`

### SSL Connection Error

- **Update settings**: Ensure `'sslmode': 'require'` is in your database OPTIONS
- **Check connection string**: If using connection string, ensure `?sslmode=require` is included

## Using SQLite for Development (Alternative)

If you want to skip Neon setup for now and use SQLite (local file database):

1. **Don't create a `.env` file** (or leave DB_NAME empty)
2. Django will automatically use SQLite (`db.sqlite3` file)
3. This is fine for local development but not recommended for production

## Next Steps

After setting up the database:

1. **Seed initial data** (optional): You can manually add data through the admin panel
2. **Start the backend server**: `python manage.py runserver`
3. **Start the frontend**: `cd frontend && npm run dev`
4. **Start the admin panel**: `cd admin && npm run dev`

## Security Notes

- **Never commit `.env` file**: It's already in `.gitignore`
- **Use environment variables in production**: Don't hardcode credentials
- **Rotate passwords regularly**: Especially in production
- **Use strong passwords**: For both Neon and Django admin

## Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Django Database Configuration](https://docs.djangoproject.com/en/stable/ref/settings/#databases)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

