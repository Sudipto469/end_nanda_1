from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Product,Review , Hospital , Disease , HospitalFee
from .diseaseSerializer import DiseaseSerializer
# from .productSerializer import Dummy_Disease_Serializer

class Dummy_HospitalFee_Serializer(serializers.ModelSerializer):
        class Meta:
            model = HospitalFee
            fields =["fees","id","specialization","name","HospitalFee_id"]

class Dummy_Disease_Serializer(serializers.ModelSerializer):
        class Meta:
            model = Disease
            fields =["disease_name","disease_symptoms","id"]

# class d_hos_ProductSerializer(serializers.ModelSerializer):
#     # reviews = serializers.SerializerMethodField(read_only=True)
#     # hospitals = HospitalSerializer(many=True)
#     # diseases = DiseaseSerializer(many=True)
#     class Meta:
#         model = Product
#         fields = ['name','id','specialization']

class HospitalSerializer(serializers.ModelSerializer):
    # reviews = serializers.SerializerMethodField(read_only=True)
    diseases = Dummy_Disease_Serializer(many=True)
    # product = d_hos_ProductSerializer(many=True)
    hospitalfees = Dummy_HospitalFee_Serializer(many=True)
    class Meta:
        model = Hospital
        fields = ['hospital_name','hospital_address','diseases','image','product','id', 'hospitalfees']
