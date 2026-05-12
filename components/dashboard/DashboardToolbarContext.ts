import React from "react";

type DashboardToolbarContextValue = {
  title: string;
  setTitle(title: string): void;
};
export const DASHBOARD_TOOLBAR_DEFAULT_VALUE: DashboardToolbarContextValue = {
  title: "Dashboard",
  setTitle: (title: string) => (DASHBOARD_TOOLBAR_DEFAULT_VALUE.title = title),
};
const DashboardToolbarContext =
  React.createContext<DashboardToolbarContextValue>(
    DASHBOARD_TOOLBAR_DEFAULT_VALUE,
  );
export default DashboardToolbarContext;
