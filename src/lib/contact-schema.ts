import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "الاسم مطلوب"),
  email: z.string().trim().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().trim().min(8, "رقم الجوال غير صحيح").max(20),
  message: z.string().trim().min(10, "الرسالة قصيرة جدًا").max(2000),
});

export type ContactPayload = z.infer<typeof contactSchema>;
