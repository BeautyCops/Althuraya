export type DashboardAccountKind = "individual" | "company";

const STORAGE_KEY = "althuraya_dashboard_account_kind";

export function readAccountKind(): DashboardAccountKind | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "individual" || v === "company") return v;
  return null;
}

export function writeAccountKind(kind: DashboardAccountKind): void {
  window.localStorage.setItem(STORAGE_KEY, kind);
}
