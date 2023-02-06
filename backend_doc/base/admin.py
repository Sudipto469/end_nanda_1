from django.contrib import admin
from .models import Product,Hospital,Disease,Lab,Clinic,HospitalFee,ClinicFee,LabFee
    # , Disease_test
    # ,Hospital_fee
from .models import Review
    # , IM_product , IM_hospital
# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Hospital)
admin.site.register(Disease)
admin.site.register(Lab)
admin.site.register(Clinic)
admin.site.register(ClinicFee)
admin.site.register(LabFee)
admin.site.register(HospitalFee)
