# Importamos las clases necesarias de Django REST Framework
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
# Importamos permisos personalizados desde nuestra aplicación
from usuarios.permissions import EsPublicador, EsAdmin
# Importamos los modelos y serializadores de nuestra aplicación
from .models import Mascota, Especie
from .serializers import MascotaSerializer, EspecieSerializer

class MascotaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar todas las operaciones CRUD de Mascotas
    
    Un ViewSet es una clase que proporciona automáticamente las operaciones:
    list (GET), create (POST), retrieve (GET individual), update (PUT), partial_update (PATCH), destroy (DELETE)
    """
    
    # Definimos el conjunto de datos inicial (todas las mascotas en la base de datos)
    queryset = Mascota.objects.all()
    # Especificamos qué serializador usar para convertir entre objetos Python y JSON
    serializer_class = MascotaSerializer
    # Permisos por defecto: lectura libre, escritura requiere autenticación
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        """
        Método que define los permisos específicos según el tipo de petición HTTP
        
        Este método se ejecuta automáticamente para cada petición y determina
        qué permisos debe cumplir el usuario para acceder a la vista
        """
        # Para métodos de escritura (POST, PUT, PATCH, DELETE) requerimos:
        # - Que el usuario esté autenticado (IsAuthenticatedOrReadOnly)
        # - Que tenga el rol de publicador (EsPublicador)
        if self.request.method in ["POST", "PUT", "PATCH", "DELETE"]:
            return [IsAuthenticatedOrReadOnly(), EsPublicador()]
        
        # Para métodos de lectura (GET) solo requerimos IsAuthenticatedOrReadOnly
        # que permite acceso libre a usuarios no autenticados
        return [IsAuthenticatedOrReadOnly()]
    
    def perform_create(self, serializer):
        """
        Método que se ejecuta automáticamente al crear una nueva mascota
        
        Asigna automáticamente el usuario actual como el publicador de la mascota
        sin necesidad de que el cliente envíe esta información
        """
        # Guarda la mascota asignando el usuario actual como publicador
        serializer.save(publicador=self.request.user)

        
class EspecieViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar todas las operaciones CRUD de Especies
    
    Las especies son categorías como "Perro", "Gato", etc. que clasifican las mascotas
    """
    
    # Todas las especies en la base de datos
    queryset = Especie.objects.all()
    # Serializador para convertir objetos Especie
    serializer_class = EspecieSerializer

    def get_permissions(self):
        """
        Método que define permisos diferenciados para lectura y escritura de especies
        """
        # Para métodos de lectura (GET, HEAD, OPTIONS): acceso libre para todos
        # HEAD: obtener solo headers, OPTIONS: obtener información de la API
        if self.request.method in ["GET", "HEAD", "OPTIONS"]:
            return [AllowAny()]  # Cualquier persona puede ver las especies

        # Para métodos de escritura (POST, PUT, PATCH, DELETE): 
        # - Usuario debe estar autenticado (IsAuthenticated)
        # - Usuario debe ser administrador (EsAdmin)
        return [IsAuthenticated(), EsAdmin()]