from django.urls import path
from .views import signup, verify_otp,MyTokenObtainPairView,list_users,approve_instructor,delete_user


from courses.views import list_courses,get_reviews

from .admin_views import platform_stats


# from django.http import JsonResponse


# def api_root(request):
#     return JsonResponse({"message": "Welcome to the SkillUp API 🎓"})



urlpatterns = [
    # path("",api_root),
    path('signup/', signup),
    path('verify-otp/', verify_otp),
    path('token/',MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
       

    path('admin/users/', list_users),
    path('admin/approve/<int:user_id>/',  approve_instructor),
    path('admin/user/<int:user_id>/', delete_user),



    #for admin statics
     path("admin/stats/",platform_stats),
]









# urlpatterns += [
    
#     path('admin/courses/', list_courses),
#     path('admin/reviews/', get_reviews),
    
#     path('admin/user/<int:user_id>/', delete_user),
# ]
