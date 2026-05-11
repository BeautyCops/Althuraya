import type { DashboardTab } from "../dashboard-tabs";
import { DASHBOARD_TAB_LABELS } from "../dashboard-nav-config";

export function PlaceholderSection({
  tab,
  subtitle,
  bullets,
}: {
  tab: DashboardTab;
  subtitle?: string;
  bullets?: string[];
}) {
  const title = DASHBOARD_TAB_LABELS[tab];
  const defaultBullets = bullets ?? [
    "ربط قاعدة البيانات بالمناسبات والمدعوين.",
    "مزامنة مع تصميم الدعوة وصفحة المناسبة العامة.",
    "تكامل الدفع والإشعارات لاحقًا.",
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-3xl border border-th-lavender/15 bg-th-deep/45 backdrop-blur-sm p-8 md:p-10 shadow-card-soft">
        <div className="inline-flex rounded-full bg-th-royal/25 px-4 py-1 text-xs text-th-lavender-soft mb-4">
          قيد الإنشاء
        </div>
        <h2 className="text-2xl font-bold text-th-cream mb-3">{title}</h2>
        <p className="text-th-lavender/80 leading-relaxed mb-6">
          {subtitle ??
            "هذا القسم جزء من خارطة لوحة العميل. سيتم ربطه بالبيانات الفعلية والـ API في المراحل القادمة."}
        </p>
        <ul className="space-y-3 text-sm text-th-cream/85">
          {defaultBullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-th-lavender mt-1">◆</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
