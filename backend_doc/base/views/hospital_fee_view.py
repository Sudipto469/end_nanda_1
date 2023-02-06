from rest_framework.response import Response
from ..models import Product, Review, Hospital, Clinic, Disease,HospitalFee
# from ..serializer import ProductSerializer , HospitalSerializer
from ..serializers.hospitalFeeSerializer import Hospital_Fee_Serializer
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
def getHospitalFeeView(request):
    hospital_fee = HospitalFee.objects.all()
    # hospital = Hospital.
    serializer = Hospital_Fee_Serializer(hospital_fee, many=True)
    return Response(serializer.data)
