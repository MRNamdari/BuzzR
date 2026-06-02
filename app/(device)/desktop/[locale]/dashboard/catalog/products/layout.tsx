"use client";
import React from "react";
import { Typography, AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import DashboardToolbarContext from "@/components/dashboard/DashboardToolbarContext";
export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tc = React.useContext(DashboardToolbarContext);
  return (
    <Box sx={{ display: "flex", height: "100svh", width: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="h1">
            <IconButton
              sx={{ mr: 2, color: "inherit" }}
              onClick={() => tc.MenuClickHandler(!tc.MenuOpen)}
            >
              <MenuIcon color={"inherit"} />
            </IconButton>
            Products
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ width: 1 }}>
        <Toolbar />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
