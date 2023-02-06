from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import Product,Review , Hospital , Disease ,Lab , Clinic , HospitalFee , ClinicFee , LabFee

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

class Dummy_Hospital_Fee_Serializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalFee
        fields = ["id","fees","hospital_id","hospital_name","hospital_address"]


class Dummy_Clinic_Fee_Serializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicFee
        fields = ["id","fees","clinic_id","clinic_name","clinic_address"]

class Dummy_Lab_Fee_Serializer(serializers.ModelSerializer):
    class Meta:
        model = LabFee
        fields = ["id","fees","lab_id","lab_name","lab_address"]

# class Dummy_Clinic_Serializer(serializers.ModelSerializer):
#         class Meta:
#             model = Clinic
#             fields =["id","clinic_name","clinic_address"]

# class Dummy_Lab_Serializer(serializers.ModelSerializer):
#         class Meta:
#             model = Lab
#             fields =["id","lab_name","lab_address"]
#
# class Dummy_Hospital_Serializer(serializers.ModelSerializer):
#     # fees = Dummy_Hospital_Fee_Serializer(many=True)
#     class Meta:
#         model = Hospital
#         fields =["id","hospital_name","hospital_address"]

class Dummy_Disease_Serializer(serializers.ModelSerializer):
        class Meta:
            model = Disease
            fields =["id","disease_name","disease_symptoms"]


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    hospitalfees = Dummy_Hospital_Fee_Serializer(many=True)
    # hospitals = Dummy_Hospital_Serializer(many=True)
    diseases = Dummy_Disease_Serializer(many=True)
    # labs = Dummy_Lab_Serializer(many=True)
    # clinic = Dummy_Clinic_Serializer(many=True)
    clinicfees = Dummy_Clinic_Fee_Serializer(many=True)
    labfees = Dummy_Lab_Fee_Serializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self,obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


