from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Product,Review , Hospital , Disease , Lab , Clinic

class dummy_product(serializers.ModelSerializer):
        class Meta:
            model = Product
            fields = ['name','id','specialization']

class dummy_hospital(serializers.ModelSerializer):
        class Meta:
            model = Hospital
            fields = ['hospital_name','hospital_address','id']

class dummy_clinic(serializers.ModelSerializer):
        class Meta:
            model = Clinic
            fields = ['clinic_name','clinic_address','id']

class dummy_lab(serializers.ModelSerializer):
        class Meta:
            model = Lab
            fields = ['lab_name','lab_address','id']


class DiseaseSerializer(serializers.ModelSerializer):
    product = dummy_product(many=True)
    hospital = dummy_hospital(many=True)
    clinic = dummy_clinic(many=True)
    lab = dummy_lab(many=True)
    class Meta:
        model = Disease
        fields = ['disease_name','disease_symptoms','product','clinic','hospital','lab','id']
