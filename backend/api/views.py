from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from .models import (
    Profile, SocialLink, About, Experience, ExperienceItem,
    JourneyCard, Project, ProjectAchievement, SkillCategory,
    Skill, Education, Leadership, LeadershipAchievement, ContactInfo
)
from .serializers import (
    ProfileSerializer, SocialLinkSerializer, AboutSerializer,
    ExperienceSerializer, ExperienceItemSerializer, JourneyCardSerializer,
    ProjectSerializer, ProjectAchievementSerializer, SkillCategorySerializer,
    SkillSerializer, EducationSerializer, LeadershipSerializer,
    LeadershipAchievementSerializer, ContactInfoSerializer
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
