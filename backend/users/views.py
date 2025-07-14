from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from django.core.mail import send_mail,BadHeaderError
from .models import User, EmailOTP
from .serializers import SignupSerializer,UserSerializer
import random


from courses.models import Course, Review
from courses.serializers import CourseSerializer, ReviewSerializer
from .permissions import IsAdmin



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated




@api_view(['POST'])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        # Create inactive user
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        role = serializer.validated_data['role']

        user = User.objects.create_user(email=email, password=password, role=role)
        user.is_active = False  # 🔒 Cannot login until OTP verified
        user.save()

        # Generate OTP
        otp = str(random.randint(100000, 999999))
        expiry = timezone.now() + timezone.timedelta(minutes=10)
        EmailOTP.objects.create(user=user, otp=otp, valid_until=expiry)

        # Send OTP via email
        try:
            send_mail(
                subject="SkillUp Email Verification",
                message=f"Your OTP is: {otp}",
                from_email="your_gmail@gmail.com",
                recipient_list=[email],
            )
        except BadHeaderError:
            return Response({"error": "Invalid header found while sending email."}, status=400)

        return Response({"message": "Signup successful. OTP sent to email."})

    return Response(serializer.errors, status=400)




@api_view(['POST'])
def verify_otp(request):
    email = request.data.get("email", "").strip().lower()
    otp = request.data.get("otp", "").strip()

    try:
        user = User.objects.get(email=email)
        email_otp = EmailOTP.objects.filter(user=user, otp=otp).last()

        if email_otp and email_otp.valid_until > timezone.now():
            user.is_active = True
            user.is_verified = True
            user.save()
            return Response({"message": "Email verified successfully."})
        else:
            return Response({"error": "Invalid or expired OTP."}, status=400)

    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)





# Create Custom Token View (with role + email)


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# ✅ Custom serializer to add role and email to token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['role'] = user.role
        token['is_verified'] = user.is_verified
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['email'] = self.user.email
        data['role'] = self.user.role
        data['is_verified'] = self.user.is_verified
        return data


# ✅ Custom view for token login
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer








# Admin API Views 



@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def list_users(request):
    users = User.objects.all().order_by('-date_joined')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def list_courses(request):
    courses = Course.objects.all().order_by('-created_at')
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def list_reviews(request):
    reviews = Review.objects.all().order_by('-created_at')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAdmin])
def approve_instructor(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        if user.role == 'instructor':
            user.is_approved = True
            user.save()
            return Response({"message": "Instructor approved."})
        return Response({"error": "Not an instructor."}, status=400)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdmin])
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.delete()
        return Response({"message": "User deleted."})
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)



# Approve Instructor API
@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAdmin])
def approve_instructor(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        if user.role == 'instructor':
            user.is_approved = True
            user.save()
            return Response({"message": "Instructor approved."})
        else:
            return Response({"error": "User is not an instructor."}, status=400)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)








