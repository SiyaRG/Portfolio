from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.utils import timezone
from django.utils.html import escape
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import (
    Profile, SocialLink, About, Experience, ExperienceItem,
    JourneyCard, Project, ProjectAchievement, SkillCategory,
    Skill, Education, Leadership, LeadershipAchievement, ContactInfo,
    EmailRateLimit
)
from .serializers import (
    ProfileSerializer, SocialLinkSerializer, AboutSerializer,
    ExperienceSerializer, ExperienceItemSerializer, JourneyCardSerializer,
    ProjectSerializer, ProjectAchievementSerializer, SkillCategorySerializer,
    SkillSerializer, EducationSerializer, LeadershipSerializer,
    LeadershipAchievementSerializer, ContactInfoSerializer, ContactFormSerializer
)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# Public Viewsets (read-only, no authentication required)
class PublicProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.filter(is_active=True)
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]


class PublicSocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialLink.objects.filter(is_active=True)
    serializer_class = SocialLinkSerializer
    permission_classes = [AllowAny]


class PublicAboutViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = About.objects.filter(is_active=True)
    serializer_class = AboutSerializer
    permission_classes = [AllowAny]


class PublicExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.filter(is_active=True)
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]


class PublicJourneyCardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JourneyCard.objects.filter(is_active=True)
    serializer_class = JourneyCardSerializer
    permission_classes = [AllowAny]


class PublicProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]


class PublicSkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillCategory.objects.filter(is_active=True)
    serializer_class = SkillCategorySerializer
    permission_classes = [AllowAny]


class PublicEducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.filter(is_active=True)
    serializer_class = EducationSerializer
    permission_classes = [AllowAny]


class PublicLeadershipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Leadership.objects.filter(is_active=True)
    serializer_class = LeadershipSerializer
    permission_classes = [AllowAny]


class PublicContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactInfo.objects.filter(is_active=True)
    serializer_class = ContactInfoSerializer
    permission_classes = [AllowAny]


# Admin Viewsets (full CRUD, authentication required)
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]


class SocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [IsAuthenticated]


class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [IsAuthenticated]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]


class ExperienceItemViewSet(viewsets.ModelViewSet):
    queryset = ExperienceItem.objects.all()
    serializer_class = ExperienceItemSerializer
    permission_classes = [IsAuthenticated]


class JourneyCardViewSet(viewsets.ModelViewSet):
    queryset = JourneyCard.objects.all()
    serializer_class = JourneyCardSerializer
    permission_classes = [IsAuthenticated]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]


class ProjectAchievementViewSet(viewsets.ModelViewSet):
    queryset = ProjectAchievement.objects.all()
    serializer_class = ProjectAchievementSerializer
    permission_classes = [IsAuthenticated]


class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
    permission_classes = [IsAuthenticated]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]


class LeadershipViewSet(viewsets.ModelViewSet):
    queryset = Leadership.objects.all()
    serializer_class = LeadershipSerializer
    permission_classes = [IsAuthenticated]


class LeadershipAchievementViewSet(viewsets.ModelViewSet):
    queryset = LeadershipAchievement.objects.all()
    serializer_class = LeadershipAchievementSerializer
    permission_classes = [IsAuthenticated]


class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    permission_classes = [IsAuthenticated]


@method_decorator(csrf_exempt, name='dispatch')
class ContactFormView(APIView):
    """Public endpoint for sending contact form emails"""
    permission_classes = [AllowAny]

    def get_client_ip(self, request):
        """Extract client IP address from request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def post(self, request):
        # 1. Validate API key
        api_key = request.headers.get('X-API-Key', '')
        expected_key = settings.CONTACT_API_KEY
        
        # Debug logging (remove in production)
        if settings.DEBUG:
            print(f"Received API key: {repr(api_key)}")
            print(f"Expected API key: {repr(expected_key)}")
            print(f"Keys match: {api_key == expected_key}")
        
        if not api_key or api_key != expected_key:
            return Response(
                {'error': 'Invalid or missing API key'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # 2. Get client IP address
        client_ip = self.get_client_ip(request)

        # 3. Check rate limiting
        rate_limit_minutes = settings.CONTACT_EMAIL_RATE_LIMIT_MINUTES
        rate_limit_count = settings.CONTACT_EMAIL_RATE_LIMIT_COUNT

        rate_limit, created = EmailRateLimit.objects.get_or_create(
            ip_address=client_ip,
            defaults={'email_count': 0}
        )

        if not rate_limit.can_send_email(rate_limit_minutes, rate_limit_count):
            return Response(
                {
                    'error': f'Rate limit exceeded. Please wait {rate_limit_minutes} minutes between emails.',
                    'retry_after': rate_limit_minutes * 60
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        # 4. Validate form data
        serializer = ContactFormSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {'error': 'Invalid form data', 'details': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        validated_data = serializer.validated_data

        # 5. Get recipient email from ContactInfo
        try:
            contact_email = ContactInfo.objects.filter(
                label='Email',
                is_active=True
            ).first()
            
            if not contact_email:
                return Response(
                    {'error': 'Recipient email not configured. Please add a ContactInfo entry with label="Email".'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            recipient_email = contact_email.value.strip()
            
            # Validate email format
            import re
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_pattern, recipient_email):
                return Response(
                    {'error': f'Invalid recipient email address configured: "{recipient_email}". Please update the ContactInfo entry with a valid email address.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except Exception as e:
            return Response(
                {'error': 'Failed to retrieve recipient email', 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # 6. Send email
        subject = f"[Contact Form] {validated_data['subject']}"
        
        # Build plain text email body (fallback)
        message_parts = [
            f"Name: {validated_data['name']}",
            f"Email: {validated_data['email']}",
        ]
        if validated_data.get('phone'):
            message_parts.append(f"Phone: {validated_data['phone']}")
        message_parts.append("")
        message_parts.append("Message:")
        message_parts.append(validated_data['message'])
        
        plain_message = "\n".join(message_parts)
        
        # Build HTML email body (escape user input to prevent XSS)
        name_escaped = escape(validated_data['name'])
        email_escaped = escape(validated_data['email'])
        subject_escaped = escape(validated_data['subject'])
        message_escaped = escape(validated_data['message'])
        
        phone_html = ""
        if validated_data.get('phone'):
            phone_escaped = escape(validated_data['phone'])
            phone_html = f"""
        <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                <strong style="color: #0e6e55; min-width: 100px; display: inline-block;">Phone:</strong>
                <span style="color: #333;">{phone_escaped}</span>
            </td>
        </tr>
        """
        
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td style="background-color: #0e6e55; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
                                </td>
                            </tr>
                            
                            <!-- Body -->
                            <tr>
                                <td style="padding: 30px;">
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                                <strong style="color: #0e6e55; min-width: 100px; display: inline-block;">Name:</strong>
                                                <span style="color: #333;">{name_escaped}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                                <strong style="color: #0e6e55; min-width: 100px; display: inline-block;">Email:</strong>
                                                <a href="mailto:{email_escaped}" style="color: #0e6e55; text-decoration: none;">{email_escaped}</a>
                                            </td>
                                        </tr>
                                        {phone_html}
                                        <tr>
                                            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                                                <strong style="color: #0e6e55; min-width: 100px; display: inline-block;">Subject:</strong>
                                                <span style="color: #333;">{subject_escaped}</span>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Message Section -->
                                    <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #0e6e55; border-radius: 4px;">
                                        <h2 style="margin: 0 0 15px 0; color: #0e6e55; font-size: 18px; font-weight: 600;">Message:</h2>
                                        <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">{message_escaped}</p>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="padding: 20px 30px; background-color: #f9f9f9; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
                                    <p style="margin: 0; color: #666; font-size: 12px;">
                                        This email was sent from your portfolio contact form.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """

        try:
            # Validate email settings
            if not settings.DEFAULT_FROM_EMAIL:
                return Response(
                    {'error': 'Email not configured. Please set DEFAULT_FROM_EMAIL in settings.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Check if we're using console backend (development/testing)
            if settings.EMAIL_BACKEND == 'django.core.mail.backends.console.EmailBackend':
                print(f"CONSOLE EMAIL - Would send to: {recipient_email}")
                print(f"CONSOLE EMAIL - Subject: {subject}")
                print(f"CONSOLE EMAIL - Body: {plain_message[:200]}...")
            
            # Send HTML email with plain text fallback
            email = EmailMultiAlternatives(
                subject=subject,
                body=plain_message,  # Plain text body (fallback)
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[recipient_email],
            )
            # Attach HTML version
            email.attach_alternative(html_message, "text/html")
            
            email.send(fail_silently=False)

            # 7. Update rate limit record
            rate_limit.email_count += 1
            rate_limit.last_email_sent = timezone.now()
            rate_limit.save()

            return Response(
                {'message': 'Email sent successfully'},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            # Log the specific error for debugging
            print(f"Email sending error: {type(e).__name__}: {str(e)}")
            
            # Check for specific SMTP/connection errors
            if "ConnectionRefusedError" in str(type(e)) or "timeout" in str(e).lower():
                error_msg = 'Email service unavailable. Please try again later or contact the administrator directly.'
            elif "SMTPAuthenticationError" in str(e):
                error_msg = 'Email authentication failed. Please check email configuration.'
            else:
                error_msg = f'Failed to send email: {str(e)}'
            
            return Response(
                {'error': error_msg, 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
