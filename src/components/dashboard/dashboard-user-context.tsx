/* eslint-disable react-refresh/only-export-components -- مشاركة نوع المستخدم مع البوابة */
import { createContext, useContext } from "react";

export type DashboardUser = {
  id: string;
  email: string;
  role: "user" | "admin";
};

const DashboardUserContext = createContext<DashboardUser | null>(null);

export function DashboardUserProvider({
  user,
  children,
}: {
  user: DashboardUser;
  children: React.ReactNode;
}) {
  return (
    <DashboardUserContext.Provider value={user}>
      {children}
    </DashboardUserContext.Provider>
  );
}

export function useDashboardUser(): DashboardUser {
  const u = useContext(DashboardUserContext);
  if (!u) {
    throw new Error("useDashboardUser خارج DashboardUserProvider");
  }
  return u;
}
