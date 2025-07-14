from django.contrib import admin

# Register your models here.
from .models import User,EmailOTP

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display=['email','role','is_verified','is_approved','is_active']

@admin.register(EmailOTP)
class EmailOTPAdmin(admin.ModelAdmin):
    list_display=['user','otp','valid_until']