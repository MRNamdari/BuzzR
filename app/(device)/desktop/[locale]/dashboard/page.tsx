"use client";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import React from "react";
import DashboardToolbarContext from "@/components/dashboard/DashboardToolbarContext";
export default function DashboardMainPage() {
  const tc = React.useContext(DashboardToolbarContext);
  return (
    <Box sx={{ display: "flex", height: "100svh", width: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer++ }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="h1">
            <IconButton
              sx={{ mr: 2, color: "inherit" }}
              onClick={() => tc.MenuClickHandler(!tc.MenuOpen)}
            >
              <MenuIcon color={"inherit"} />
            </IconButton>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ width: 1 }}>
        <Toolbar />
        <Box>
          <Container maxWidth="lg">
            <Typography>Dashboard Main Page</Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
