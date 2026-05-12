"use client";
import {
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import AppBar from "@mui/material/AppBar";
import theme from "@/components/theme";
import React, { useContext } from "react";
import DashboardToolbarContext, {
  DASHBOARD_TOOLBAR_DEFAULT_VALUE,
} from "@/components/dashboard/DashboardToolbarContext";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Record<string, string>;
}) {
  const ToolbarContext = useContext(DashboardToolbarContext);
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100svh", width: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <DashboardToolbarContext.Provider
              value={DASHBOARD_TOOLBAR_DEFAULT_VALUE}
            >
              <Typography variant="h6" noWrap component="div">
                <IconButton
                  sx={{ mr: 2, color: "inherit" }}
                  onClick={() => setOpen((s) => !s)}
                >
                  <MenuIcon color={"inherit"} />
                </IconButton>
                {ToolbarContext.title}
              </Typography>
            </DashboardToolbarContext.Provider>
          </Toolbar>
        </AppBar>
        <DashboardNavigation defaultStatus={open ? "open" : "closed"} />

        <Box component="main" sx={{ width: 1 }}>
          <Toolbar />
          <Box>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
