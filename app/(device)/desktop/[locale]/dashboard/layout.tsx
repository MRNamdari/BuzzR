"use client";
import { ThemeProvider } from "@mui/material";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import theme from "@/components/theme";
import React, { useContext } from "react";
import ToolbarContext from "@/components/dashboard/DashboardToolbarContext";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Record<string, string>;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <ThemeProvider theme={theme}>
      <DashboardNavigation defaultStatus={open ? "open" : "closed"} />
      <ToolbarContext.Provider
        value={{ MenuOpen: open, MenuClickHandler: setOpen }}
      >
        {children}
      </ToolbarContext.Provider>
    </ThemeProvider>
  );
}
