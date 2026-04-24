import { createFileRoute } from "@tanstack/react-router";
import { contactSchema } from "@/lib/contact-schema";
import { submitContactLead } from "@/lib/server/contact";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = (await request.json()) as unknown;
        const result = contactSchema.safeParse(json);

        if (!result.success) {
          return Response.json(
            {
              ok: false,
              message: "البيانات المرسلة غير صحيحة.",
              errors: result.error.flatten(),
            },
            { status: 400 },
          );
        }

        try {
          const response = await submitContactLead(result.data, {
            ip: request.headers.get("cf-connecting-ip"),
            userAgent: request.headers.get("user-agent"),
            origin: request.headers.get("origin"),
          });

          return Response.json(response, {
            status: response.delivered ? 200 : 202,
          });
        } catch (error) {
          console.error("[contact] submission failed", error);

          return Response.json(
            {
              ok: false,
              message: "تعذر إرسال الطلب حاليًا. يرجى المحاولة مرة أخرى.",
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
