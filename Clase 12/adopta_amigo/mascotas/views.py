from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MascotaSerializer
from .models import Mascota
from rest_framework.permissions import IsAuthenticated 
from usuarios.permissions import EsPublicador

class MascotaViewSet(viewsets.ModelViewSet):
    queryset = Mascota.objects.all()
    serializer_class = MascotaSerializer
    permissions_clasees = [IsAuthenticated, EsPublicador]
    
    def perform_create(self, serializer):
        serializer.save(publicador=self.request.user)
    