import sbcIcon from "@/assets/saudi-business-center-icon.svg";
import { Logo } from "./Logo";

const CR_NUMBER = "7050348478";

const cols = [
  {
    title: "المنتج",
    links: [
      { label: "المميزات", href: "/#features" },
      { label: "خدماتنا", href: "/#services" },
      { label: "الأسعار", href: "/#pricing" },
      { label: "كيف نعمل", href: "/#how" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "/about" },
      { label: "قصص نجاح", href: "/success-stories" },
      { label: "المدونة", href: "/blog" },
      { label: "الوظائف", href: "/careers" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { label: "مركز المساعدة", href: "/help-center" },
      { label: "تواصل معنا", href: "/#contact" },
      { label: "الأسئلة الشائعة", href: "/#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative pt-16 pb-10">
      <div className="container mx-auto px-6">
        <div className="glass-strong rounded-3xl p-10 sm:p-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-10">
            <div className="col-span-2">
              <Logo />
              <p className="text-th-cream/65 text-sm leading-relaxed mt-4 max-w-xs">
                منصة سعودية متخصصة في تصميم وإدارة الدعوات الإلكترونية الفاخرة
                لمختلف المناسبات.
              </p>
            </div>
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-th-cream font-bold mb-4 text-sm">
                  {c.title}
                </h4>
                <ul className="space-y-2.5 text-sm text-th-cream/65">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="hover:text-th-cream transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col gap-5 text-xs text-th-cream/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2.5 sm:gap-3 text-center sm:text-right">
              <a
                href="https://business.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-end shrink-0 p-0.5 opacity-90 hover:opacity-100 transition-opacity"
                aria-label="المركز السعودي للأعمال"
                title="business.sa"
              >
                <img
                  src={sbcIcon}
                  alt=""
                  className="h-8 w-8 sm:h-9 sm:w-9"
                />
              </a>
              <p className="text-th-cream/55 leading-relaxed">
                <span className="text-th-cream/50">رقم السجل التجاري</span>{" "}
                <span
                  className="text-th-cream/70 font-medium tabular-nums"
                  dir="ltr"
                  translate="no"
                >
                  {CR_NUMBER}
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                © {new Date().getFullYear()} شركة الثريا 440 LLC — جميع الحقوق
                محفوظة
              </div>
              <div className="flex gap-5">
                <a
                  href="/privacy-policy"
                  className="hover:text-th-cream transition-colors"
                >
                  سياسة الخصوصية
                </a>
                <a
                  href="/terms-and-conditions"
                  className="hover:text-th-cream transition-colors"
                >
                  الشروط والأحكام
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
