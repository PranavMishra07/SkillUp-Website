from django.urls import path
from .views import create_course, list_courses, course_detail,get_reviews,add_or_update_review,enroll_in_course,my_enrollments


from .admin_views import (
    list_all_courses,
    delete_course,
    list_all_reviews,
    delete_review,
)



urlpatterns = [
    path('create/', create_course),
    path('', list_courses),
    path('<int:pk>/', course_detail),

    path('<int:course_id>/reviews/',get_reviews),
    path('<int:course_id>/reviews/add/',add_or_update_review),


    path('<int:course_id>/enroll/',enroll_in_course),
    path('my-courses/',my_enrollments),




    #for admin routes only
    path("admin/courses/", list_all_courses),
    path("admin/course/<int:course_id>/", delete_course),
    path("admin/reviews/", list_all_reviews),
    path("admin/review/<int:review_id>/delete/", delete_review),


]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)






