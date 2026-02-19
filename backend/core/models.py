from django.conf import settings
from django.db import models


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
