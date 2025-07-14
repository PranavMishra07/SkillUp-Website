from django.db import models
from users.models import User

# Create your models here.


class Course(models.Model):
    DIFFICULTY_CHOICES = (
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    category = models.CharField(max_length=100, blank=True)
    video_url = models.URLField(blank=True, null=True)
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title




class Review(models.Model):
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('course', 'user')  #  One review per user per course

    def __str__(self):
        return f"{self.user.email} - {self.course.title} ({self.rating})"





# Enrollment model

class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('course', 'user')  # ✅ one enrollment per user per course

    def __str__(self):
        return f"{self.user.email} enrolled in {self.course.title}"
