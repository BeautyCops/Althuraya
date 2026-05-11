import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import type { DashboardAccountKind } from "../account-kind";

const STEPS_INDIVIDUAL = [
  "أنشئي مناسبتك الأولى واختاري نوع المناسبة.",
  "أضيفي المدعوين أو استوردي قائمة.",
  "خصّصي تصميم الدعوة والوسائط.",
  "شاركي الرابط أو QR وتتبّعي RSVP والحضور.",
];

const STEPS_COMPANY = [
  "أنشئي الفعالية وحددي الفريق والجهات المشاركة.",
  "استوردي الوفود والمدعوين مع مجموعات وصلاحيات.",
  "فعّلي صفحة الفعالية العامة وجداول الجلسات.",
  "راقبي التقارير وQR الحضور لحظة بلحظة.",
];

export function HomeSection({
  email,
  accountKind,
}: {
  email: string;
  accountKind: DashboardAccountKind;
}) {
  const steps = accountKind === "company" ? STEPS_COMPANY : STEPS_INDIVIDUAL;
  const greeting = email.includes("@") ? email.split("@")[0] : email;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="rounded-3xl border border-th-lavender/15 bg-gradient-to-br from-th-deep/80 to-th-royal/20 p-8 md:p-10 shadow-glow">
        <p className="text-sm text-th-lavender/80 mb-2">مرحبًا</p>
        <h2 className="text-2xl md:text-3xl font-bold text-th-cream mb-3">
          أهلًا {greeting}
        </h2>
        <p className="text-th-lavender/85 leading-relaxed max-w-2xl mb-6">
          من هنا تديرين رحلة المناسبة بالكامل — من الدعوة حتى الحضور والتقارير.
          ابدئي بإنشاء أول مناسبة، ثم انتقلي بين الأقسام من القائمة اليمنى.
        </p>
        <Link
          to="/dashboard"
          search={{ tab: "create" }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-th-cream hover:shadow-glow transition-all"
        >
          إنشاء أول مناسبة
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="rounded-3xl border border-th-lavender/12 bg-th-deep/40 p-8 md:p-10">
        <h3 className="text-lg font-bold text-th-cream mb-6">
          خطوات مقترحة لرحلتك
        </h3>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-4 items-start">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-th-royal/35 text-sm font-bold text-th-cream">
                {i + 1}
              </span>
              <div className="flex-1 pt-1">
                <p className="text-th-cream/90 leading-relaxed">{step}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-th-lavender/40 shrink-0 mt-1" />
            </li>
          ))}
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/dashboard"
          search={{ tab: "occasions" }}
          className="rounded-2xl border border-th-lavender/15 bg-th-deep/35 px-5 py-4 hover:bg-th-royal/15 transition-colors"
        >
          <p className="text-sm font-semibold text-th-cream">مناسباتي</p>
          <p className="text-xs text-th-lavender/70 mt-1">
            عرض وإدارة كل المناسبات والمسودات.
          </p>
        </Link>
        <Link
          to="/dashboard"
          search={{ tab: "guests" }}
          className="rounded-2xl border border-th-lavender/15 bg-th-deep/35 px-5 py-4 hover:bg-th-royal/15 transition-colors"
        >
          <p className="text-sm font-semibold text-th-cream">المدعوون</p>
          <p className="text-xs text-th-lavender/70 mt-1">
            قريبًا: استيراد ومجموعات وحالات الدعوة.
          </p>
        </Link>
      </div>
    </div>
  );
}
