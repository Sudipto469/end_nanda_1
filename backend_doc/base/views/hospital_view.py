from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..models import Product, Review, Hospital, Disease
# from ..serializer import ProductSerializer , HospitalSerializer
from ..serializers.hospitalSerializer import HospitalSerializer
from django.db.models import Q
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

@api_view(['GET'])
def getHospitals(request):
    query = request.query_params.get('keyword')
    # print("query",query)
    # # q= query.ToString()
    # print('q',len(query))
    if query == 'null':
        query = ''
    # filtered_disease = Q(zones__in=Zone.objects.filter(name__startswith='europe')

    Hospitals = Hospital.objects.filter(
        Q(hospital_name__icontains=query) | Q(hospital_address__icontains= query) |
        Q(diseases__disease_name__icontains= query)).order_by('-createdAt').distinct()
    # Hospitals = Hospital.objects.all()
    # | Q(diseases__icontains= query)
    serializer = HospitalSerializer(Hospitals,many = True)
    return Response(serializer.data)


# @api_view(['GET'])
# def getHospitals(request):
#     hospital = Hospital.objects.all()
#     # hospital = Hospital.
#     serializer = HospitalSerializer(hospital, many=True)
#     return Response(serializer.data)

# products = Product.objects.all()
#     serializer = ProductSerializer(products,many = True)
#     return Response(serializer.data)

@api_view(['GET'])
def getHospital(request,pk):
    # print("inside getHospital")
    hospital = Hospital.objects.get(id=pk)
    serializer = HospitalSerializer(hospital, many=False)
    return Response(serializer.data)

class hospitalListApiView(ListAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteHospital(request, pk):
    print("in delete")
    # print("in delete")
    hospital = Hospital.objects.get(id=pk)
    hospital.delete()
    return Response('Hospital Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createHospital(request):
    user = request.user

    hospital = Hospital.objects.create(
        user=user,
        hospital_name='Sample Hospital',
        # price=0,
        # brand='Sample Brand',
        # countInStock=0,
        # category='Sample Category',
        hospital_address=''
    )

    serializer = HospitalSerializer(hospital, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateHospital(request, pk):
    data = request.data
    print('469',data)
    hospital = Hospital.objects.get(id=pk)

    hospital.hospital_name = data['hospital_name']
    hospital.hospital_address = data['hospital_address']

    hospital.save()

    serializer = HospitalSerializer(hospital, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    hospital_id = data['hospital_id']
    hospital = Hospital.objects.get(id=hospital_id)

    hospital.image = request.FILES.get('image')
    hospital.save()

    return Response('Image was uploaded')
