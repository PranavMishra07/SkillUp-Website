from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_active = False  # User can't log in until email verified
        user.save()
        return user




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'is_verified', 'is_approved']
