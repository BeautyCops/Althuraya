import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import type { DashboardAccountKind } from "./account-kind";
import type { DashboardTab } from "./dashboard-tabs";
import { COMPANY_NAV, INDIVIDUAL_NAV } from "./dashboard-nav-config";

export function DashboardSidebar({
  activeTab,
  accountKind,
  onCloseMobile,
  className,
}: {
  activeTab: DashboardTab;
  accountKind: DashboardAccountKind;
  onCloseMobile?: () => void;
  className?: string;
}) {
  const items = accountKind === "company" ? COMPANY_NAV : INDIVIDUAL_NAV;

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 w-64 flex-col border-th-lavender/10 bg-th-deep/55 backdrop-blur-xl lg:border-e",
        className,
      )}
    >
      <div className="border-b border-th-lavender/10 px-5 py-6">
        <p className="text-gradient font-bold text-lg leading-tight">
          لوحة العميل
        </p>
        <p className="mt-1 text-xs text-th-lavender/70">
          الثريا — {accountKind === "company" ? "شركات" : "أفراد"}
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {items.map(({ tab, label, icon: Icon }) => {
            const isActive = activeTab === tab;
            return (
              <li key={tab}>
                <Link
                  to="/dashboard"
                  search={{ tab }}
                  onClick={() => onCloseMobile?.()}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-th-royal/35 text-th-cream shadow-soft"
                      : "text-th-lavender/80 hover:bg-th-deep/80 hover:text-th-cream",
                  )}
                >
                  <Icon className="h-[1.1rem] w-[1.1rem] shrink-0 opacity-90" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-th-lavender/10 px-4 py-3 text-[10px] text-th-lavender/55 leading-relaxed">
        الأقسام المُعلَّمة ستُربط لاحقًا ببيانات المناسبات والمدعوين.
      </div>
    </aside>
  );
}
