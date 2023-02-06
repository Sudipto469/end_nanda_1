from django.urls import path
from ..views import product_views as views

urlpatterns = [
    path("", views.getProducts, name="products"),
    # path("products/", views.getProducts, name="products"),
    path("create/",views.createProduct, name="Create product"),
    path("sort/",views.getSort, name = 'SortProduct'),
    path("upload/",views.uploadImage, name = 'uploadImage'),
    path("<str:pk>/", views.getProduct, name="product"),
    path("update/<str:pk>/", views.updateProduct, name="product"),
    path("delete/<str:pk>/", views.deleteProduct, name="product"),
    path("<str:pk>/reviews/", views.createProductReview, name="product"),

]
