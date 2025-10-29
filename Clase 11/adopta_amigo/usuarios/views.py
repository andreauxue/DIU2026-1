from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated 
from rest_framework.response import Response 
from rest_framework import status

from .serializers import UsuarioSerializer 
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

Usuario = get_user_model()

@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UsuarioSerializer(data=request.data)
    
    if serializer.is_valid():
        Usuario.objects.create_user(
            username=request.data["username"],
            password=request.data["password"],
            email=request.data.get("email", "")
        )
        return Response({"message": "Usuario creado!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.error, status=status.HTTP_400_CREATED)
    

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return Response({"message": f"Bienvenido/a {user.username}"})
    return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"message": "Sesión cerrada correctamente"})


