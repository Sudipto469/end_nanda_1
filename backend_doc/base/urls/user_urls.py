from django.urls import path
from ..views import user_views as views


urlpatterns = [
    # path('api/token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name = 'register'),
    path("profile/", views.getUserProfile, name="user-profile"),
    path("profile/update/", views.updateUserProfile, name="user-profile-update"),
    path("", views.getUsers, name="users"),
    path('<str:pk>/',views.getUserById, name  = "user-by-id"),
    path('update/<str:pk>/',views.updateUser, name  = "user-update"),
    path("delete/<str:pk>/", views.deleteUser, name="user-delete"),

]
# http://127.0.0.1:8000/api/users/profile/update/
