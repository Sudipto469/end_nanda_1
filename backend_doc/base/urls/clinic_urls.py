from django.urls import path
from ..views import clinic_view as views

urlpatterns = [
    path("", views.getClinics, name="clinics"),
    # path("products/", views.getProducts, name="products"),
    # path("sort/",views.getSort, name = 'SortProduct'),
    path("upload/",views.uploadImage, name = 'uploadImage'),
    path("update/<str:pk>/", views.updateClinic, name="clinic_update"),
    path("create/",views.createClinic, name="Create clinic"),
    path("<str:pk>/", views.getClinic, name="clinic"),
    path("delete/<str:pk>/", views.deleteClinic, name="clinic_del"),
    # path("<str:pk>/reviews/", views.createProductReview, name="product"),

]
