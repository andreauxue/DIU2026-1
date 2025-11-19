# Importamos las librerías necesarias para el serializador
from rest_framework import serializers
from django.contrib.auth import get_user_model

# Obtenemos el modelo de usuario personalizado de Django
Usuario = get_user_model()

# Definimos nuestro serializador para el modelo Usuario
class UsuarioSerializer(serializers.ModelSerializer):
    
    # Clase Meta para configurar el comportamiento del serializador
    class Meta:
        model = Usuario  # Especificamos qué modelo vamos a serializar
        # Lista de campos que serán incluidos en la serialización
        fields = ["id", "username", "email", "password", "telefono", "rol"]
        
        # Configuraciones adicionales para los campos
        extra_kwargs = {
            # El campo password será de solo escritura, no se mostrará en las respuestas
            "password": {"write_only": True}
        }

    # Método de validación personalizado para el campo 'rol'
    def validate_rol(self, value):
        """
        Valida que ningún usuario pueda registrarse con el rol 'admin'
        
        value: el valor del rol que se está intentando asignar
        """
        # Verificamos si el valor del rol es 'admin'
        if value == "admin":
            # Si es admin, lanzamos un error de validación
            raise serializers.ValidationError("No puedes registrarte como admin.")
        
        # Si no es admin, retornamos el valor para que continúe el proceso normal
        return value