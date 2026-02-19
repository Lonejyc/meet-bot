from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers

from core.models import ExperienceSession

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    """Validates login credentials: email + 6-digit temporary code."""

    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate(self, attrs):
        email = attrs["email"]
        code = attrs["code"]

        # Look up user by email
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Identifiants incorrects."
            )

        if not user_obj.is_active:
            raise serializers.ValidationError(
                "Ce compte est désactivé."
            )

        # Find an active experience session matching the code
        now = timezone.now()
        try:
            session = ExperienceSession.objects.get(
                user=user_obj,
                code=code,
                starts_at__lte=now,
                expires_at__gte=now,
            )
        except ExperienceSession.DoesNotExist:
            raise serializers.ValidationError(
                "Code invalide ou session expirée."
            )

        attrs["user"] = user_obj
        attrs["session"] = session
        return attrs


class UserSerializer(serializers.Serializer):
    """Read-only representation of the authenticated user."""

    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
