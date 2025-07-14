from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Course,Review,Enrollment
from .serializers import CourseSerializer,ReviewSerializer,EnrollmentSerializer
# Create your views here.




# ✅ Instructor: Create Course
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_course(request):
    if request.user.role != 'instructor' or not request.user.is_approved:
        return Response({"error": "Only approved instructors can create courses."}, status=403)

    serializer = CourseSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(instructor=request.user)  # ✅ this sets instructor_id
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# ✅ Public: List all courses
@api_view(['GET'])
def list_courses(request):
    courses = Course.objects.all().order_by('-created_at')
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

# ✅ Public: Course detail
@api_view(['GET'])
def course_detail(request, pk):
    try:
        course = Course.objects.get(id=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)


#Review views





# GET reviews of a course
@api_view(['GET'])
def get_reviews(request, course_id):
    reviews = Review.objects.filter(course_id=course_id).order_by('-created_at')
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

# POST or Update review (one per user per course)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_or_update_review(request, course_id):
    course = Course.objects.get(id=course_id)
    review, created = Review.objects.update_or_create(
        course=course,
        user=request.user,
        defaults={
            'rating': request.data.get('rating'),
            'comment': request.data.get('comment')
        }
    )
    return Response({"message": "Review submitted successfully."})





#Enrollment Views

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_in_course(request, course_id):
    user = request.user
    try:
        course = Course.objects.get(id=course_id)
        enrollment, created = Enrollment.objects.get_or_create(user=user, course=course)
        if created:
            return Response({"message": "Enrolled successfully!"})
        else:
            return Response({"message": "Already enrolled."})
    except Course.DoesNotExist:
        return Response({"error": "Course not found."}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_enrollments(request):
    enrollments = Enrollment.objects.filter(user=request.user).select_related('course')
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response(serializer.data)
