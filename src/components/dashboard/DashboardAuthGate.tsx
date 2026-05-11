import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import {
  DashboardUserProvider,
  type DashboardUser,
} from "./dashboard-user-context";

type GateState = "loading" | "ready" | "redirecting";

export function DashboardAuthGate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [state, setState] = useState<GateState>("loading");
  const [user, setUser] = useState<DashboardUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (cancelled) return;
        if (!res.ok) {
          setState("redirecting");
          await navigate({
            to: "/login",
            search: { redirect: "/dashboard", mode: "login" },
            replace: true,
          });
          return;
        }
        const data = (await res.json()) as { user?: DashboardUser };
        if (!data.user) {
          setState("redirecting");
          await navigate({
            to: "/login",
            search: { redirect: "/dashboard", mode: "login" },
            replace: true,
          });
          return;
        }
        setUser(data.user);
        setState("ready");
      } catch {
        if (!cancelled) {
          setState("redirecting");
          await navigate({
            to: "/login",
            search: { redirect: "/dashboard", mode: "login" },
            replace: true,
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (state === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-hero text-th-cream"
        dir="rtl"
      >
        <p className="text-sm text-th-lavender/80">جاري تحميل لوحة العميل…</p>
      </div>
    );
  }

  if (state === "redirecting" || !user) {
    return null;
  }

  return <DashboardUserProvider user={user}>{children}</DashboardUserProvider>;
}
