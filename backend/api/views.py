import logging
from datetime import timedelta

from django.conf import settings

logger = logging.getLogger(__name__)
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

from .emails import send_invitation_email
from .serializers import (
    AdminLoginSerializer,
    CreateUserSerializer,
    LoginSerializer,
    UserSerializer,
)


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    return Response({"status": "ok"})


# ---------------------------------------------------------------------------
# Auth helpers
# ---------------------------------------------------------------------------

def _get_cookie_settings():
    """Return common cookie kwargs from settings."""
    jwt = settings.SIMPLE_JWT
    return {
        "httponly": jwt["AUTH_COOKIE_HTTP_ONLY"],
        "samesite": jwt["AUTH_COOKIE_SAMESITE"],
        "secure": jwt["AUTH_COOKIE_SECURE"],
        "path": jwt["AUTH_COOKIE_PATH"],
    }


def _set_access_cookie(response, access_token, max_age_seconds):
    """Set a single access JWT token as an httpOnly cookie."""
    jwt = settings.SIMPLE_JWT
    cookie = _get_cookie_settings()

    response.set_cookie(
        key=jwt["AUTH_COOKIE_ACCESS"],
        value=str(access_token),
        max_age=int(max_age_seconds),
        **cookie,
    )
    return response


def _clear_auth_cookies(response):
    """Delete auth cookies."""
    jwt = settings.SIMPLE_JWT
    cookie = _get_cookie_settings()

    response.delete_cookie(jwt["AUTH_COOKIE_ACCESS"], **cookie)
    return response


# ---------------------------------------------------------------------------
# User auth views
# ---------------------------------------------------------------------------

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """
    POST /api/auth/login/
    Body: { "email": "...", "code": "123456" }
    Validates the temporary code against an active ExperienceSession,
    then sets an httpOnly cookie with a JWT whose lifetime matches the
    remaining session duration.
    """
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data["user"]
    session = serializer.validated_data["session"]

    # Calculate remaining experience time
    remaining = session.expires_at - timezone.now()
    remaining_seconds = max(int(remaining.total_seconds()), 1)

    # Issue an access token with custom lifetime = remaining experience time
    token = AccessToken()
    token["user_id"] = str(user.pk)
    token.set_exp(lifetime=timedelta(seconds=remaining_seconds))

    response = Response(
        {"detail": "Connexion réussie."},
        status=status.HTTP_200_OK,
    )
    return _set_access_cookie(response, token, remaining_seconds)


@api_view(["POST"])
@permission_classes([AllowAny])
def logout_view(request):
    """
    POST /api/auth/logout/
    Clears auth cookies.
    """
    response = Response(
        {"detail": "Déconnexion réussie."},
        status=status.HTTP_200_OK,
    )
    return _clear_auth_cookies(response)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    """
    GET /api/auth/me/
    Returns the authenticated user's info.
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# ---------------------------------------------------------------------------
# Admin views
# ---------------------------------------------------------------------------

ADMIN_TOKEN_LIFETIME = timedelta(hours=24)


@api_view(["POST"])
@permission_classes([AllowAny])
def admin_login_view(request):
    """
    POST /api/auth/admin/login/
    Body: { "username": "...", "password": "..." }
    Authenticates a staff user and sets a 24h JWT cookie.
    """
    serializer = AdminLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.validated_data["user"]

    token = AccessToken()
    token["user_id"] = str(user.pk)
    token["is_staff"] = True
    token.set_exp(lifetime=ADMIN_TOKEN_LIFETIME)

    response = Response(
        {"detail": "Connexion admin réussie."},
        status=status.HTTP_200_OK,
    )
    return _set_access_cookie(
        response, token, int(ADMIN_TOKEN_LIFETIME.total_seconds())
    )


@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_user_view(request):
    """
    POST /api/admin/users/
    Body: { "email": "...", "starts_at": "...", "expires_at": "..." }
    Creates a user + experience session and sends an invitation email.
    """
    serializer = CreateUserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    result = serializer.save()
    user = result["user"]
    session = result["session"]

    # Send the invitation email
    try:
        send_invitation_email(
            email=user.email,
            code=session.code,
            starts_at=session.starts_at,
            expires_at=session.expires_at,
        )
        email_sent = True
    except Exception as e:
        logger.error("Failed to send invitation email to %s: %s", user.email, e, exc_info=True)
        email_sent = False

    return Response(
        {
            "detail": "Utilisateur créé avec succès.",
            "user": {
                "id": user.pk,
                "email": user.email,
                "username": user.username,
            },
            "session": {
                "code": session.code,
                "starts_at": session.starts_at.isoformat(),
                "expires_at": session.expires_at.isoformat(),
            },
            "email_sent": email_sent,
        },
        status=status.HTTP_201_CREATED,
    )
