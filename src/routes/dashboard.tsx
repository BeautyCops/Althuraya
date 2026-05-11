import { createFileRoute } from "@tanstack/react-router";

import { DashboardAuthGate } from "@/components/dashboard/DashboardAuthGate";
import {
  DEFAULT_DASHBOARD_TAB,
  isDashboardTab,
} from "@/components/dashboard/dashboard-tabs";
import { DashboardWorkspace } from "@/components/dashboard/DashboardWorkspace";

export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab:
      typeof search.tab === "string" && isDashboardTab(search.tab)
        ? search.tab
        : DEFAULT_DASHBOARD_TAB,
  }),
  head: () => ({
    meta: [
      { title: "لوحة العميل — الثريا" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardRoutePage,
});

function DashboardRoutePage() {
  const { tab } = Route.useSearch();
  return (
    <DashboardAuthGate>
      <DashboardWorkspace tab={tab} />
    </DashboardAuthGate>
  );
}
