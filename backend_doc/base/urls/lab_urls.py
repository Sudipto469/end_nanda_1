from django.urls import path
from ..views import lab_view as views

urlpatterns = [
    path("", views.getLabs, name="labs"),
    # path("products/", views.getProducts, name="products"),
    # path("sort/",views.getSort, name = 'SortProduct'),
    path("upload/",views.uploadImage, name = 'uploadImage'),
    path("update/<str:pk>/", views.updateLab, name="Lab_update"),
    path("create/",views.createLab, name="Create Lab"),
    path("<str:pk>/", views.getLab, name="lab"),
    path("delete/<str:pk>/", views.deleteLab, name="lab_del"),
    # path("<str:pk>/reviews/", views.createProductReview, name="product"),

]
