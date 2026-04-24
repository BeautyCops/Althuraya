import type { ContactPayload } from "@/lib/contact-schema";

type ContactSubmissionContext = {
  ip?: string | null;
  userAgent?: string | null;
  origin?: string | null;
};

function getOptionalEnv(name: string) {
  return process.env[name]?.trim() || "";
}

export async function submitContactLead(
  payload: ContactPayload,
  context: ContactSubmissionContext,
) {
  const webhookUrl = getOptionalEnv("CONTACT_WEBHOOK_URL");

  const body = {
    ...payload,
    source: "website-contact-form",
    submittedAt: new Date().toISOString(),
    ip: context.ip || undefined,
    userAgent: context.userAgent || undefined,
    origin: context.origin || undefined,
  };

  if (!webhookUrl) {
    console.info("[contact] CONTACT_WEBHOOK_URL is not configured", body);

    return {
      ok: true,
      delivered: false,
      message:
        "تم استلام الطلب محليًا، لكن وجهة التسليم النهائية غير مهيأة بعد.",
    };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Webhook delivery failed with status ${response.status}`);
  }

  return {
    ok: true,
    delivered: true,
    message: "تم إرسال طلبك بنجاح.",
  };
}
