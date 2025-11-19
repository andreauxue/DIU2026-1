from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from mascotas.views import MascotaViewSet, EspecieViewSet
from usuarios import views as usuario_views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r"mascotas", MascotaViewSet)
router.register(r"especies", EspecieViewSet)
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/register/", usuario_views.register, name="register"),
    path("api/login/", usuario_views.login_view, name="login"),
    path("api/logout/", usuario_views.logout_view, name="logout"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
