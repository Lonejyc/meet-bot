from django.contrib import admin

from .models import (
    Device,
    DeviceGroup,
    DeviceGroupMembership,
    ExperienceSession,
    Organization,
    UserGroup,
)


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(UserGroup)
class UserGroupAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "organization")
    list_filter = ("organization",)
    search_fields = ("name",)


@admin.register(DeviceGroup)
class DeviceGroupAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "organization")
    list_filter = ("organization",)
    search_fields = ("name",)


@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "location", "time_zone", "is_active", "group", "organization")
    list_filter = ("is_active", "organization", "group")
    search_fields = ("name", "location")


@admin.register(DeviceGroupMembership)
class DeviceGroupMembershipAdmin(admin.ModelAdmin):
    list_display = ("id", "device_group", "user", "user_group", "inherit_default_access")
    list_filter = ("inherit_default_access", "device_group")


@admin.register(ExperienceSession)
class ExperienceSessionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "code", "starts_at", "expires_at", "is_active_display")
    list_filter = ("starts_at", "expires_at")
    search_fields = ("user__username", "user__email", "code")
    readonly_fields = ("code", "created_at")

    @admin.display(boolean=True, description="Active")
    def is_active_display(self, obj):
        return obj.is_active
