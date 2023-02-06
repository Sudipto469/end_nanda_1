from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Product,Review , Hospital , Disease ,Clinic , ClinicFee
from .diseaseSerializer import DiseaseSerializer
# from .productSerializer import Dummy_Disease_Serializer

class ClinicFee_Serializer(serializers.ModelSerializer):
        class Meta:
            model = ClinicFee
            fields =["fees","id","specialization","name","ClinicFee_id"]

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

class ClinicSerializer(serializers.ModelSerializer):
    # reviews = serializers.SerializerMethodField(read_only=True)
    diseases = Dummy_Disease_Serializer(many=True)
    # product = d_hos_ProductSerializer(many=True)
    clinicfees = ClinicFee_Serializer(many=True)
    class Meta:
        model = Clinic
        fields = ['clinic_name','clinic_address','diseases','image','id','clinicfees']
