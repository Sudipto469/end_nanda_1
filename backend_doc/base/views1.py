from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse
# from .products import products
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializer1 import ProductSerializer,UserSerializersWithToken , UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth.hashers import make_password


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializersWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    #products = Product.objects.all()
    serializer = UserSerializer(user,many = False)
    return Response(serializer.data)

# Create your views here.
# @api_view(['GET'])
# def getRoute(request):
#     return Response('Hello')

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(id = pk)
    serializer = ProductSerializer(product,many = False)
    return Response(serializer.data)

@api_view(['GET'])
def getSort(request):
    products = Product.objects.order_by('-numReviews')
    serializer = ProductSerializer(products, many = True)
    return Response(serializer.data)
    # print("getSort called")
    # print("products",products)
    # sortedproduct = products.order_by('numReviews')
    # print('sortedproduct',sortedproduct)
    # return Response("hello beautiful")

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many = True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializersWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
