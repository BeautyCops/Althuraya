/** معرفات تبويبات داشبورد العميل (مُعرَّفة في `?tab=`). */
export const DASHBOARD_TABS = [
  "home",
  "occasions",
  "create",
  "guests",
  "rsvp",
  "design",
  "media",
  "event-page",
  "qr",
  "schedule",
  "seating",
  "analytics",
  "billing",
  "addons",
  "notifications",
  "help",
  "settings",
] as const;

export type DashboardTab = (typeof DASHBOARD_TABS)[number];

export function isDashboardTab(v: string): v is DashboardTab {
  return (DASHBOARD_TABS as readonly string[]).includes(v);
}

export const DEFAULT_DASHBOARD_TAB: DashboardTab = "home";
