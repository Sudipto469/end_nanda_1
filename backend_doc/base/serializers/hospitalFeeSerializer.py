from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Product,Review , Hospital , Disease , Lab , Clinic,HospitalFee , ClinicFee

class dummy_product(serializers.ModelSerializer):
        class Meta:
            model = Product
            fields = '__all__'
                # ['name','id','specialization']

class dummy_hospital(serializers.ModelSerializer):
        class Meta:
            model = Hospital
            fields = ['hospital_name','hospital_address','id']

class Hospital_Fee_Serializer(serializers.ModelSerializer):
    product = dummy_product(many=False)
    hospital = dummy_hospital(many=False)
    class Meta:
        model = HospitalFee
        fields = ["fees","product","hospital"]
