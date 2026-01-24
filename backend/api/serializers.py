from rest_framework import serializers
from .models import (
    Profile, SocialLink, About, Experience, ExperienceItem,
    JourneyCard, Project, ProjectAchievement, SkillCategory,
    Skill, Education, Leadership, LeadershipAchievement, ContactInfo
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'


class ExperienceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceItem
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    items = ExperienceItemSerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = '__all__'


class JourneyCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = JourneyCard
        fields = '__all__'


class ProjectAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectAchievement
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    achievements = ProjectAchievementSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.display_name', read_only=True)

    class Meta:
        model = Skill
        fields = '__all__'


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class LeadershipAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadershipAchievement
        fields = '__all__'


class LeadershipSerializer(serializers.ModelSerializer):
    achievements = LeadershipAchievementSerializer(many=True, read_only=True)

    class Meta:
        model = Leadership
        fields = '__all__'


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

