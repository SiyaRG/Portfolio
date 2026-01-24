# Portfolio Data Seeding Script

This script populates your Django backend with initial portfolio data so you don't have to start from scratch.

## Prerequisites

1. Django backend server must be running on `http://localhost:8000`
2. You must have created a superuser account
3. Database migrations must be run (`python manage.py migrate`)

## Usage

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install required Python package (if not already installed):
   ```bash
   pip install requests
   ```

3. Run the script:
   ```bash
   python seed_data.py
   ```

4. When prompted, enter your admin username and password (the superuser you created)

## What the Script Creates

The script will create:

1. **Profile** - Profile information with image from `frontend/public/images/Siya4.png`
2. **Social Links** - LinkedIn, GitHub, Email links with icons from `frontend/public/icons/`
3. **About Section** - Two paragraphs, highlights, and profile image from `frontend/public/images/Siya4.png`
4. **Experience Entries** - Sample work experience with items
5. **Journey Cards** - Timeline cards for your coding journey
6. **Projects** - Sample projects with achievements
7. **Skill Categories & Skills** - Frontend, Backend, Database, Tools categories with skills
8. **Education** - Sample education entries
9. **Leadership** - Leadership section with achievements
10. **Contact Information** - Email, Phone, Location (you'll be prompted to enter your actual info)

## Customization

After running the script, you should:

1. **Add Images and Update Contact Info** - Run `update_images_and_contact.py` to:
   - Upload profile images
   - Upload about images
   - Add social link icons
   - Add contact icons
   - Update URLs and contact information with your actual details
2. **Customize Content** - Edit all content through the admin CMS interface at `http://localhost:5174`
3. **Add More Data** - Use the CMS to add more experiences, projects, skills, etc.

### Quick Image Update

To add images and update contact information, run:
```bash
python update_images_and_contact.py
```

This interactive script will guide you through uploading images and updating URLs/contact info.

## Notes

- The script uses the admin API endpoints which require authentication
- All data is created with `is_active=True` by default
- You can modify the script to add more or different initial data
- If you get errors, make sure:
  - The Django server is running
  - You've run migrations
  - Your superuser credentials are correct
  - The API endpoints are accessible

## Troubleshooting

**Error: "Login failed"**
- Check your username and password
- Make sure you've created a superuser: `python manage.py createsuperuser`

**Error: "Connection refused"**
- Make sure the Django server is running: `python manage.py runserver`

**Error: "404 Not Found"**
- Make sure you've run migrations: `python manage.py migrate`
- Check that the API URLs are correct in the script

