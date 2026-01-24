#!/usr/bin/env python
"""
Script to add images and update contact information for portfolio data.
This script helps you:
  - Upload profile image
  - Upload about profile image
  - Upload social link icons
  - Upload contact icons
  - Update URLs and contact information

Make sure the Django server is running on http://localhost:8000

Usage:
    python update_images_and_contact.py
"""

import requests
import json
import sys
import os

# Configuration
BASE_URL = "http://localhost:8000/api"

# Login and get token
def login():
    """Login and get JWT token"""
    username = input("Enter admin username: ").strip()
    password = input("Enter admin password: ").strip()
    
    response = requests.post(
        f"{BASE_URL}/auth/login/",
        json={"username": username, "password": password}
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

def update_with_image(url, token, data_dict, image_field_name="image", image_path=None):
    """Update data with image file"""
    headers = get_headers_multipart(token)
    
    # Prepare form data
    files = {}
    data = {}
    
    if image_path and os.path.exists(image_path):
        files[image_field_name] = (os.path.basename(image_path), open(image_path, 'rb'), 'image/jpeg')
        print(f"  ✓ Found image: {image_path}")
    elif image_path:
        print(f"  ⚠ Image not found: {image_path}, skipping image upload")
    
    # Add other fields
    for key, value in data_dict.items():
        if value is not None:
            if isinstance(value, (list, dict)):
                data[key] = json.dumps(value)
            else:
                data[key] = str(value)
    
    response = requests.patch(url, headers=headers, data=data, files=files if files else None)
    
    if files:
        files[image_field_name][1].close()  # Close the file
    
    if response.status_code in [200, 201]:
        print(f"  ✓ Successfully updated: {url}")
        return response.json()
    else:
        print(f"  ✗ Failed to update {url}: {response.status_code} - {response.text}")
        return None

def update_data(url, token, data):
    """Update data via JSON"""
    headers = get_headers(token)
    response = requests.patch(url, headers=headers, json=data)
    
    if response.status_code in [200, 201]:
        print(f"  ✓ Successfully updated: {url}")
        return response.json()
    else:
        print(f"  ✗ Failed to update {url}: {response.status_code} - {response.text}")
        return None

def main():
    print("=" * 60)
    print("Portfolio Images and Contact Information Update Script")
    print("=" * 60)
    print("\nThis script will help you:")
    print("  1. Upload profile image")
    print("  2. Upload about profile image")
    print("  3. Update social links with icons and URLs")
    print("  4. Update contact information with icons and URLs")
    print("\nYou can press Enter to skip any step.")
    print("=" * 60)
    
    # Login
    print("\n1. Logging in...")
    token = login()
    print("✓ Login successful!")
    
    # Get existing data
    print("\n2. Fetching existing data...")
    profile_data = get_data(f"{BASE_URL}/admin/profile/", token)
    about_data = get_data(f"{BASE_URL}/admin/about/", token)
    social_links_data = get_data(f"{BASE_URL}/admin/social-links/", token)
    contact_data = get_data(f"{BASE_URL}/admin/contact/", token)
    
    profile = profile_data.get('results', [None])[0] if profile_data else None
    about = about_data.get('results', [None])[0] if about_data else None
    social_links = social_links_data.get('results', []) if social_links_data else []
    contacts = contact_data.get('results', []) if contact_data else []
    
    if not profile:
        print("✗ No profile found. Please run seed_data.py first.")
        return
    
    # 1. Profile Image
    print("\n" + "=" * 60)
    print("3. Profile Image")
    print("=" * 60)
    profile_image_path = input("Enter path to profile image (or press Enter to skip): ").strip()
    if profile_image_path:
        update_with_image(
            f"{BASE_URL}/admin/profile/{profile['id']}/",
            token,
            {},
            image_field_name="profile_image",
            image_path=profile_image_path
        )
    
    # 2. About Profile Image
    print("\n" + "=" * 60)
    print("4. About Profile Image")
    print("=" * 60)
    if about:
        about_image_path = input("Enter path to about profile image (or press Enter to skip): ").strip()
        if about_image_path:
            update_with_image(
                f"{BASE_URL}/admin/about/{about['id']}/",
                token,
                {},
                image_field_name="profile_image",
                image_path=about_image_path
            )
    else:
        print("⚠ No about section found. Skipping...")
    
    # 3. Social Links
    print("\n" + "=" * 60)
    print("5. Social Links")
    print("=" * 60)
    if social_links:
        print(f"Found {len(social_links)} social links:")
        for i, link in enumerate(social_links, 1):
            print(f"  {i}. {link.get('label', 'N/A')} - {link.get('url', 'No URL')}")
        
        for link in social_links:
            print(f"\nUpdating: {link.get('label', 'N/A')}")
            new_url = input(f"  Enter URL (current: {link.get('url', 'None')}) or press Enter to keep: ").strip()
            icon_path = input(f"  Enter path to icon image (or press Enter to skip): ").strip()
            
            update_data_dict = {}
            if new_url:
                update_data_dict['url'] = new_url
            
            if icon_path:
                update_with_image(
                    f"{BASE_URL}/admin/social-links/{link['id']}/",
                    token,
                    update_data_dict,
                    image_field_name="icon",
                    image_path=icon_path
                )
            elif update_data_dict:
                update_data(f"{BASE_URL}/admin/social-links/{link['id']}/", token, update_data_dict)
    else:
        print("⚠ No social links found. Skipping...")
    
    # 4. Contact Information
    print("\n" + "=" * 60)
    print("6. Contact Information")
    print("=" * 60)
    if contacts:
        print(f"Found {len(contacts)} contact entries:")
        for i, contact in enumerate(contacts, 1):
            print(f"  {i}. {contact.get('label', 'N/A')} - {contact.get('value', 'N/A')}")
        
        for contact in contacts:
            print(f"\nUpdating: {contact.get('label', 'N/A')}")
            new_value = input(f"  Enter value (current: {contact.get('value', 'None')}) or press Enter to keep: ").strip()
            new_url = input(f"  Enter URL (current: {contact.get('url', 'None')}) or press Enter to keep: ").strip()
            icon_path = input(f"  Enter path to icon image (or press Enter to skip): ").strip()
            
            update_data_dict = {}
            if new_value:
                update_data_dict['value'] = new_value
            if new_url:
                update_data_dict['url'] = new_url if new_url else None
            
            if icon_path:
                update_with_image(
                    f"{BASE_URL}/admin/contact/{contact['id']}/",
                    token,
                    update_data_dict,
                    image_field_name="icon",
                    image_path=icon_path
                )
            elif update_data_dict:
                update_data(f"{BASE_URL}/admin/contact/{contact['id']}/", token, update_data_dict)
    else:
        print("⚠ No contact entries found. Skipping...")
    
    print("\n" + "=" * 60)
    print("Update completed!")
    print("=" * 60)
    print("\nYou can verify the changes in the admin CMS or by viewing your portfolio.")

if __name__ == "__main__":
    main()

