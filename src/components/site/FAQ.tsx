import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "كم من الوقت أحتاج لإنشاء دعوتي؟",
    a: "بإمكانك إعداد دعوة كاملة وجاهزة للإرسال خلال أقل من ١٥ دقيقة باستخدام قوالبنا الجاهزة.",
  },
  {
    q: "هل يمكن تخصيص التصميم بالكامل؟",
    a: "نعم، يمكنك تعديل النصوص، الألوان، الخطوط، والصور لتتناسب مع هوية مناسبتك. وفي الباقة الفاخرة لديك حرية كاملة.",
  },
  {
    q: "كيف يصل ضيوفي للدعوة؟",
    a: "يمكنك إرسال الدعوة عبر روابط واتساب، البريد الإلكتروني، أو الرسائل النصية. الدعوة تفتح مباشرة في المتصفح بدون تنزيل.",
  },
  {
    q: "هل بياناتي وبيانات ضيوفي آمنة؟",
    a: "بالطبع. نستخدم أحدث معايير التشفير ولا نشارك بياناتك مع أي طرف ثالث. خصوصيتك أولويتنا.",
  },
  {
    q: "هل يدعم النظام نظام check-in بالـ QR؟",
    a: "نعم، الباقة الفاخرة وباقة الأعمال تشمل نظام تسجيل دخول للضيوف عند باب المناسبة باستخدام رمز QR فريد لكل ضيف.",
  },
  {
    q: "هل تقدمون دعمًا فنيًا؟",
    a: "نعم، فريقنا متاح ٢٤/٧ للرد على استفساراتك عبر واتساب والبريد الإلكتروني والهاتف.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex glass rounded-full px-4 py-1.5 text-xs text-th-lavender-soft mb-5">
            الأسئلة الشائعة
          </div>
          <h2
            className="text-gradient text-4xl sm:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: "var(--font-serif-arabic)" }}
          >
            أجوبة على ما يدور بذهنك
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-right"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-th-cream">{f.q}</span>
                {open === i ? (
                  <Minus className="h-5 w-5 text-th-lavender flex-shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-th-lavender flex-shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-th-cream/70 leading-relaxed animate-fade-up">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
