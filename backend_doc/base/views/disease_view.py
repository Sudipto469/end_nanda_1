from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..models import Product, Review, Hospital, Clinic, Disease
# from ..serializer import ProductSerializer , HospitalSerializer
from ..serializers.diseaseSerializer import DiseaseSerializer

@api_view(['GET'])
def getDiseases(request):
    disease = Disease.objects.all()
    # hospital = Hospital.
    serializer = DiseaseSerializer(disease, many=True)
    return Response(serializer.data)
