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

For production deployment:

1. Set `DEBUG=False` in Django settings
2. Configure proper `ALLOWED_HOSTS`
3. Set up a production database (Neon PostgreSQL)
4. Configure static file serving
5. Set up environment variables securely
6. Build frontend apps: `npm run build`
7. Serve static files through a web server (Nginx, etc.)

## License

This project is private and proprietary.
