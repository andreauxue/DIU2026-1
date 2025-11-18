from rest_framework.permissions import BasePermission 

class EsAdmin(BasePermission):
    """
    Esto permitirá el acceso a usuarios solo con el rol de administrador
    
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.rol == 'admin')
    
 
class EsPublicador(BasePermission):
    """
    Esto permitirá el acceso a usuarios solo con el rol de 'publicador' o 'admin'
    
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.rol in ['publicador', 'admin'])
    
 