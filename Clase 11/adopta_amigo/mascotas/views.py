from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MascotaSerializer
from .models import Mascota


class MascotaViewSet(viewsets.ModelViewSet):
    queryset = Mascota.objects.all()
    serializer_class = MascotaSerializer
        
    