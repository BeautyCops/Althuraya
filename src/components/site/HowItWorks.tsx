const steps = [
  {
    title: "نبدأ بفهم المناسبة",
    desc: "نجمع تفاصيل الحدث وطبيعة الضيوف والهوية البصرية لنرسم مسار الدعوة الأنسب.",
  },
  {
    title: "نصمم التجربة الرقمية",
    desc: "نبني الدعوة وصفحة الحدث بشكل أنيق يوضح التفاصيل ويعكس طابع المناسبة بدقة.",
  },
  {
    title: "نطلق ونربط القنوات",
    desc: "نجهز الإرسال والروابط ووسائل الوصول بحيث تصل الدعوة بسلاسة إلى كل ضيف.",
  },
  {
    title: "نتابع ونعزز النتائج",
    desc: "نراقب التفاعل وتأكيدات الحضور ونحسن التجربة حتى يوم الفعالية وما بعده.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex glass rounded-full px-4 py-1.5 text-xs text-th-lavender-soft mb-5">
            كيف نعمل
          </div>
          <h2
            className="text-gradient text-4xl sm:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: "var(--font-serif-arabic)" }}
          >
            رحلة عمل واضحة من الفكرة إلى التنفيذ
          </h2>
          <p className="text-th-cream/70 text-lg leading-relaxed">
            مسار متكامل يرافقك خطوة بخطوة حتى تصل الدعوة إلى ضيوفك بأفضل صورة.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute right-6 top-0 bottom-0 w-px bg-gradient-to-b from-th-lavender/0 via-th-lavender/35 to-th-lavender/0 lg:hidden" />
          <div className="absolute right-0 left-0 top-7 hidden h-px bg-gradient-to-l from-th-lavender/0 via-th-lavender/35 to-th-lavender/0 lg:block" />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s) => (
              <div key={s.title} className="relative pr-14 lg:pr-0">
                <div className="absolute right-0 top-2 h-12 w-12 rounded-full border border-th-lavender/25 bg-th-deep/60 shadow-soft lg:right-1/2 lg:translate-x-1/2">
                  <div className="absolute inset-3 rounded-full bg-gradient-primary" />
                </div>

                <div className="lg:pt-20">
                  <div className="mb-3 inline-flex rounded-full border border-th-lavender/15 bg-white/5 px-3 py-1 text-[11px] text-th-lavender-soft">
                    محطة في الرحلة
                  </div>
                  <h3 className="text-xl font-bold text-th-cream mb-3">
                    {s.title}
                  </h3>
                  <p className="text-th-cream/65 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
