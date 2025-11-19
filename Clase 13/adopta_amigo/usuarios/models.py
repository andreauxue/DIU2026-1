from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuarios(AbstractUser):
    # Opciones de roles
    ROLES = [
        ('admin', 'Administrador'),
        ('publicador', 'Publicador'),
        ('adoptante', 'Adoptante'),
    ]

    # Campo de rol con opciones predefinidas
    rol = models.CharField(max_length=20, choices=ROLES, default='adoptante')

    telefono = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_rol_display()})"
