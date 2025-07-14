from rest_framework import serializers
from .models import Course,Review

class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.ReadOnlyField(source='instructor.email')  # for learners

    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ['instructor']

    def get_avg_rating(self, obj):
        reviews = Review.objects.filter(course=obj)
        if reviews.exists():
            return round(sum([r.rating for r in reviews]) / len(reviews), 2)
        return None



#review 



# class ReviewSerializer(serializers.ModelSerializer):
#     user_email = serializers.ReadOnlyField(source='user.email')  # for display

#     class Meta:
#         model = Review
#         fields = ['id', 'course', 'user_email', 'rating', 'comment', 'created_at']
#         read_only_fields = ['user_email', 'course']
class ReviewSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user_email', 'course_title', 'rating', 'comment']





#Enrollment

from .models import Enrollment

class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.ReadOnlyField(source='course.title')

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'course_title', 'enrolled_at']
