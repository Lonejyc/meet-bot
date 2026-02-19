from django.contrib.auth import authenticate, get_user_model
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


# ---------------------------------------------------------------------------
# Admin serializers
# ---------------------------------------------------------------------------

class AdminLoginSerializer(serializers.Serializer):
    """Validates admin login: username + password, must be staff."""

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs["username"]
        password = attrs["password"]

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError(
                "Identifiants incorrects."
            )

        if not user.is_staff:
            raise serializers.ValidationError(
                "Accès réservé aux administrateurs."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "Ce compte est désactivé."
            )

        attrs["user"] = user
        return attrs


class CreateUserSerializer(serializers.Serializer):
    """Creates a user + experience session from an email and time window."""

    email = serializers.EmailField()
    starts_at = serializers.DateTimeField()
    expires_at = serializers.DateTimeField()

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Un utilisateur avec cet email existe déjà."
            )
        return value

    def validate(self, attrs):
        if attrs["starts_at"] >= attrs["expires_at"]:
            raise serializers.ValidationError(
                "La date de début doit être antérieure à la date de fin."
            )
        return attrs

    def create(self, validated_data):
        email = validated_data["email"]
        starts_at = validated_data["starts_at"]
        expires_at = validated_data["expires_at"]

        # Generate username from email prefix (add suffix if taken)
        base_username = email.split("@")[0]
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        # Create the user (unusable password — login is code-based)
        user = User.objects.create_user(
            username=username,
            email=email,
        )
        user.set_unusable_password()
        user.save()

        # Create the experience session (code is auto-generated)
        session = ExperienceSession.objects.create(
            user=user,
            starts_at=starts_at,
            expires_at=expires_at,
        )

        return {"user": user, "session": session}
