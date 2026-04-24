import {
  Palette,
  Send,
  BarChart3,
  Users,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "تصاميم فاخرة جاهزة",
    desc: "مكتبة قوالب مصممة بأيدي خبراء — مناسبة لكل مناسبة من الزفاف إلى المؤتمرات.",
  },
  {
    icon: Send,
    title: "إرسال متعدد القنوات",
    desc: "أرسل دعواتك عبر واتساب، البريد الإلكتروني، والرسائل النصية بضغطة زر.",
  },
  {
    icon: BarChart3,
    title: "تحليلات لحظية",
    desc: "تابع الردود وتأكيدات الحضور والتفاعل مع دعوتك في الوقت الفعلي.",
  },
  {
    icon: Users,
    title: "إدارة ذكية للضيوف",
    desc: "نظّم قائمة المدعوين، الحضور المرافقين، وتفضيلات الطعام بكل سهولة.",
  },
  {
    icon: ShieldCheck,
    title: "خصوصية وأمان",
    desc: "بيانات ضيوفك محمية بأحدث معايير التشفير وسرية تامة.",
  },
  {
    icon: Smartphone,
    title: "تجربة موبايل أنيقة",
    desc: "دعوات تظهر بشكل مذهل على كل الأجهزة، بدون تطبيقات أو تنزيلات.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex glass rounded-full px-4 py-1.5 text-xs text-th-lavender-soft mb-5">
            المميزات
          </div>
          <h2
            className="text-gradient text-4xl sm:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: "var(--font-serif-arabic)" }}
          >
            كل ما تحتاجه لدعوة لا تُنسى
          </h2>
          <p className="text-th-cream/70 text-lg leading-relaxed">
            مجموعة أدوات متكاملة تجعل التخطيط لفعاليتك أسهل وأكثر أناقة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group glass rounded-3xl p-7 hover:bg-th-royal/20 transition-all hover:-translate-y-1 hover:shadow-soft"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="bg-gradient-primary inline-flex items-center justify-center h-12 w-12 rounded-2xl mb-5 group-hover:shadow-glow transition-shadow">
                <f.icon className="h-5 w-5 text-th-cream" />
              </div>
              <h3 className="text-xl font-bold text-th-cream mb-3">
                {f.title}
              </h3>
              <p className="text-th-cream/65 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
