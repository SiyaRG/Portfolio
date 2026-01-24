# Email Service Setup Guide

This guide explains how to configure the contact form email service.

## Overview

The contact form allows visitors to send emails through your portfolio. It includes:
- API key authentication (only your frontend can send emails)
- Rate limiting (1 email per 5 minutes per IP address, configurable)
- Automatic email delivery to your ContactInfo email address

## Environment Variables

Add these to your `backend/.env` file:

### Required Email Settings

```env
# Email Backend (default: smtp)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend

# SMTP Server Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False

# Email Credentials
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
```

### Contact Form API Key

```env
# API Key for frontend authentication (generate a secure random string)
CONTACT_API_KEY=your-secure-api-key-here
```

### Rate Limiting (Optional - defaults shown)

```env
# Time window in minutes (default: 5)
CONTACT_EMAIL_RATE_LIMIT_MINUTES=5

# Max emails per time window per IP (default: 1)
CONTACT_EMAIL_RATE_LIMIT_COUNT=1
```

## Frontend Configuration

Add the API key to your frontend `.env` file:

```env
VITE_CONTACT_API_KEY=your-secure-api-key-here
```

**Important**: Use the same API key value in both backend and frontend `.env` files.

## Email Provider Setup

### Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Create an app password for "Mail"
4. Use this app password as `EMAIL_HOST_PASSWORD` (not your regular password)

### Other SMTP Providers

For other providers (Outlook, SendGrid, etc.), adjust the settings accordingly:

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
```

**Custom SMTP:**
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
```

## ContactInfo Model - Value Field Explanation

The `value` field in ContactInfo stores the **display text** for contact information:
- For Email: The email address (e.g., "your.email@example.com")
- For Phone: The phone number (e.g., "+1 555-1234")
- For Location: The location text (e.g., "City, Country")

The `url` field is separate and stores the actual link:
- For Email: `mailto:your.email@example.com`
- For Phone: `tel:+15551234567`
- For Location: Usually empty

**Why both fields?**
- `value`: Displayed in the UI and used as the recipient email for contact form submissions
- `url`: Used for clickable links (mailto:, tel:, etc.)

## Testing

1. Make sure your Django server is running
2. Configure email settings in `.env`
3. Set `CONTACT_API_KEY` in both backend and frontend `.env` files
4. Ensure you have a ContactInfo entry with `label='Email'` and a valid email in `value`
5. Test the contact form on the frontend

## Troubleshooting

**"Invalid or missing API key"**
- Check that `CONTACT_API_KEY` is set in backend `.env`
- Check that `VITE_CONTACT_API_KEY` is set in frontend `.env` (or `.env.local`)
- Ensure both values match exactly

**"Recipient email not configured"**
- Create a ContactInfo entry with `label='Email'` and `is_active=True`
- Set the `value` field to your email address

**"Rate limit exceeded"**
- This is expected behavior - wait 5 minutes (or your configured limit) between emails from the same IP
- To test, use a different IP address or adjust `CONTACT_EMAIL_RATE_LIMIT_MINUTES` in settings

**Email not sending**
- Check SMTP credentials are correct
- For Gmail, ensure you're using an App Password, not your regular password
- Check that `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USE_TLS` are correct for your provider
- Check Django server logs for error messages

## Security Notes

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use strong API keys** - Generate a secure random string (e.g., using `openssl rand -hex 32`)
3. **Rate limiting** - Prevents spam and abuse
4. **API key authentication** - Only your frontend can send emails (prevents unauthorized use)

