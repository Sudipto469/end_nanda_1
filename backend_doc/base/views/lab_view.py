from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from ..models import Product, Review, Hospital, Lab
# from ..serializer import ProductSerializer , HospitalSerializer
from ..serializers.labSerialier import LabSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.db.models import Q

@api_view(['GET'])
def getLabs(request):
    query = request.query_params.get('keyword')
    if query == 'null':
        query = ''
    Labs = Lab.objects.filter(
        Q(lab_name__icontains=query) | Q(lab_address__icontains= query) |
        Q(diseases__disease_name__icontains= query)).order_by('-createdAt').distinct()
    serializer = LabSerializer(Labs,many = True)
    return Response(serializer.data)


# @api_view(['GET'])
# def getLabs(request):
#     lab = Lab.objects.all()
#     # hospital = Hospital.
#     serializer = LabSerializer(lab, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def getLab(request,pk):
    product = Lab.objects.get(id=pk)
    serializer = LabSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteLab(request, pk):
    print("in delete")
    # print("in delete")
    lab = Lab.objects.get(id=pk)
    lab.delete()
    return Response('Lab Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createLab(request):
    user = request.user

    lab = Lab.objects.create(
        user=user,
        lab_name='Sample Lab',
        # price=0,
        # brand='Sample Brand',
        # countInStock=0,
        # category='Sample Category',
        lab_address=''
    )

    serializer = LabSerializer(lab, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateLab(request, pk):
    data = request.data
    print('469',data)
    lab = Lab.objects.get(id=pk)

    lab.lab_name = data['lab_name']
    lab.lab_address = data['lab_address']

    lab.save()

    serializer = LabSerializer(lab, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    lab_id = data['lab_id']
    lab = Lab.objects.get(id=lab_id)

    lab.image = request.FILES.get('image')
    lab.save()

    return Response('Image was uploaded')
