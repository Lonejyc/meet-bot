"""
Branded HTML email builder for MeetBot invitation emails.
Uses Resend (https://resend.com) for email delivery.
"""

import os

import resend
from django.conf import settings

# Path to the logo PNG (embedded as inline image via CID)
LOGO_PATH = os.path.join(os.path.dirname(__file__), "static", "logo-meetbot.png")


def send_invitation_email(email, code, starts_at, expires_at):
    """
    Send a branded HTML invitation email with the 6-digit login code.
    """
    resend.api_key = settings.RESEND_API_KEY

    login_url = f"{settings.FRONTEND_URL}/login"

    # Format dates in French
    start_str = starts_at.strftime("%d/%m/%Y à %Hh%M")
    end_str = expires_at.strftime("%d/%m/%Y à %Hh%M")

    # Format code with spaces for readability (e.g. "0 7 6 4 1 9")
    spaced_code = " ".join(code)

    # Plain text fallback
    text_content = (
        f"Le Colisée et vos proches, chez vous !\n\n"
        f"Vos proches viennent de vous prendre un billet pour visiter avec eux "
        f"Le Colisée de Rome depuis chez vous en contrôlant un meetbot.\n\n"
        f"Votre session est prévue du {start_str} au {end_str}.\n\n"
        f"Pour effectuer le tutoriel et lire les règles d'utilisations, "
        f"nous vous invitons à vous rendre sur ce lien : {login_url}\n\n"
        f"Voici votre code temporaire pour vous connecter : {code}\n\n"
        f"Si vous avez la moindre question, vous pouvez nous contacter "
        f"par email.\n"
    )

    # Branded HTML email matching the maquette design
    html_content = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;800;900&display=swap');
    * {{ font-family: 'Unbounded', 'Helvetica Neue', Arial, sans-serif !important; }}
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#5D31FF;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:36px 40px 0;">
              <img src="cid:meetbot-logo" alt="meetbot." width="192" height="80" style="display:block; width:192px; height:auto;" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 40px 32px;">
              <h1 style="margin:0; font-size:32px; line-height:1.2; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
                <em style="color:#C7FF39; font-weight:500;">Le Colisée et vos proches,</em><br>
                <em style="color:#C7FF39; font-weight:800;">chez vous !</em>
              </h1>
            </td>
          </tr>

          <!-- White card -->
          <tr>
            <td>
              <table role="presentation" width="90%" cellspacing="0" cellpadding="0" align="center" style="background-color:#FFFFFF; margin:0 auto;">
                <tr>
                  <td style="padding:36px 40px;">

                    <!-- Body text -->
                    <p style="margin:0 0 16px; font-size:14px; color:#5D31FF; line-height:1.7; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
                      Vos proches viennent de vous prendre un billet pour
                      visiter avec eux Le Colisée de Rome depuis chez vous
                      en contrôlant un <strong>meetbot.</strong>
                    </p>
                    <p style="margin:0 0 24px; font-size:14px; color:#5D31FF; line-height:1.7; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
                      Pour effectuer le tutoriel et lire les règles d'utilisations,
                      nous vous invitons à vous rendre sur ce lien :
                    </p>

                    <!-- Link -->
                    <p style="margin:0 0 28px; font-size:14px; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
                      <a href="{login_url}" style="color:#1B1919; text-decoration:none; font-weight:700;">
                        {login_url}
                      </a>
                    </p>

                    <!-- Session dates (sentence) -->
                    <p style="margin:0 0 28px; font-size:14px; color:#5D31FF; line-height:1.7; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
                      Votre session est prévue du <strong>{start_str}</strong> au <strong>{end_str}</strong>.
                    </p>

                    <!-- Code label -->
                    <p style="margin:0 0 16px; font-size:14px; color:#5D31FF; font-weight:700; line-height:1.5; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
                      Voici votre code temporaire pour vous connecter :
                    </p>

                    <!-- Code -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="padding-bottom:28px;">
                          <p style="margin:0; font-size:36px; font-weight:900; letter-spacing:10px; color:#5D31FF; font-family:'Unbounded','Courier New',monospace;">
                            {spaced_code}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA button -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                      <tr>
                        <td align="center">
                          <a href="{login_url}"
                             style="display:inline-block; background-color:#C7FF39; color:#5D31FF; font-size:14px; font-weight:700; text-decoration:none; padding:14px 40px; border-radius:999px; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
                            Se connecter
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Footer text -->
                    <p style="margin:0; font-size:12px; color:#1B1919; opacity:0.5; line-height:1.6; text-align:center; font-family:'Unbounded','Helvetica Neue',Arial,sans-serif;">
                      Si vous avez la moindre question, vous pouvez nous contacter par email.
                    </p>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""

    # Read logo PNG for inline attachment
    logo_bytes = open(LOGO_PATH, "rb").read()

    resend.Emails.send(
        {
            "from": "MeetBot <onboarding@resend.dev>",
            "to": [email],
            "subject": "Votre invitation MeetBot",
            "text": text_content,
            "html": html_content,
            "attachments": [
                {
                    "content": list(logo_bytes),
                    "filename": "logo-meetbot.png",
                    "content_id": "meetbot-logo",
                }
            ],
        }
    )
