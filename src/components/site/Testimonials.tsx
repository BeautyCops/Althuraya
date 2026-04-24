import { Star } from "lucide-react";

const items = [
  {
    name: "نورة العتيبي",
    role: "عروس",
    text: "تجربة سحرية! دعوة زفافي كانت أنيقة ومميزة، وكل ضيوفي أشادوا بها. الفريق متعاون والنتيجة فاقت توقعاتي.",
  },
  {
    name: "khaled",
    role: "منظم مؤتمرات",
    text: "وفّرنا أيامًا من العمل اليدوي. نظام تأكيد الحضور والتحليلات اللحظية غيّر طريقة إدارتنا للمؤتمرات بالكامل.",
  },
  {
    name: "هند ",
    role: "مديرة فعاليات شركات",
    text: "احترافية عالية ودعم فوري. القوالب فاخرة ومرنة، والتخصيص سهل جدًا حتى لمن لا يعرفون التصميم.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex glass rounded-full px-4 py-1.5 text-xs text-th-lavender-soft mb-5">
            آراء عملائنا
          </div>
          <h2
            className="text-gradient text-4xl sm:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: "var(--font-serif-arabic)" }}
          >
            ثقة تستحق الفخر
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div
              key={t.name}
              className="glass rounded-3xl p-7 hover:bg-th-royal/15 transition-colors"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-th-lavender text-th-lavender"
                  />
                ))}
              </div>
              <p className="text-th-cream/85 leading-loose mb-6">"{t.text}"</p>
              <div className="border-t border-white/10 pt-4">
                <div className="font-bold text-th-cream">{t.name}</div>
                <div className="text-sm text-th-cream/55">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
