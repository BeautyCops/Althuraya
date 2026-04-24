import analyticsImg from "@/assets/service-analytics.png";
import checkinImg from "@/assets/service-checkin.png";
import invitationsImg from "@/assets/service-invitations.png";
import rsvpImg from "@/assets/service-rsvp.png";

const services = [
  {
    n: "٠١",
    img: rsvpImg,
    title: "نظام RSVP ذكي",
    desc: "تأكيد الحضور والاعتذار بضغطة زر.",
  },
  {
    n: "٠٢",
    img: invitationsImg,
    title: "تصميم الدعوات الرقمية",
    desc: "تصميم دعوات عالية مخصصة للهوية البصرية للحدث.",
  },
  {
    n: "٠٣",
    img: checkinImg,
    title: "حلول مخصصة للفعاليات والمعارض",
    desc: "بوابات تسجيل رقمية + رمز QR.",
  },
  {
    n: "٠٤",
    img: analyticsImg,
    title: "نظام تتبع وتحليلات",
    desc: "عرض إحصائيات الدعوات المفتوحة المؤكدين، المعتذرين إلخ.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-x-0 top-10 h-64 bg-[radial-gradient(circle_at_top,oklch(0.42_0.18_295_/_0.28),transparent_70%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,oklch(0.58_0.21_300_/_0.12),transparent_70%)]" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 inline-flex glass rounded-full px-4 py-1.5 text-xs text-th-lavender-soft">
            خدماتنا
          </div>
          <h2
            className="text-gradient mb-5 text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-serif-arabic)" }}
          >
            ماذا نقدم؟
          </h2>
          <p className="text-lg leading-relaxed text-th-cream/70">
            حلول رقمية مصممة للفعاليات الراقية، تجمع بين الأناقة وسهولة الإدارة
            والتتبع في تجربة واحدة متكاملة.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
          style={{ direction: "rtl" }}
        >
          {services.map((service) => (
            <article
              key={service.n}
              className="group relative h-full rounded-3xl glass p-7 hover:bg-th-royal/20 transition-all hover:-translate-y-1 hover:shadow-soft"
              style={{ direction: "rtl" }}
            >
              <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-transparent">
                <div className="aspect-square p-4">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-gradient-lavender mb-5 text-5xl font-bold opacity-90"
                  style={{ fontFamily: "var(--font-serif-arabic)" }}
                >
                  {service.n}
                </div>
                <h3 className="mb-3 text-xl font-bold text-th-cream">
                  {service.title}
                </h3>
                <p className="leading-7 text-th-cream/65">{service.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
