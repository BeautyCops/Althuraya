import type { DashboardAccountKind } from "../account-kind";

export function SettingsSection({
  accountKind,
  onChangeKind,
}: {
  accountKind: DashboardAccountKind;
  onChangeKind: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-3xl border border-th-lavender/15 bg-th-deep/45 p-8 md:p-10 shadow-card-soft">
        <h2 className="text-2xl font-bold text-th-cream mb-4">
          إعدادات الحساب
        </h2>
        <p className="text-sm text-th-lavender/80 mb-6 leading-relaxed">
          نوع الحساب الحالي:{" "}
          <strong className="text-th-cream">
            {accountKind === "company" ? "شركات" : "أفراد"}
          </strong>
          . يحدّد عناصر القائمة والخطوات المقترحة في الرئيسية.
        </p>
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem("althuraya_dashboard_account_kind");
            onChangeKind();
          }}
          className="rounded-xl border border-th-lavender/25 px-5 py-2.5 text-sm text-th-cream hover:bg-th-royal/25 transition-colors"
        >
          إعادة اختيار نوع الحساب (أفراد / شركات)
        </button>
        <p className="mt-4 text-xs text-th-lavender/55">
          لاحقًا: ربط الاسم والهاتف والتحقق من البريد من هذه الشاشة.
        </p>
      </div>
    </div>
  );
}
