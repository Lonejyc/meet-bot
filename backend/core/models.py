import random
import string

from django.conf import settings
from django.db import models
from django.utils import timezone


class Organization(models.Model):
    name = models.CharField(max_length=64)

    class Meta:
        db_table = "core_organization"

    def __str__(self):
        return self.name


class UserGroup(models.Model):
    name = models.CharField(max_length=64)
    organization = models.ForeignKey(
        Organization,
        on_delete=models.PROTECT,
        related_name="user_groups",
    )

    class Meta:
        db_table = "core_usergroup"

    def __str__(self):
        return self.name


class DeviceGroup(models.Model):
    name = models.CharField(max_length=64)
    organization = models.ForeignKey(
        Organization,
        on_delete=models.PROTECT,
        related_name="device_groups",
    )

    class Meta:
        db_table = "core_devicegroup"

    def __str__(self):
        return self.name


class Device(models.Model):
    name = models.CharField(max_length=64)
    location = models.CharField(max_length=64)
    time_zone = models.CharField(max_length=64)
    is_active = models.BooleanField(default=True)
    group = models.ForeignKey(
        DeviceGroup,
        on_delete=models.PROTECT,
        related_name="devices",
        null=True,
        blank=True,
    )
    organization = models.ForeignKey(
        Organization,
        on_delete=models.PROTECT,
        related_name="devices",
        null=True,
        blank=True,
    )

    class Meta:
        db_table = "core_device"

    def __str__(self):
        return self.name


class DeviceGroupMembership(models.Model):
    inherit_default_access = models.BooleanField(default=True)
    device_group = models.ForeignKey(
        DeviceGroup,
        on_delete=models.PROTECT,
        related_name="memberships",
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="device_group_memberships",
        null=True,
        blank=True,
    )
    user_group = models.ForeignKey(
        UserGroup,
        on_delete=models.PROTECT,
        related_name="device_group_memberships",
        null=True,
        blank=True,
    )

    class Meta:
        db_table = "core_devicegroupmembership"

    def __str__(self):
        target = self.user or self.user_group or "—"
        return f"{self.device_group} → {target}"


def _generate_code():
    """Generate a random 6-digit numeric code."""
    return "".join(random.choices(string.digits, k=6))


class ExperienceSession(models.Model):
    """
    A time-bounded session granting a user access via a temporary code.
    Created by an admin; the 6-digit code is auto-generated.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="experience_sessions",
    )
    code = models.CharField(
        max_length=6,
        default=_generate_code,
        editable=False,
        help_text="Code temporaire à 6 chiffres (généré automatiquement).",
    )
    starts_at = models.DateTimeField(
        help_text="Début de l'expérience.",
    )
    expires_at = models.DateTimeField(
        help_text="Fin de l'expérience.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "core_experiencesession"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} — {self.code} ({self.starts_at:%d/%m %H:%M} → {self.expires_at:%d/%m %H:%M})"

    @property
    def is_active(self):
        """True if the current time falls within the session window."""
        now = timezone.now()
        return self.starts_at <= now <= self.expires_at

    @property
    def remaining_seconds(self):
        """Seconds left until the session expires. 0 if already expired."""
        remaining = (self.expires_at - timezone.now()).total_seconds()
        return max(0, remaining)
