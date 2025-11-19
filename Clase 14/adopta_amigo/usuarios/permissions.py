from rest_framework.permissions import BasePermission

class EsAdmin(BasePermission):
    """
    Permite acceso solo a usuarios con rol 'admin'.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.rol == 'admin')


class EsPublicador(BasePermission):
    """
    Permite acceso a usuarios con rol 'publicador' o 'admin'.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.rol in ['publicador', 'admin'])
