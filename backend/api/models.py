from django.db import models
from django.core.validators import URLValidator


class TimestampedModel(models.Model):
    """Abstract base model with created_at and updated_at timestamps"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Profile(TimestampedModel):
    """Home section profile data"""
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    description = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Profiles"
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class SocialLink(TimestampedModel):
    """Social media links"""
    PLATFORM_CHOICES = [
        ('linkedin', 'LinkedIn'),
        ('github', 'GitHub'),
        ('hackerrank', 'HackerRank'),
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('other', 'Other'),
    ]
    
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=200)
    url = models.URLField(validators=[URLValidator()], blank=True, null=True)
    icon = models.ImageField(upload_to='icons/', null=True, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'platform']

    def __str__(self):
        return f"{self.platform}: {self.label}"


class About(TimestampedModel):
    """About section content"""
    paragraph1 = models.TextField()
    paragraph2 = models.TextField()
    highlights = models.JSONField(default=list, help_text="List of highlight strings")
    profile_image = models.ImageField(upload_to='about/', null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "About Sections"

    def __str__(self):
        return "About Section"


class Experience(TimestampedModel):
    """Work experience entries"""
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200, blank=True)
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, blank=True, null=True)
    is_current = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-order', '-start_date']

    def __str__(self):
        return f"{self.title} at {self.company or 'N/A'}"


class ExperienceItem(TimestampedModel):
    """Bullet points for work experience"""
    experience = models.ForeignKey(Experience, related_name='items', on_delete=models.CASCADE)
    text = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.experience.title} - Item {self.order}"


class JourneyCard(TimestampedModel):
    """Journey summary cards"""
    year = models.CharField(max_length=10)
    text = models.TextField()
    image = models.ImageField(upload_to='journey/', null=True, blank=True)
    image_url = models.URLField(blank=True, null=True, help_text="External image URL if not uploading")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'year']

    def __str__(self):
        return f"{self.year}: {self.text[:50]}"


class Project(TimestampedModel):
    """Project entries"""
    title = models.CharField(max_length=200)
    technologies = models.JSONField(default=list, help_text="List of technology strings")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class ProjectAchievement(TimestampedModel):
    """Project achievements/bullet points"""
    project = models.ForeignKey(Project, related_name='achievements', on_delete=models.CASCADE)
    text = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title} - Achievement {self.order}"


class SkillCategory(TimestampedModel):
    """Skill categories (Languages, Frameworks, etc.)"""
    name = models.CharField(max_length=100, unique=True)
    display_name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Skill Categories"
        ordering = ['order', 'name']

    def __str__(self):
        return self.display_name


class Skill(TimestampedModel):
    """Individual skills"""
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['category__order', 'order', 'name']
        unique_together = ['category', 'name']

    def __str__(self):
        return f"{self.category.display_name}: {self.name}"


class Education(TimestampedModel):
    """Education entries"""
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    start_period = models.CharField(max_length=50)
    end_period = models.CharField(max_length=50, blank=True, null=True)
    is_current = models.BooleanField(default=False)
    note = models.TextField(blank=True, null=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-order', '-start_period']

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Leadership(TimestampedModel):
    """Leadership section"""
    title = models.CharField(max_length=200)
    period = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Leadership Sections"

    def __str__(self):
        return self.title


class LeadershipAchievement(TimestampedModel):
    """Leadership achievements"""
    leadership = models.ForeignKey(Leadership, related_name='achievements', on_delete=models.CASCADE)
    text = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.leadership.title} - Achievement {self.order}"


class ContactInfo(TimestampedModel):
    """Contact information"""
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=200)
    url = models.URLField(blank=True, null=True)
    icon = models.ImageField(upload_to='contact/', null=True, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Contact Information"
        ordering = ['order']

    def __str__(self):
        return f"{self.label}: {self.value}"
