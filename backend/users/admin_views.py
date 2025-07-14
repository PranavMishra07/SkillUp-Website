from courses.models import Course, Review
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view,permission_classes
from .models import User
@api_view(['GET'])
@permission_classes([IsAdminUser])
def platform_stats(request):
    total_users = User.objects.count()
    total_courses = Course.objects.count()
    total_reviews = Review.objects.count()
    instructor_count = User.objects.filter(role='instructor').count()
    learner_count = User.objects.filter(role='learner').count()

    return Response({
        "total_users": total_users,
        "total_courses": total_courses,
        "total_reviews": total_reviews,
        "instructors": instructor_count,
        "learners": learner_count
    })
