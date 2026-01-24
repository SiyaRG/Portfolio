# Portfolio Images and Contact Information Update Script

This script helps you add images and update contact information that couldn't be included in the initial seeding script.

## Prerequisites

1. Django backend server must be running on `http://localhost:8000`
2. You must have run `seed_data.py` first to create the initial data
3. Have your image files ready (profile images, icons, etc.)

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

## Usage

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the script:
   ```bash
   python update_images_and_contact.py
   ```

3. When prompted, enter your admin username and password

4. Follow the prompts to:
   - Upload profile image
   - Upload about profile image
   - Update social links (URLs and icons)
   - Update contact information (values, URLs, and icons)

## What You Can Update

### Profile Image
- Upload a profile picture that will be displayed on the home page
- Recommended size: 500x500px or larger (square format works best)

### About Profile Image
- Upload a profile picture for the About section
- Recommended size: 500x500px or larger

### Social Links
For each social link, you can:
- Update the URL (e.g., your actual LinkedIn, GitHub, email links)
- Upload an icon image (e.g., LinkedIn logo, GitHub logo, email icon)
- Recommended icon size: 64x64px or 128x128px

### Contact Information
For each contact entry, you can:
- Update the value (e.g., your actual email, phone number, location)
- Update the URL (e.g., mailto: links, tel: links)
- Upload an icon image
- Recommended icon size: 64x64px or 128x128px

## Tips

- **Image Paths**: You can use absolute paths (e.g., `C:\Users\YourName\Pictures\profile.jpg`) or relative paths from the backend directory
- **Skipping**: Press Enter at any prompt to skip that update
- **File Formats**: Make sure your image files are in a supported format
- **File Size**: Keep images reasonably sized (under 5MB recommended) for better performance

## Example Session

```
Enter admin username: admin
Enter admin password: ********

3. Profile Image
Enter path to profile image: C:\Users\YourName\Pictures\profile.jpg
  ✓ Found image: C:\Users\YourName\Pictures\profile.jpg
  ✓ Successfully updated: http://localhost:8000/api/admin/profile/1/

4. About Profile Image
Enter path to about profile image: ./images/about-profile.jpg
  ✓ Found image: ./images/about-profile.jpg
  ✓ Successfully updated: http://localhost:8000/api/admin/about/1/

5. Social Links
Found 3 social links:
  1. LinkedIn - https://linkedin.com/in/yourprofile
  2. GitHub - https://github.com/yourusername
  3. Email - mailto:your.email@example.com

Updating: LinkedIn
  Enter URL (current: https://linkedin.com/in/yourprofile) or press Enter to keep: 
  Enter path to icon image (or press Enter to skip): ./icons/linkedin.png
  ✓ Found image: ./icons/linkedin.png
  ✓ Successfully updated: http://localhost:8000/api/admin/social-links/1/
...
```

## Troubleshooting

**Error: "Image not found"**
- Check that the file path is correct
- Use absolute paths if relative paths don't work
- Make sure the file exists and you have read permissions

**Error: "Login failed"**
- Check your username and password
- Make sure you've created a superuser: `python manage.py createsuperuser`

**Error: "Connection refused"**
- Make sure the Django server is running: `python manage.py runserver`

**Error: "No profile found"**
- Run `seed_data.py` first to create the initial data

## After Running

After updating images and contact information:
1. Check your portfolio frontend to see the changes
2. Verify images are displaying correctly
3. Test links to make sure they work
4. You can run this script again anytime to update information

