from django.urls import path, re_path

from . import views

urlpatterns = [
    re_path(r"^health/?$", views.health_check, name="health-check"),

    # Auth
    re_path(r"^auth/login/?$", views.login_view, name="auth-login"),
    re_path(r"^auth/logout/?$", views.logout_view, name="auth-logout"),
    re_path(r"^auth/me/?$", views.me_view, name="auth-me"),
]
