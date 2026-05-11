import type { DashboardAccountKind } from "./account-kind";

export function AccountKindChooser({
  onChoose,
}: {
  onChoose: (k: DashboardAccountKind) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-th-deep/95 backdrop-blur-md px-4"
      dir="rtl"
    >
      <div className="w-full max-w-2xl rounded-3xl border border-th-lavender/20 bg-th-deep/90 shadow-card-soft p-8 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-th-cream text-center mb-2">
          مرحبًا في الثريا
        </h1>
        <p className="text-sm text-th-lavender/75 text-center mb-8 leading-relaxed">
          اختاري نوع حسابك لتخصيص لوحة التحكم ورحلتك داخل المنصة. يمكنك تغييره
          لاحقًا من الإعدادات.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onChoose("individual")}
            className="text-right rounded-2xl border border-th-lavender/25 bg-th-deep/60 hover:bg-th-royal/25 hover:border-th-lavender/45 transition-all p-6 flex flex-col gap-3"
          >
            <span className="text-lg font-bold text-th-cream">أفراد</span>
            <span className="text-sm text-th-lavender/80 leading-relaxed">
              أعراس، ملكات، تخرج، أعياد ميلاد، مناسبات عائلية، دعوات شخصية.
            </span>
          </button>
          <button
            type="button"
            onClick={() => onChoose("company")}
            className="text-right rounded-2xl border border-th-lavender/25 bg-th-deep/60 hover:bg-th-royal/25 hover:border-th-lavender/45 transition-all p-6 flex flex-col gap-3"
          >
            <span className="text-lg font-bold text-th-cream">شركات</span>
            <span className="text-sm text-th-lavender/80 leading-relaxed">
              مؤتمرات، معارض، فعاليات رسمية، وفود، تقارير وتعدد صلاحيات لاحقًا.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
