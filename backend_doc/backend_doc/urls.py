"""backend_doc URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path("admin/", admin.site.urls),
    path('admin/', include('superadmin.urls')),
    # path('api/', include('base.urls'))
    # path('',TemplateView.as_view(template_name="index.html")),
    path("api/hospital_fee/", include('base.urls.hospital_fee_url')),
    path("api/disease/", include('base.urls.disease_urls')),
    path("api/clinics/", include('base.urls.clinic_urls')),
    path("api/clinic/", include('base.urls.clinic_urls')),
    path("api/labs/", include('base.urls.lab_urls')),
    path("api/lab/", include('base.urls.lab_urls')),
    path("api/hospitals/", include('base.urls.hospital_urls')),
    path("api/hospital/", include('base.urls.hospital_urls')),
    path("api/products/", include('base.urls.product_urls')),
    path("api/product/", include('base.urls.product_urls')),
    path("api/users/", include('base.urls.user_urls')),
    # path("api/orders/", include('base.urls.order_urls')),

]
urlpatterns+= static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)
urlpatterns+= static(settings.STATIC_URL,document_root = settings.STATIC_ROOT)
