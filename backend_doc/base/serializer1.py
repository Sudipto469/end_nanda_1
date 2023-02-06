from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product,Review , Hospital , Disease
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        # print("model", object)
        fields = ['id','username','email', 'name', 'isAdmin']

    def get_name(self,object):
        name = object.first_name
        if name == '':
            name = object.email
        return name

    def get_isAdmin(self,obj):
        return obj.is_staff

class UserSerializersWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        # print("model" , model)
        fields = ['id','username','email', 'name' , 'isAdmin', 'token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields = ['disease_name','disease_symptoms']

class d_hos_ProductSerializer(serializers.ModelSerializer):
    # reviews = serializers.SerializerMethodField(read_only=True)
    # hospitals = HospitalSerializer(many=True)
    # diseases = DiseaseSerializer(many=True)
    class Meta:
        model = Product
        fields = ['product_name','id','specialization']

class HospitalSerializer(serializers.ModelSerializer):
    # reviews = serializers.SerializerMethodField(read_only=True)
    diseases = DiseaseSerializer(many=True)
    product = d_hos_ProductSerializer(many=True)
    class Meta:
        model = Hospital
        fields = ['hospital_name','hospital_address','diseases','image','product']
        # ['name','school']


# class DiseaseSerializer(serializers.ModelSerializer):
#         diseases = DiseaseSerializer(many=True)

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    hospitals = HospitalSerializer(many=True)
    diseases = DiseaseSerializer(many=True)
    class Meta:
        model = Product
        fields = '__all__'
        # ['name','school']

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    # def get_reviews(self,obj):
    #     reviews = obj.review_set.all()
    #     serializer = ReviewSerializer(reviews,many=True)
    #     return serializer.data


