# Importamos las librerías necesarias para los serializadores
from rest_framework import serializers
from django.contrib.auth import get_user_model
# Importamos los modelos de nuestra aplicación mascotas
from mascotas.models import Mascota, Especie

# Obtenemos el modelo de usuario personalizado de Django
Usuario = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Usuario
    
    Convierte objetos Usuario a JSON y valida datos para crear/actualizar usuarios
    """
    class Meta:
        model = Usuario  # Especificamos qué modelo vamos a serializar
        # Lista de campos que se incluirán en la representación JSON
        # NOTA: No incluimos 'password' por seguridad
        fields = ["id", "username", "email", "telefono", "rol"]

class MascotaSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Mascota
    
    Maneja la conversión entre objetos Mascota y JSON, incluyendo
    información del usuario que publicó la mascota
    """
    # Campo publicador: usa UsuarioSerializer para mostrar datos completos del usuario
    # read_only=True: este campo no se espera en los datos de entrada del cliente
    #                 solo se usa para mostrar información en las respuestas
    publicador = UsuarioSerializer(read_only=True)

    class Meta:
        model = Mascota  # Modelo que representa este serializador
        fields = "__all__"  # Incluye todos los campos del modelo Mascota
        # Campos que son de solo lectura - el cliente no puede modificarlos
        # DRF ignorará estos campos si se envían en las peticiones POST/PUT
        read_only_fields = ["publicador"]

class EspecieSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Especie
    
    Maneja la conversión entre objetos Especie y JSON
    Las especies son categorías como "Perro", "Gato", etc.
    """
    class Meta:
        model = Especie  # Modelo que representa este serializador
        fields = "__all__"  # Incluye todos los campos del modelo Especie