from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class CookieJWTAuthentication(JWTAuthentication):
    """
    Extends JWTAuthentication to read the access token from an httpOnly cookie
    instead of the Authorization header. Falls back to the header if no cookie.

    If the cookie contains an expired or invalid token, the error is caught
    and ``None`` is returned so that views with ``AllowAny`` permission
    (e.g. the login endpoints) are not blocked by a stale cookie.
    """

    def authenticate(self, request):
        # Try cookie first
        cookie_name = settings.SIMPLE_JWT.get("AUTH_COOKIE_ACCESS", "access_token")
        raw_token = request.COOKIES.get(cookie_name)

        if raw_token is not None:
            try:
                validated_token = self.get_validated_token(raw_token)
                return self.get_user(validated_token), validated_token
            except (InvalidToken, TokenError):
                # Cookie exists but token is invalid/expired.
                # Return None so DRF treats the request as unauthenticated
                # and lets permission classes (e.g. AllowAny) decide.
                return None

        # Fall back to Authorization header
        return super().authenticate(request)
