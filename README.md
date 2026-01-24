# Portfolio CMS

A full-stack portfolio website with a Django REST API backend and React frontends for both public display and content management.

## Project Structure

```
Portfolio/
├── backend/              # Django REST API
│   ├── api/              # API app with models, views, serializers
│   ├── portfolio_cms/    # Django project settings
│   ├── manage.py
│   └── requirements.txt
├── frontend/             # Public portfolio React app
│   ├── src/
│   └── package.json
├── admin/                # Admin CMS React app
│   ├── src/
│   └── package.json
└── README.md
```

## Features

- **Django REST API** with PostgreSQL (Neon) database
- **JWT Authentication** for admin access
- **Public Portfolio Frontend** - Displays portfolio content from API
- **Admin CMS Frontend** - Content management interface
- **Full CRUD operations** for all portfolio sections:
  - Profile/Home
  - About
  - Experience
  - Projects
  - Skills
  - Education
  - Leadership
  - Contact

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 18+
- Neon PostgreSQL database (or use SQLite for development)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\Activate.ps1
   # Linux/Mac
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` directory:
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1

   # Neon PostgreSQL Database
   DB_NAME=your-database-name
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_HOST=your-neon-host.neon.tech
   DB_PORT=5432
   ```

   **Note:** If you don't have Neon credentials yet, the app will fall back to SQLite for development.

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

7. Start the development server:
   ```bash
   python manage.py runserver
   ```

   The API will be available at `http://localhost:8000/api/`

### Frontend Setup (Public Portfolio)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional):
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### Admin CMS Setup

1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional):
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The admin panel will be available at `http://localhost:5174` (or next available port)

## API Endpoints

### Public Endpoints (No Authentication Required)

- `GET /api/public/profile/` - Get profile information
- `GET /api/public/social-links/` - Get social media links
- `GET /api/public/about/` - Get about section
- `GET /api/public/experience/` - Get work experience
- `GET /api/public/journey-cards/` - Get journey summary cards
- `GET /api/public/projects/` - Get projects
- `GET /api/public/skill-categories/` - Get skills by category
- `GET /api/public/education/` - Get education entries
- `GET /api/public/leadership/` - Get leadership section
- `GET /api/public/contact/` - Get contact information
- `POST /api/public/send-email/` - Send contact form email (requires X-API-Key header)

### Admin Endpoints (JWT Authentication Required)

- `POST /api/auth/login/` - Login and get JWT tokens
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/admin/profile/` - List/Create/Update/Delete profile
- `GET /api/admin/social-links/` - Manage social links
- `GET /api/admin/about/` - Manage about section
- `GET /api/admin/experience/` - Manage experience entries
- `GET /api/admin/projects/` - Manage projects
- `GET /api/admin/skill-categories/` - Manage skill categories
- `GET /api/admin/education/` - Manage education entries
- `GET /api/admin/leadership/` - Manage leadership section
- `GET /api/admin/contact/` - Manage contact information

## Usage

1. **Start the backend server** (port 8000)
2. **Start the public frontend** (port 5173)
3. **Start the admin frontend** (port 5174)
4. **Access the admin panel** at `http://localhost:5174/login`
5. **Log in** with your superuser credentials
6. **Manage content** through the admin interface
7. **View changes** on the public portfolio at `http://localhost:5173`

## Database Models

The following models are available:

- `Profile` - Home section data
- `SocialLink` - Social media links
- `About` - About section content
- `Experience` - Work experience entries
- `ExperienceItem` - Bullet points for experiences
- `JourneyCard` - Journey summary cards
- `Project` - Project entries
- `ProjectAchievement` - Project achievements
- `SkillCategory` - Skill categories
- `Skill` - Individual skills
- `Education` - Education entries
- `Leadership` - Leadership section
- `LeadershipAchievement` - Leadership achievements
- `ContactInfo` - Contact information

## Development Notes

- The public frontend components need to be updated to fetch data from the API instead of using hardcoded values
- The admin frontend provides basic CRUD operations; full form implementations can be added as needed
- Media files (images) are stored in `backend/media/` directory
- CORS is configured to allow requests from localhost during development

## Production Deployment

### Environment Variables

All backend endpoints are configured via environment variables. No hardcoded URLs are used in the codebase.

#### Backend Environment Variables (`backend/.env`)

```env
# Django Settings
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
# OR use individual settings:
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_HOST=your-neon-host.neon.tech
DB_PORT=5432

# Email Configuration (for contact form)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com

# Contact Form API Key (generate a secure random string)
CONTACT_API_KEY=your-secure-api-key-here

# Rate Limiting (optional)
CONTACT_EMAIL_RATE_LIMIT_MINUTES=5
CONTACT_EMAIL_RATE_LIMIT_COUNT=1
```

#### Frontend Environment Variables (`frontend/.env`)

```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_CONTACT_API_KEY=your-secure-api-key-here
```

#### Admin CMS Environment Variables (`admin/.env`)

```env
VITE_API_URL=https://api.yourdomain.com/api
```

### Deployment Steps

#### 1. Backend Deployment (Django)

1. **Set up production environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or .\venv\Scripts\Activate.ps1  # Windows
   pip install -r requirements.txt
   ```

2. **Configure environment variables:**
   - Create `.env` file with production values (see above)
   - **Never commit `.env` files to version control**

3. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Collect static files:**
   ```bash
   python manage.py collectstatic --noinput
   ```

5. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

6. **Deploy using your preferred method:**
   - **Option A: Using Gunicorn + Nginx**
     ```bash
     pip install gunicorn
     gunicorn portfolio_cms.wsgi:application --bind 0.0.0.0:8000
     ```
   - **Option B: Using Waitress (Windows-friendly)**
     ```bash
     pip install waitress
     waitress-serve --port=8000 portfolio_cms.wsgi:application
     ```
   - **Option C: Using Docker**
     - Create a `Dockerfile` and `docker-compose.yml`
     - Build and run containers

7. **Configure Nginx** (if using):
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       location /media/ {
           alias /path/to/backend/media/;
       }

       location /static/ {
           alias /path/to/backend/static/;
       }
   }
   ```

8. **Set up SSL/HTTPS** (recommended):
   - Use Let's Encrypt with Certbot
   - Configure Nginx for HTTPS

#### 2. Frontend Deployment (Public Portfolio)

1. **Build the production bundle:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy the `dist/` folder:**
   - **Option A: Static hosting (Vercel, Netlify, GitHub Pages)**
     - Connect your repository
     - Set build command: `npm run build`
     - Set publish directory: `dist`
     - Add environment variables in hosting platform settings
   
   - **Option B: Nginx**
     ```nginx
     server {
         listen 80;
         server_name yourdomain.com;

         root /path/to/frontend/dist;
         index index.html;

         location / {
             try_files $uri $uri/ /index.html;
         }
     }
     ```

   - **Option C: GitHub Pages**
     
     GitHub Pages doesn't support environment variables at runtime. Instead, use the `config.js` file:
     
     1. **Build the production bundle:**
        ```bash
        cd frontend
        npm install
        npm run build
        ```
     
     2. **Configure the API URL:**
        - Edit `frontend/public/config.js` and set your backend API URL:
          ```javascript
          window.__APP_CONFIG__ = {
            API_URL: 'https://your-backend-url.onrender.com/api',
            CONTACT_API_KEY: 'your-api-key-here',
          };
          ```
        - Rebuild: `npm run build`
     
     3. **Deploy to GitHub Pages:**
        - Push the `dist/` folder contents to the `gh-pages` branch, or
        - Use GitHub Actions to automate deployment
        - Configure GitHub Pages to serve from the `gh-pages` branch or `docs/` folder
     
     4. **Update config after deployment:**
        - After deployment, you can edit `config.js` directly in the deployed files
        - The app will use the updated config on the next page load
        - No rebuild required for config changes

#### 3. Admin CMS Deployment

1. **Build the production bundle:**
   ```bash
   cd admin
   npm install
   npm run build
   ```

2. **Deploy the `dist/` folder:**
   - Use the same methods as frontend
   - Deploy to a subdomain like `admin.yourdomain.com` or `cms.yourdomain.com`
   - Ensure environment variables are set correctly

### Post-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] `DEBUG=False` in production
- [ ] `ALLOWED_HOSTS` includes your domain
- [ ] Database migrations are applied
- [ ] Static files are collected and served
- [ ] Media files are accessible
- [ ] SSL/HTTPS is configured
- [ ] CORS settings allow your frontend domains
- [ ] Email service is configured and tested
- [ ] Contact form API key matches between frontend and backend
- [ ] Admin CMS is accessible and login works
- [ ] Public portfolio displays all content correctly

### Security Notes

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use strong SECRET_KEY** - Generate with: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
3. **Use HTTPS in production** - Required for secure API communication
4. **Set up proper CORS** - Only allow your frontend domains
5. **Use environment-specific settings** - Consider using `django-environ` for better environment management
6. **Regular backups** - Set up automated database backups
7. **Monitor logs** - Set up logging and monitoring for production

### Troubleshooting

**Media files not loading:**
- Check `MEDIA_URL` and `MEDIA_ROOT` settings
- Ensure media files are served correctly (Nginx configuration)
- Verify file permissions

**CORS errors:**
- Check `CORS_ALLOWED_ORIGINS` in Django settings
- Ensure frontend URL is in the allowed origins list

**API connection issues:**
- Verify `VITE_API_URL` is set correctly in frontend/admin `.env`
- Check that backend is accessible from frontend domain
- Verify SSL certificates are valid

## License

This project is private and proprietary.
