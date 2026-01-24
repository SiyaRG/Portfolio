from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    # Public viewsets
    PublicProfileViewSet, PublicSocialLinkViewSet, PublicAboutViewSet,
    PublicExperienceViewSet, PublicJourneyCardViewSet, PublicProjectViewSet,
    PublicSkillCategoryViewSet, PublicEducationViewSet, PublicLeadershipViewSet,
    PublicContactInfoViewSet,
    # Admin viewsets
    ProfileViewSet, SocialLinkViewSet, AboutViewSet, ExperienceViewSet,
    ExperienceItemViewSet, JourneyCardViewSet, ProjectViewSet,
    ProjectAchievementViewSet, SkillCategoryViewSet, SkillViewSet,
    EducationViewSet, LeadershipViewSet, LeadershipAchievementViewSet,
    ContactInfoViewSet,
)

# Public router (read-only endpoints)
public_router = DefaultRouter()
public_router.register(r'profile', PublicProfileViewSet, basename='public-profile')
public_router.register(r'social-links', PublicSocialLinkViewSet, basename='public-social-links')
public_router.register(r'about', PublicAboutViewSet, basename='public-about')
public_router.register(r'experience', PublicExperienceViewSet, basename='public-experience')
public_router.register(r'journey-cards', PublicJourneyCardViewSet, basename='public-journey-cards')
public_router.register(r'projects', PublicProjectViewSet, basename='public-projects')
public_router.register(r'skill-categories', PublicSkillCategoryViewSet, basename='public-skill-categories')
public_router.register(r'education', PublicEducationViewSet, basename='public-education')
public_router.register(r'leadership', PublicLeadershipViewSet, basename='public-leadership')
public_router.register(r'contact', PublicContactInfoViewSet, basename='public-contact')

# Admin router (full CRUD endpoints)
admin_router = DefaultRouter()
admin_router.register(r'profile', ProfileViewSet, basename='admin-profile')
admin_router.register(r'social-links', SocialLinkViewSet, basename='admin-social-links')
admin_router.register(r'about', AboutViewSet, basename='admin-about')
admin_router.register(r'experience', ExperienceViewSet, basename='admin-experience')
admin_router.register(r'experience-items', ExperienceItemViewSet, basename='admin-experience-items')
admin_router.register(r'journey-cards', JourneyCardViewSet, basename='admin-journey-cards')
admin_router.register(r'projects', ProjectViewSet, basename='admin-projects')
admin_router.register(r'project-achievements', ProjectAchievementViewSet, basename='admin-project-achievements')
admin_router.register(r'skill-categories', SkillCategoryViewSet, basename='admin-skill-categories')
admin_router.register(r'skills', SkillViewSet, basename='admin-skills')
admin_router.register(r'education', EducationViewSet, basename='admin-education')
admin_router.register(r'leadership', LeadershipViewSet, basename='admin-leadership')
admin_router.register(r'leadership-achievements', LeadershipAchievementViewSet, basename='admin-leadership-achievements')
admin_router.register(r'contact', ContactInfoViewSet, basename='admin-contact')

urlpatterns = [
    # Authentication
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Public API endpoints
    path('public/', include(public_router.urls)),
    
    # Admin API endpoints
    path('admin/', include(admin_router.urls)),
]

