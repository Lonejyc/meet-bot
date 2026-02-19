from django.urls import path, re_path

from . import views

urlpatterns = [
    re_path(r"^health/?$", views.health_check, name="health-check"),

    # Auth (user)
    re_path(r"^auth/login/?$", views.login_view, name="auth-login"),
    re_path(r"^auth/logout/?$", views.logout_view, name="auth-logout"),
    re_path(r"^auth/me/?$", views.me_view, name="auth-me"),

    # Auth (admin)
    re_path(r"^auth/admin/login/?$", views.admin_login_view, name="admin-login"),

    # Admin actions
    re_path(r"^admin/users/?$", views.create_user_view, name="admin-create-user"),
]
