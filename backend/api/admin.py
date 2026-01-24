from django.contrib import admin
from .models import (
    Profile, SocialLink, About, Experience, ExperienceItem,
    JourneyCard, Project, ProjectAchievement, SkillCategory,
    Skill, Education, Leadership, LeadershipAchievement, ContactInfo
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'label', 'order', 'is_active']
    list_filter = ['platform', 'is_active']
    ordering = ['order']


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ['is_active', 'created_at']


class ExperienceItemInline(admin.TabularInline):
    model = ExperienceItem
    extra = 1


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'start_date', 'end_date', 'is_current', 'order', 'is_active']
    list_filter = ['is_active', 'is_current']
    inlines = [ExperienceItemInline]
    ordering = ['-order']


@admin.register(JourneyCard)
class JourneyCardAdmin(admin.ModelAdmin):
    list_display = ['year', 'text', 'order', 'is_active']
    list_filter = ['is_active']
    ordering = ['order']


class ProjectAchievementInline(admin.TabularInline):
    model = ProjectAchievement
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'created_at']
    list_filter = ['is_active']
    inlines = [ProjectAchievementInline]
    ordering = ['order']


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'display_name', 'order', 'is_active']
    list_filter = ['is_active']
    inlines = [SkillInline]
    ordering = ['order']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'start_period', 'end_period', 'is_current', 'order', 'is_active']
    list_filter = ['is_active', 'is_current']
    ordering = ['-order']


class LeadershipAchievementInline(admin.TabularInline):
    model = LeadershipAchievement
    extra = 1


@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    list_display = ['title', 'period', 'is_active']
    list_filter = ['is_active']
    inlines = [LeadershipAchievementInline]


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'order', 'is_active']
    list_filter = ['is_active']
    ordering = ['order']
