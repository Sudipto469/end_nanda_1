from django.urls import path
from ..views import hospital_view as views

urlpatterns = [
    path("", views.getHospitals, name="hospitals"),
    path("create/",views.createHospital, name="Create Hospital"),
    path("upload/",views.uploadImage, name = 'uploadImage'),
    path("<str:pk>/", views.getHospital, name="hospital"),
    path("delete/<str:pk>/", views.deleteHospital, name="hospital_del"),
    path("update/<str:pk>/", views.updateHospital, name="hospital_update"),
    # path("products/", views.getProducts, name="products"),
    # path("sort/",views.getSort, name = 'SortProduct'),
    # path("<str:pk>/", views.getProduct, name="product"),
    # path("<str:pk>/reviews/", views.createProductReview, name="product"),

]
