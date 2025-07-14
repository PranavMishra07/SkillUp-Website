from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import Course, Review
from .serializers import CourseSerializer, ReviewSerializer

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_all_courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_course(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
        course.delete()
        return Response({"message": "Course deleted successfully"})
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_all_reviews(request):
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_review(request, review_id):
    try:
        review = Review.objects.get(id=review_id)
        review.delete()
        return Response({"message": "Review deleted successfully"})
    except Review.DoesNotExist:
        return Response({"error": "Review not found"}, status=404)
