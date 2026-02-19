from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):
    """
    Extends JWTAuthentication to read the access token from an httpOnly cookie
    instead of the Authorization header. Falls back to the header if no cookie.
    """

    def authenticate(self, request):
        # Try cookie first
        cookie_name = settings.SIMPLE_JWT.get("AUTH_COOKIE_ACCESS", "access_token")
        raw_token = request.COOKIES.get(cookie_name)

        if raw_token is not None:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token

        # Fall back to Authorization header
        return super().authenticate(request)
