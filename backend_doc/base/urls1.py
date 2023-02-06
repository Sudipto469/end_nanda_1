from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    # path("",views.getRoute, name = 'routes'),registerUser
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("products/",views.getProducts, name = 'products'),
    path("product/<str:pk>/",views.getProduct, name = 'product'),
    path("sort/",views.getSort, name = 'SortProduct'),
    path('users/profile/', views.getUserProfile, name='user-profile'),
    path('users/', views.getUsers, name='user-profile'),
    path('users/register/', views.registerUser, name='user-register'),

]
