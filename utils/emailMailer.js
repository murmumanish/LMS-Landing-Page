const SUPPORT_INFO = {
  phone: "+91 9142025447",
  email: "contactsoftwarenative@gmail.com",
  website: "Studyguru.in",
  websiteUrl: "https://studyguru.in"
};

const RESEND_SEND_URL = "https://api.resend.com/emails";
const OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GMAIL_SEND_URL = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function encodeSubjectRfc2047(subject) {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

function formatPhone(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.length === 10) return `+91 ${digits}`;
  return String(phone ?? "").trim();
}

export function buildRegistrationEmailContent({
  applicationId,
  libraryName,
  ownerName,
  email,
  phone,
  city
}) {
  const formattedPhone = formatPhone(phone);
  const subject = `Registration Received! Your Application is Under Review – ${applicationId}`;

  const text = [
    `Hello ${ownerName},`,
    "",
    `Thank you for registering ${libraryName} on LMS by Study Guru! We have successfully received your partner registration request.`,
    "",
    "Your application is currently pending verification and admin approval. Our onboarding team is reviewing your library details to ensure a smooth setup on our platform.",
    "",
    "Application Summary:",
    "",
    `- Application ID: ${applicationId}`,
    `- Library Name: ${libraryName}`,
    `- Owner Name: ${ownerName}`,
    `- Registered Email: ${email}`,
    `- Registered Phone: ${formattedPhone}`,
    `- City / Location: ${city}`,
    "",
    "What happens next?",
    "",
    "Verification: Our team will review your submitted details (this typically takes 24 to 48 hours).",
    "",
    "Account Activation: Once your application is approved, you will receive a confirmation email containing your LMS Admin Dashboard link, login credentials, an exclusive 3-month discount coupon code, and other necessary setup details to get started.",
    "",
    "If you need any assistance or wish to update your submitted information, feel free to reach out to our partner support team:",
    "",
    `- Support Contact / WhatsApp: ${SUPPORT_INFO.phone}`,
    `- Support Email: ${SUPPORT_INFO.email}`,
    `- Website: ${SUPPORT_INFO.website}`,
    "",
    "We look forward to helping you digitize and grow your library!",
    "Warm regards,",
    "Team Study Guru",
    SUPPORT_INFO.website
  ].join("\n");

  const safeOwner = escapeHtml(ownerName);
  const safeLibrary = escapeHtml(libraryName);
  const safeAppId = escapeHtml(applicationId);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(formattedPhone);
  const safeCity = escapeHtml(city);
  const safeSupportPhone = escapeHtml(SUPPORT_INFO.phone);
  const safeSupportEmail = escapeHtml(SUPPORT_INFO.email);
  const safeWebsite = escapeHtml(SUPPORT_INFO.website);
  const safeWebsiteUrl = escapeHtml(SUPPORT_INFO.websiteUrl);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#1e293b;line-height:1.6;">
  <div style="max-width:620px;margin:24px auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    <div style="background:#2563eb;color:#ffffff;padding:24px 28px;">
      <h1 style="margin:0;font-size:20px;font-weight:700;">LMS by Study Guru</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">Partner Registration Confirmation</p>
    </div>
    <div style="padding:28px;">
      <p style="margin:0 0 14px;">Hello ${safeOwner},</p>
      <p style="margin:0 0 14px;">
        Thank you for registering <strong>${safeLibrary}</strong> on LMS by Study Guru! We have successfully received your partner registration request.
      </p>
      <p style="margin:0 0 20px;">
        Your application is currently pending verification and admin approval. Our onboarding team is reviewing your library details to ensure a smooth setup on our platform.
      </p>

      <p style="margin:0 0 10px;font-weight:700;color:#0f172a;">Application Summary:</p>
      <ul style="margin:0 0 22px;padding-left:20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding-top:14px;padding-bottom:14px;padding-right:16px;">
        <li><strong>Application ID:</strong> ${safeAppId}</li>
        <li><strong>Library Name:</strong> ${safeLibrary}</li>
        <li><strong>Owner Name:</strong> ${safeOwner}</li>
        <li><strong>Registered Email:</strong> ${safeEmail}</li>
        <li><strong>Registered Phone:</strong> ${safePhone}</li>
        <li><strong>City / Location:</strong> ${safeCity}</li>
      </ul>

      <p style="margin:0 0 10px;font-weight:700;color:#0f172a;">What happens next?</p>
      <p style="margin:0 0 12px;">
        <strong>Verification:</strong> Our team will review your submitted details (this typically takes 24 to 48 hours).
      </p>
      <p style="margin:0 0 20px;">
        <strong>Account Activation:</strong> Once your application is approved, you will receive a confirmation email containing your LMS Admin Dashboard link, login credentials, an exclusive 3-month discount coupon code, and other necessary setup details to get started.
      </p>

      <p style="margin:0 0 10px;">
        If you need any assistance or wish to update your submitted information, feel free to reach out to our partner support team:
      </p>
      <ul style="margin:0 0 22px;padding-left:20px;">
        <li>Support Contact / WhatsApp: ${safeSupportPhone}</li>
        <li>Support Email: <a href="mailto:${safeSupportEmail}" style="color:#2563eb;text-decoration:none;">${safeSupportEmail}</a></li>
        <li>Website: <a href="${safeWebsiteUrl}" style="color:#2563eb;text-decoration:none;">${safeWebsite}</a></li>
      </ul>

      <p style="margin:0 0 14px;">We look forward to helping you digitize and grow your library!</p>
      <p style="margin:0;">
        Warm regards,<br />
        <strong>Team Study Guru</strong><br />
        <a href="${safeWebsiteUrl}" style="color:#2563eb;text-decoration:none;">${safeWebsite}</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  return { subject, text, html };
}

async function sendViaResend({ to, subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    return null;
  }

  const response = await fetch(RESEND_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html
    }),
    signal: AbortSignal.timeout(8000)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Resend API send failed (${response.status}): ${data?.message || data?.name || "Unknown error"}`
    );
  }

  return { sent: true, provider: "resend", messageId: data.id || null };
}

function buildRawMimeMessage({ from, to, subject, text, html }) {
  const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const headers = [
    ...(from ? [`From: ${from}`] : []),
    `To: ${to}`,
    `Subject: ${encodeSubjectRfc2047(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`
  ];

  const body = [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(text, "utf8").toString("base64"),
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    Buffer.from(html, "utf8").toString("base64"),
    "",
    `--${boundary}--`
  ].join("\r\n");

  return Buffer.from(body, "utf8").toString("base64url");
}

async function getGmailAccessToken() {
  const directToken = process.env.GMAIL_ACCESS_TOKEN?.trim();
  const clientId = process.env.GMAIL_CLIENT_ID?.trim();
  const clientSecret = process.env.GMAIL_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN?.trim();

  if (clientId && clientSecret && refreshToken) {
    const response = await fetch(OAUTH_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      }),
      signal: AbortSignal.timeout(8000)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.access_token) {
      throw new Error(
        `Gmail OAuth2 token refresh failed (${response.status}): ${data.error_description || data.error || "Unknown error"}`
      );
    }

    return data.access_token;
  }

  return directToken || null;
}

async function sendViaGmail({ to, subject, text, html }) {
  const accessToken = await getGmailAccessToken();
  if (!accessToken) {
    return null;
  }

  const senderEmail = process.env.GMAIL_SENDER_EMAIL?.trim() || process.env.EMAIL_FROM?.trim();
  const from = senderEmail ? `"LMS by Study Guru" <${senderEmail}>` : undefined;
  const raw = buildRawMimeMessage({ from, to, subject, text, html });

  const response = await fetch(GMAIL_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ raw }),
    signal: AbortSignal.timeout(8000)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Gmail API send failed (${response.status}): ${data?.error?.message || "Unknown error"}`
    );
  }

  return { sent: true, provider: "gmail", messageId: data.id || null };
}

export async function sendRegistrationEmail(details) {
  const { subject, text, html } = buildRegistrationEmailContent(details);

  const resendResult = await sendViaResend({ to: details.email, subject, text, html });
  if (resendResult) {
    return resendResult;
  }

  const gmailResult = await sendViaGmail({ to: details.email, subject, text, html });
  if (gmailResult) {
    return gmailResult;
  }

  console.warn(
    "[Email] Skipping registration email: set RESEND_API_KEY + EMAIL_FROM (or Gmail OAuth2 credentials) in .env."
  );
  return { sent: false, reason: "missing_credentials" };
}
