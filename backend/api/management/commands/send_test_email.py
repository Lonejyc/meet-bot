"""
Send a test invitation email without creating a user.

Usage:
    python manage.py send_test_email recipient@example.com
    python manage.py send_test_email recipient@example.com --code 076419
"""

from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from api.emails import send_invitation_email


class Command(BaseCommand):
    help = "Send a test MeetBot invitation email"

    def add_arguments(self, parser):
        parser.add_argument("email", type=str, help="Recipient email address")
        parser.add_argument(
            "--code",
            type=str,
            default="076419",
            help="6-digit code to display (default: 076419)",
        )

    def handle(self, *args, **options):
        email = options["email"]
        code = options["code"]
        starts_at = timezone.now() + timedelta(hours=1)
        expires_at = starts_at + timedelta(days=2)

        self.stdout.write(f"Sending test email to {email}...")

        try:
            send_invitation_email(email, code, starts_at, expires_at)
            self.stdout.write(self.style.SUCCESS(f"Email sent to {email}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Failed: {e}"))
