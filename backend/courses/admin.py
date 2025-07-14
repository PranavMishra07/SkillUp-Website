from django.contrib import admin

from .models import Course, Review, Enrollment
# Register your models here.


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'instructor', 'difficulty', 'created_at']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['course', 'user', 'rating', 'created_at']

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'enrolled_at']
