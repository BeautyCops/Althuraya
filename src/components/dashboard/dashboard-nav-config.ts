import {
  Armchair,
  BarChart3,
  Bell,
  CalendarDays,
  HelpCircle,
  ImageIcon,
  LayoutDashboard,
  Link2,
  Palette,
  PartyPopper,
  Puzzle,
  QrCode,
  Receipt,
  Settings,
  Sparkles,
  Users,
  Verified,
} from "lucide-react";

import type { DashboardAccountKind } from "./account-kind";
import type { DashboardTab } from "./dashboard-tabs";

export type DashboardNavItem = {
  tab: DashboardTab;
  label: string;
  icon: typeof LayoutDashboard;
};

export const COMPANY_NAV: DashboardNavItem[] = [
  { tab: "home", label: "الرئيسية", icon: LayoutDashboard },
  { tab: "occasions", label: "مناسباتي / فعالياتي", icon: PartyPopper },
  { tab: "create", label: "إنشاء دعوة جديدة", icon: Sparkles },
  { tab: "guests", label: "إدارة المدعوين", icon: Users },
  { tab: "rsvp", label: "الردود والتأكيدات (RSVP)", icon: Verified },
  { tab: "design", label: "تصميم الدعوة", icon: Palette },
  { tab: "media", label: "إدارة الوسائط", icon: ImageIcon },
  { tab: "event-page", label: "صفحة المناسبة", icon: Link2 },
  { tab: "qr", label: "QR Code والدخول", icon: QrCode },
  { tab: "schedule", label: "جدول المناسبة", icon: CalendarDays },
  { tab: "seating", label: "الطاولات والمقاعد", icon: Armchair },
  { tab: "analytics", label: "الإحصائيات والتقارير", icon: BarChart3 },
  { tab: "billing", label: "الفواتير والمدفوعات", icon: Receipt },
  { tab: "addons", label: "الخدمات الإضافية", icon: Puzzle },
  { tab: "notifications", label: "الإشعارات", icon: Bell },
  { tab: "help", label: "مركز المساعدة", icon: HelpCircle },
  { tab: "settings", label: "إعدادات الحساب", icon: Settings },
];

export const INDIVIDUAL_NAV: DashboardNavItem[] = [
  { tab: "home", label: "الرئيسية", icon: LayoutDashboard },
  { tab: "occasions", label: "مناسباتي", icon: PartyPopper },
  { tab: "create", label: "إنشاء دعوة جديدة", icon: Sparkles },
  { tab: "guests", label: "المدعوين", icon: Users },
  { tab: "rsvp", label: "الردود (RSVP)", icon: Verified },
  { tab: "design", label: "تصميم الدعوة", icon: Palette },
  { tab: "qr", label: "QR والحضور", icon: QrCode },
  { tab: "billing", label: "الفواتير", icon: Receipt },
  { tab: "notifications", label: "الإشعارات", icon: Bell },
  { tab: "help", label: "مركز المساعدة", icon: HelpCircle },
  { tab: "settings", label: "الإعدادات", icon: Settings },
];

export function dashboardTabsForKind(
  kind: DashboardAccountKind,
): DashboardTab[] {
  const items = kind === "company" ? COMPANY_NAV : INDIVIDUAL_NAV;
  return items.map((i) => i.tab);
}

export const DASHBOARD_TAB_LABELS: Record<DashboardTab, string> = {
  home: "الرئيسية",
  occasions: "مناسباتي",
  create: "إنشاء دعوة جديدة",
  guests: "إدارة المدعوين",
  rsvp: "الردود والتأكيدات",
  design: "تصميم الدعوة",
  media: "إدارة الوسائط",
  "event-page": "صفحة المناسبة",
  qr: "QR Code والدخول",
  schedule: "جدول المناسبة",
  seating: "الطاولات والمقاعد",
  analytics: "الإحصائيات والتقارير",
  billing: "الفواتير والمدفوعات",
  addons: "الخدمات الإضافية",
  notifications: "الإشعارات",
  help: "مركز المساعدة",
  settings: "إعدادات الحساب",
};
