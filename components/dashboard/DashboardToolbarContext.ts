import React from "react";

type DashboardToolbarContextValue = {
  MenuOpen: boolean;
  MenuClickHandler: (state: boolean) => void;
};
export const DASHBOARD_TOOLBAR_DEFAULT_VALUE: DashboardToolbarContextValue = {
  MenuOpen: false,
  MenuClickHandler(state) {},
};
const DashboardToolbarContext =
  React.createContext<DashboardToolbarContextValue>(
    DASHBOARD_TOOLBAR_DEFAULT_VALUE,
  );
export default DashboardToolbarContext;
