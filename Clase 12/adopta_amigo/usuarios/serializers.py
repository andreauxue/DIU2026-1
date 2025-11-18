from rest_framework import serializers 
from django.contrib.auth import get_user_model
from mascotas.models import Mascota

Usuario = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "username", "email", "telefono", "rol"]
