from django.urls import path, re_path
from . import views

app_name = 'admin'
urlpatterns = [
    
    re_path(r'^login/', views.admin_login, name='admin_login'),
    re_path(r'^logout/', views.admin_logout, name='admin_logout'),

    path('', views.dashboard, name='dashboard'),
    path('labList', views.labList, name='labList'),
]
