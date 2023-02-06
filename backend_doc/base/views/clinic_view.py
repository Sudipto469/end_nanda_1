from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..models import Product, Review, Hospital, Clinic
# from ..serializer import ProductSerializer , HospitalSerializer
from ..serializers.clinicSerializer import ClinicSerializer
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, IsAdminUser

@api_view(['GET'])
def getClinics(request):
    query = request.query_params.get('keyword')
    # print("query",query)
    # # q= query.ToString()
    # print('q',len(query))
    if query == 'null':
        query = ''
    # filtered_disease = Q(zones__in=Zone.objects.filter(name__startswith='europe')
    Clinics = Clinic.objects.filter(
        Q(clinic_name__icontains=query) | Q(clinic_address__icontains= query) |
        Q(diseases__disease_name__icontains= query)).order_by('-createdAt').distinct()
    # products = Product.objects.all()
    # | Q(diseases__icontains= query)
    serializer = ClinicSerializer(Clinics,many = True)
    return Response(serializer.data)

# @api_view(['GET'])
# def getClinics(request):
#     clinic = Clinic.objects.all()
#     # hospital = Hospital.
#     serializer = ClinicSerializer(clinic, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def getClinic(request,pk):
    # print("inside getHospital")
    hospital = Clinic.objects.get(id=pk)
    serializer = ClinicSerializer(hospital, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteClinic(request, pk):
    print("in delete")
    # print("in delete")
    clinic = Clinic.objects.get(id=pk)
    clinic.delete()
    return Response('Hospital Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createClinic(request):
    user = request.user

    clinic = Clinic.objects.create(
        user=user,
        clinic_name='Sample clinic',
        # price=0,
        # brand='Sample Brand',
        # countInStock=0,
        # category='Sample Category',
        clinic_address=''
    )

    serializer = ClinicSerializer(clinic, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateClinic(request, pk):
    data = request.data
    print('469',data)
    clinic = Clinic.objects.get(id=pk)

    clinic.clinic_name = data['clinic_name']
    clinic.clinic_address = data['clinic_address']

    clinic.save()

    serializer = ClinicSerializer(clinic, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    clinic_id = data['clinic_id']
    clinic = Clinic.objects.get(id=clinic_id)

    clinic.image = request.FILES.get('image')
    clinic.save()

    return Response('Image was uploaded')
