# Importamos las librerías necesarias para autenticación y API
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UsuarioSerializer
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

# Obtenemos el modelo de usuario personalizado de Django
Usuario = get_user_model()

# Definimos los roles que los usuarios pueden elegir al registrarse
ROLES_PERMITIDOS = ["publicador", "adoptante"]

# Deshabilitamos la protección CSRF para permitir peticiones desde diferentes dominios
@csrf_exempt
# Esta vista solo acepta peticiones POST
@api_view(["POST"])
# Permitimos que cualquier persona acceda a esta vista (sin necesidad de estar autenticado)
@permission_classes([AllowAny])
def register(request):
    """
    Vista para registrar nuevos usuarios en el sistema
    """
    # Creamos un serializador con los datos recibidos en la petición
    serializer = UsuarioSerializer(data=request.data)

    # Verificamos si los datos pasan todas las validaciones del serializador
    if serializer.is_valid():
        # Obtenemos el rol enviado en la petición, por defecto "adoptante" si no se especifica
        rol_enviado = request.data.get("rol", "adoptante")

        # Validamos que el rol enviado esté entre los permitidos
        if rol_enviado not in ROLES_PERMITIDOS:
            return Response(
                {"error": "Rol no permitido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Creamos el nuevo usuario en la base de datos
        # create_user se encarga de hashear el password automáticamente
        nuevo_usuario = Usuario.objects.create_user(
            username=request.data["username"],
            password=request.data["password"],
            email=request.data.get("email", ""),
            rol=rol_enviado
        )

        # Retornamos una respuesta exitosa con los datos del usuario creado
        return Response(
            {
                "message": "Usuario creado correctamente",
                "usuario": {
                    "id": nuevo_usuario.id,
                    "username": nuevo_usuario.username,
                    "email": nuevo_usuario.email,
                    "rol": nuevo_usuario.rol
                },
                "roles_disponibles": ROLES_PERMITIDOS,
            },
            status=status.HTTP_201_CREATED
        )

    # Si el serializador no es válido, retornamos los errores de validación
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Vista para iniciar sesión
@api_view(["POST"])
# Cualquier persona puede intentar iniciar sesión
@permission_classes([AllowAny])
def login_view(request):
    """
    Vista para autenticar usuarios y crear una sesión
    """
    # Extraemos username y password del cuerpo de la petición
    username = request.data.get("username")
    password = request.data.get("password")

    # Autenticamos al usuario con las credenciales proporcionadas
    # authenticate verifica si username y password coinciden con un usuario en la BD
    user = authenticate(request, username=username, password=password)

    # Si las credenciales son incorrectas, retornamos un error
    if user is None:
        return Response({"error": "Credenciales inválidas"}, status=401)

    # Si las credenciales son correctas, creamos una sesión para el usuario
    # login() establece la sesión en el objeto request
    login(request, user)

    # Guardamos la sesión en la base de datos para que persista
    # Esto crea la cookie de sesión que se enviará al cliente
    request.session.save()

    # Retornamos una respuesta exitosa con información del usuario
    return Response({
        "message": "Login exitoso",
        "user": {
            "id": user.id,
            "username": user.username,
            "rol": user.rol
        }
    })


# Vista para cerrar sesión
@api_view(["POST"])
# Solo usuarios autenticados pueden cerrar sesión
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Vista para cerrar la sesión del usuario actual
    """
    # Cerramos la sesión del usuario
    # Esto elimina la información de autenticación del request y la sesión
    logout(request)
    
    # Retornamos confirmación del cierre de sesión
    return Response({"message": "Sesión cerrada correctamente"})