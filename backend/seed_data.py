#!/usr/bin/env python
"""
Script to seed initial portfolio data to the Django backend API.
Run this after creating a superuser and setting up the database.

Make sure the Django server is running on http://localhost:8000

Usage:
    python seed_data.py
"""

import requests
import json
import sys
import os

# Configuration
BASE_URL = "http://localhost:8000/api"
FRONTEND_PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "public")

ADMIN_USERNAME = input("Enter admin username: ").strip()
ADMIN_PASSWORD = input("Enter admin password: ").strip()

# Login and get token
def login():
    """Login and get JWT token"""
    response = requests.post(
        f"{BASE_URL}/auth/login/",
        json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
    )
    if response.status_code != 200:
        print(f"Login failed: {response.text}")
        sys.exit(1)
    data = response.json()
    return data['access']

# Get headers with auth token
def get_headers(token):
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

# Get headers for file uploads
def get_headers_multipart(token):
    return {
        "Authorization": f"Bearer {token}"
    }

def get_data(url, token):
    """GET data from API"""
    headers = get_headers(token)
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return None

def post_with_image(url, token, data_dict, image_field_name, image_path):
    """POST data with image file"""
    headers = get_headers_multipart(token)
    
    files = {}
    data = {}
    
    if image_path and os.path.exists(image_path):
        # Determine content type
        ext = os.path.splitext(image_path)[1].lower()
        content_type = 'image/jpeg' if ext in ['.jpg', '.jpeg'] else \
                      'image/png' if ext == '.png' else \
                      'image/gif' if ext == '.gif' else \
                      'image/svg+xml' if ext == '.svg' else \
                      'image/webp' if ext == '.webp' else 'image/jpeg'
        
        files[image_field_name] = (os.path.basename(image_path), open(image_path, 'rb'), content_type)
        print(f"  ✓ Uploading image: {os.path.basename(image_path)}")
    elif image_path:
        print(f"  ⚠ Image not found: {image_path}, creating without image")
    
    # Add other fields
    for key, value in data_dict.items():
        if value is not None:
            if isinstance(value, (list, dict)):
                data[key] = json.dumps(value)
            else:
                data[key] = str(value)
    
    response = requests.post(url, headers=headers, data=data, files=files if files else None)
    
    if files:
        files[image_field_name][1].close()  # Close the file
    
    if response.status_code in [200, 201]:
        print(f"✓ Successfully created: {url}")
        return response.json()
    else:
        print(f"✗ Failed to create {url}: {response.status_code} - {response.text}")
        return None

def post_data(url, token, data, is_multipart=False, check_existing=False):
    """POST data to API, optionally checking for existing data first"""
    if check_existing:
        # Check if data already exists
        existing = get_data(url, token)
        if existing and 'results' in existing and len(existing['results']) > 0:
            print(f"⚠ Data already exists at {url}, skipping...")
            return existing['results'][0] if existing['results'] else None
    
    if is_multipart:
        headers = get_headers_multipart(token)
        response = requests.post(url, headers=headers, files=data)
    else:
        headers = get_headers(token)
        response = requests.post(url, headers=headers, json=data)
    
    if response.status_code in [200, 201]:
        print(f"✓ Successfully created: {url}")
        return response.json()
    else:
        print(f"✗ Failed to create {url}: {response.status_code} - {response.text}")
        return None

def main():
    print("=" * 60)
    print("Portfolio Data Seeding Script")
    print("=" * 60)
    print("\nThis script will skip creating data that already exists.")
    print("If you want to start fresh, delete existing data first through the CMS.")
    print("=" * 60)
    
    # Login
    print("\n1. Logging in...")
    token = login()
    print("✓ Login successful!")
    
    # 1. Profile with Image
    print("\n2. Creating Profile with Image...")
    profile_image_path = os.path.join(FRONTEND_PUBLIC_DIR, "images", "Siya4.png")
    profile_data = {
        "name": "Siyabonga Soko",
        "title": "Full-Stack Software Developer",
        "description": "Specialising in Django, React, and modern web technologies",
        "is_active": True
    }
    
    existing_profile = get_data(f"{BASE_URL}/admin/profile/", token)
    if existing_profile and existing_profile.get('results'):
        print("⚠ Profile already exists, skipping...")
        profile = existing_profile['results'][0]
    else:
        if os.path.exists(profile_image_path):
            profile = post_with_image(
                f"{BASE_URL}/admin/profile/",
                token,
                profile_data,
                "profile_image",
                profile_image_path
            )
        else:
            print(f"  ⚠ Profile image not found at {profile_image_path}, creating without image")
            profile = post_data(f"{BASE_URL}/admin/profile/", token, profile_data)
    
    profile_id = profile['id'] if profile else None
    
    # 2. Social Links with Icons
    print("\n3. Creating Social Links with Icons...")
    # Check existing social links
    existing_links = get_data(f"{BASE_URL}/admin/social-links/", token)
    existing_count = len(existing_links.get('results', [])) if existing_links else 0
    
    if existing_count > 0:
        print(f"⚠ Found {existing_count} existing social links, skipping creation...")
    else:
        social_links_config = [
            {
                "platform": "LinkedIn",
                "label": "LinkedIn",
                "url": "https://linkedin.com/in/yourprofile",
                "icon": os.path.join(FRONTEND_PUBLIC_DIR, "icons", "linkedin-plain.svg"),
                "order": 0,
                "is_active": True
            },
            {
                "platform": "GitHub",
                "label": "GitHub",
                "url": "https://github.com/yourusername",
                "icon": os.path.join(FRONTEND_PUBLIC_DIR, "icons", "github-original.svg"),
                "order": 1,
                "is_active": True
            },
            {
                "platform": "Email",
                "label": "Email",
                "url": "mailto:your.email@example.com",
                "icon": None,  # No email icon in icons folder
                "order": 2,
                "is_active": True
            },
        ]
        for link_config in social_links_config:
            link_data = {
                "platform": link_config["platform"],
                "label": link_config["label"],
                "url": link_config["url"],
                "order": link_config["order"],
                "is_active": link_config["is_active"]
            }
            if profile_id:
                link_data["profile"] = profile_id
            
            icon_path = link_config.get("icon")
            if icon_path and os.path.exists(icon_path):
                post_with_image(
                    f"{BASE_URL}/admin/social-links/",
                    token,
                    link_data,
                    "icon",
                    icon_path
                )
            else:
                post_data(f"{BASE_URL}/admin/social-links/", token, link_data)
    
    # 3. About with Image
    print("\n4. Creating About Section with Image...")
    about_image_path = os.path.join(FRONTEND_PUBLIC_DIR, "images", "Siya4.png")
    about_data = {
        "paragraph1": "Full-Stack Software Developer with extensive experience in web application development, specialising in <strong style='color: var(--accent)'>Django, React, Python, JavaScript</strong>, and database solutions.",
        "paragraph2": "Currently developing a comprehensive <strong style='color: var(--accent-secondary)'>Learning Management System</strong> with integrated modules, assessment systems, and RESTful APIs. Skilled in database optimisation, API development, multi-tenant architecture, and Agile methodologies with a proven track record of delivering quality solutions on schedule.",
        "highlights": [
            "Django & React Expertise",
            "Database Optimisation",
            "RESTful API Development",
            "Multi-tenant Architecture"
        ],
        "is_active": True
    }
    
    existing_about = get_data(f"{BASE_URL}/admin/about/", token)
    if existing_about and existing_about.get('results'):
        print("⚠ About section already exists, skipping...")
        about_id = existing_about['results'][0]['id'] if existing_about['results'] else None
    else:
        if os.path.exists(about_image_path):
            about = post_with_image(
                f"{BASE_URL}/admin/about/",
                token,
                about_data,
                "profile_image",
                about_image_path
            )
        else:
            print(f"  ⚠ About image not found at {about_image_path}, creating without image")
            about = post_data(f"{BASE_URL}/admin/about/", token, about_data)
        about_id = about['id'] if about else None
    
    # 4. Experience
    print("\n5. Creating Experience Entries...")
    existing_experiences = get_data(f"{BASE_URL}/admin/experience/", token)
    existing_exp_count = len(existing_experiences.get('results', [])) if existing_experiences else 0
    
    if existing_exp_count > 0:
        print(f"⚠ Found {existing_exp_count} existing experience entries, skipping creation...")
        experience_ids = [exp['id'] for exp in existing_experiences.get('results', [])]
    else:
        experiences = [
            {
                "title": "Full-Stack Developer",
                "company": "Your Company",
                "start_date": "January 2023",
                "end_date": "",
                "is_current": True,
                "order": 0,
                "is_active": True
            },
            {
                "title": "Software Developer",
                "company": "Previous Company",
                "start_date": "June 2021",
                "end_date": "December 2022",
                "is_current": False,
                "order": 1,
                "is_active": True
            }
        ]
        experience_ids = []
        for exp in experiences:
            experience = post_data(f"{BASE_URL}/admin/experience/", token, exp)
            if experience:
                experience_ids.append(experience['id'])
                
                # Add experience items
                items = [
                    {"text": "Developed and maintained web applications using Django and React", "order": 0},
                    {"text": "Implemented RESTful APIs and database optimisations", "order": 1},
                    {"text": "Collaborated with cross-functional teams using Agile methodologies", "order": 2},
                ]
                for item in items:
                    item["experience"] = experience['id']
                    post_data(f"{BASE_URL}/admin/experience-items/", token, item)
    
    # 5. Journey Cards
    print("\n6. Creating Journey Cards...")
    existing_cards = get_data(f"{BASE_URL}/admin/journey-cards/", token)
    existing_card_count = len(existing_cards.get('results', [])) if existing_cards else 0
    
    if existing_card_count > 0:
        print(f"⚠ Found {existing_card_count} existing journey cards, skipping creation...")
    else:
        journey_cards = [
            {
                "year": "2018",
                "text": "First line of code",
                "image_url": "/icons/html5-plain.svg",
                "order": 0,
                "is_active": True
            },
            {
                "year": "2022",
                "text": "DSA, C#/.NET/MS SQL Server, XML, Python, UML, git",
                "image_url": "/icons/dot-net-plain.svg",
                "order": 1,
                "is_active": True
            },
            {
                "year": "2023",
                "text": "SDLC, React, Next, Express, REST, MongoDB",
                "image_url": "/icons/react-original.svg",
                "order": 2,
                "is_active": True
            },
            {
                "year": "2024",
                "text": "UX/UI DjangoORM MySQL",
                "image_url": "/icons/python-plain.svg",
                "order": 3,
                "is_active": True
            }
        ]
        for card in journey_cards:
            post_data(f"{BASE_URL}/admin/journey-cards/", token, card)
    
    # 6. Projects
    print("\n7. Creating Projects...")
    existing_projects = get_data(f"{BASE_URL}/admin/projects/", token)
    existing_proj_count = len(existing_projects.get('results', [])) if existing_projects else 0
    
    if existing_proj_count > 0:
        print(f"⚠ Found {existing_proj_count} existing projects, skipping creation...")
        project_ids = [proj['id'] for proj in existing_projects.get('results', [])]
    else:
        projects = [
            {
                "title": "Learning Management System",
                "technologies": ["Django", "React", "PostgreSQL", "REST API"],
                "order": 0,
                "is_active": True
            },
            {
                "title": "E-Commerce Platform",
                "technologies": ["Django", "React", "MySQL", "Stripe API"],
                "order": 1,
                "is_active": True
            },
            {
                "title": "Portfolio Website",
                "technologies": ["React", "TypeScript", "Vite", "Framer Motion"],
                "order": 2,
                "is_active": True
            }
        ]
        project_ids = []
        for project in projects:
            proj = post_data(f"{BASE_URL}/admin/projects/", token, project)
            if proj:
                project_ids.append(proj['id'])
                
                # Add project achievements
                achievements = [
                    {"text": "Implemented responsive design with modern UI/UX", "order": 0},
                    {"text": "Optimised performance and SEO", "order": 1},
                    {"text": "Integrated with backend API", "order": 2},
                ]
                for achievement in achievements:
                    achievement["project"] = proj['id']
                    post_data(f"{BASE_URL}/admin/project-achievements/", token, achievement)
    
    # 7. Skills
    print("\n8. Creating Skill Categories and Skills...")
    existing_categories = get_data(f"{BASE_URL}/admin/skill-categories/", token)
    existing_cat_count = len(existing_categories.get('results', [])) if existing_categories else 0
    
    if existing_cat_count > 0:
        print(f"⚠ Found {existing_cat_count} existing skill categories, skipping creation...")
        category_ids = [cat['id'] for cat in existing_categories.get('results', [])]
    else:
        skill_categories = [
            {
                "name": "frontend",
                "display_name": "Frontend",
                "order": 0,
                "is_active": True
            },
            {
                "name": "backend",
                "display_name": "Backend",
                "order": 1,
                "is_active": True
            },
            {
                "name": "database",
                "display_name": "Database",
                "order": 2,
                "is_active": True
            },
            {
                "name": "tools",
                "display_name": "Tools & Others",
                "order": 3,
                "is_active": True
            }
        ]
        category_ids = []
        for category in skill_categories:
            cat = post_data(f"{BASE_URL}/admin/skill-categories/", token, category)
            if cat:
                category_ids.append(cat['id'])
    
    # Add skills to categories (only if categories exist)
    existing_skills = get_data(f"{BASE_URL}/admin/skills/", token)
    existing_skill_count = len(existing_skills.get('results', [])) if existing_skills else 0
    
    if existing_skill_count > 0:
        print(f"⚠ Found {existing_skill_count} existing skills, skipping creation...")
    elif category_ids:
        skills_data = [
            {"name": "React", "category": category_ids[0] if category_ids else None, "order": 0, "is_active": True},
            {"name": "TypeScript", "category": category_ids[0] if category_ids else None, "order": 1, "is_active": True},
            {"name": "JavaScript", "category": category_ids[0] if category_ids else None, "order": 2, "is_active": True},
            {"name": "HTML/CSS", "category": category_ids[0] if category_ids else None, "order": 3, "is_active": True},
            {"name": "Django", "category": category_ids[1] if len(category_ids) > 1 else None, "order": 0, "is_active": True},
            {"name": "Python", "category": category_ids[1] if len(category_ids) > 1 else None, "order": 1, "is_active": True},
            {"name": "REST API", "category": category_ids[1] if len(category_ids) > 1 else None, "order": 2, "is_active": True},
            {"name": "Node.js", "category": category_ids[1] if len(category_ids) > 1 else None, "order": 3, "is_active": True},
            {"name": "PostgreSQL", "category": category_ids[2] if len(category_ids) > 2 else None, "order": 0, "is_active": True},
            {"name": "MySQL", "category": category_ids[2] if len(category_ids) > 2 else None, "order": 1, "is_active": True},
            {"name": "MongoDB", "category": category_ids[2] if len(category_ids) > 2 else None, "order": 2, "is_active": True},
            {"name": "Git", "category": category_ids[3] if len(category_ids) > 3 else None, "order": 0, "is_active": True},
            {"name": "Docker", "category": category_ids[3] if len(category_ids) > 3 else None, "order": 1, "is_active": True},
            {"name": "AWS", "category": category_ids[3] if len(category_ids) > 3 else None, "order": 2, "is_active": True},
        ]
        for skill in skills_data:
            if skill["category"]:
                post_data(f"{BASE_URL}/admin/skills/", token, skill)
    
    # 8. Education
    print("\n9. Creating Education Entries...")
    existing_education = get_data(f"{BASE_URL}/admin/education/", token)
    existing_edu_count = len(existing_education.get('results', [])) if existing_education else 0
    
    if existing_edu_count > 0:
        print(f"⚠ Found {existing_edu_count} existing education entries, skipping creation...")
    else:
        education_data = [
            {
                "degree": "Bachelor of Science in Computer Science",
                "institution": "Your University",
                "location": "City, Country",
                "start_period": "2018",
                "end_period": "2022",
                "is_current": False,
                "note": "Graduated with honors",
                "order": 0,
                "is_active": True
            },
            {
                "degree": "Master of Science in Software Engineering",
                "institution": "Your University",
                "location": "City, Country",
                "start_period": "2022",
                "end_period": "",
                "is_current": True,
                "note": "",
                "order": 1,
                "is_active": True
            }
        ]
        for edu in education_data:
            post_data(f"{BASE_URL}/admin/education/", token, edu)
    
    # 9. Leadership
    print("\n10. Creating Leadership Section...")
    leadership_data = {
        "title": "Technical Leadership & Mentoring",
        "period": "2024--Present",
        "is_active": True
    }
    leadership = post_data(f"{BASE_URL}/admin/leadership/", token, leadership_data, check_existing=True)
    leadership_id = leadership['id'] if leadership else None
    
    if leadership_id:
        achievements = [
            {"text": "Led a team of 5 developers in building a scalable web application", "order": 0},
            {"text": "Mentored junior developers in best practices and code reviews", "order": 1},
            {"text": "Established coding standards and development workflows", "order": 2},
            {"text": "Organised technical workshops and knowledge sharing sessions", "order": 3},
        ]
        for achievement in achievements:
            achievement["leadership"] = leadership_id
            post_data(f"{BASE_URL}/admin/leadership-achievements/", token, achievement)
    
    # 10. Contact Info
    print("\n11. Creating Contact Information...")
    existing_contacts = get_data(f"{BASE_URL}/admin/contact/", token)
    existing_contact_count = len(existing_contacts.get('results', [])) if existing_contacts else 0
    
    if existing_contact_count > 0:
        print(f"⚠ Found {existing_contact_count} existing contact entries, skipping creation...")
    else:
        print("\nPlease enter your contact information (or press Enter to use defaults):")
        email = input("Email address: ").strip() or "your.email@example.com"
        phone = input("Phone number (or press Enter to skip): ").strip()
        location = input("Location (or press Enter to skip): ").strip()
        
        contact_data = []
        
        if email:
            contact_data.append({
                "label": "Email",
                "value": email,
                "url": f"mailto:{email}",
                "order": 0,
                "is_active": True
            })
        
        if phone:
            # Clean phone number for tel: link
            phone_clean = phone.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')
            contact_data.append({
                "label": "Phone",
                "value": phone,
                "url": f"tel:{phone_clean}",
                "order": 1,
                "is_active": True
            })
        
        if location:
            contact_data.append({
                "label": "Location",
                "value": location,
                "order": 2,
                "is_active": True
            })
        
        for contact in contact_data:
            # Remove url field if it's empty or None (icon is ImageField, so we omit it)
            if "url" in contact and (not contact["url"] or contact["url"] == ""):
                contact.pop("url", None)
            post_data(f"{BASE_URL}/admin/contact/", token, contact)
    
    print("\n" + "=" * 60)
    print("Data seeding completed!")
    print("=" * 60)
    print("\nNote: You may still need to update:")
    print("  - Social link URLs with your actual profiles")
    print("  - Contact icons if desired (use update_images_and_contact.py)")
    print("\nAll images from frontend/public have been uploaded.")

if __name__ == "__main__":
    main()

