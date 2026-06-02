import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List, { ListProps } from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ChevronRight from "@mui/icons-material/ChevronRightRounded";
import ExpandMore from "@mui/icons-material/ExpandMoreRounded";
import ListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import { Collapse, Toolbar, Tooltip } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import DashboardToolbarContext from "./DashboardToolbarContext";
import { DashboardItems } from "./DashboardItems";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px + 8px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px + 8px)`,
  },
});

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  height: "fit-content",
  borderRadius: 24,
  padding: 0,
  paddingBlock: 5,
  paddingInline: 6,
  textTransform: "capitalize",
  "&[aria-selected=true]": {
    color: `light-dark(${theme.palette.grey[50]}, ${theme.palette.primary.light})`,
    "& > .MuiListItemIcon-root": {
      color: "inherit",
    },
    backgroundColor: `light-dark(${theme.palette.grey[900]}, ${theme.palette.grey[50]})`,
  },
  "&[aria-expanded=true]": {
    backgroundColor: `light-dark(${theme.palette.grey[200]}, ${theme.palette.grey[800]})`,
  },
})) as typeof MuiListItemButton;

const ListItemText = styled(MuiListItemText)(({}) => ({
  "&[aria-hidden=true]": { opacity: 0 },
  "&[aria-hidden=false]": { opacity: 1 },
  "& .MuiTypography-root": { fontSize: "0.875rem" },
}));

const ListItemIcon = styled(MuiListItemIcon)(() => ({
  minWidth: 0,
  "& .MuiSvgIcon-root": { width: 28 },
}));

const PaddingDisabledList = React.forwardRef<
  HTMLUListElement,
  ListProps & {
    paddingDisabled?: boolean;
  }
>(function PaddingDisabledList(props, ref) {
  const { paddingDisabled, sx, ...other } = props;

  return (
    <List
      ref={ref}
      disablePadding
      sx={{
        ...sx,
      }}
      {...other}
    />
  );
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    paddingInline: theme.spacing(2),
    border: "unset",
    scrollbarGutter: "stable",
    scrollbarWidth: "thin",
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function DashboardNavigation({
  defaultStatus,
}: {
  defaultStatus: "open" | "closed";
}) {
  const [open, setOpen] = React.useState<boolean>(
    defaultStatus === "open" ? true : false,
  );
  React.useEffect(() => {
    setOpen(defaultStatus === "open" ? true : false);
  }, [defaultStatus]);
  // Extraction of path names for active link
  const pathnames = usePathname().split("/").slice(2);

  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>(
    Object.assign(
      Object.fromEntries(DashboardItems.map((dit) => [dit.title, false])),
      { [pathnames[0]]: true },
    ),
  );

  function ListItemClickHandlerGen(key: string) {
    return () => {
      setCollapsed((s) => {
        return Object.assign(
          Object.fromEntries(Object.entries(s).map(([key]) => [key, false])),
          { [key]: !s[key] },
        );
      });
      if (!open) setOpen(true);
    };
  }

  function ListItemMouseOverHandler() {
    if (defaultStatus === "closed") setOpen(true);
  }

  function ListItemMouseOutHandler() {
    if (defaultStatus === "closed") setOpen(false);
  }
  return (
    <Drawer
      component="aside"
      variant="permanent"
      open={open}
      sx={{}}
      onMouseOver={ListItemMouseOverHandler}
      onMouseOut={ListItemMouseOutHandler}
    >
      <Toolbar />
      <Divider sx={{ my: 1, border: 0 }} />
      <List sx={{ padding: 0 }}>
        {DashboardItems.map((dit) => {
          const collapsable = dit.children && dit.children.length > 0;
          const isCollapsed = collapsed[dit.title];
          if (collapsable)
            return (
              <ListItem
                key={dit.title}
                disablePadding
                sx={{ display: "block", mb: 1 }}
              >
                <Tooltip title={dit.title} arrow placement="right">
                  <ListItemButton
                    aria-expanded={isCollapsed}
                    onClick={ListItemClickHandlerGen(dit.title)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {dit.icon}
                    </ListItemIcon>
                    <ListItemText primary={dit.title} aria-hidden={!open} />
                    {open &&
                      (collapsed[dit.title] ? (
                        <ExpandMore fontSize="small" />
                      ) : (
                        <ChevronRight fontSize="small" />
                      ))}
                  </ListItemButton>
                </Tooltip>
                <Collapse
                  component={PaddingDisabledList}
                  in={collapsed[dit.title]}
                  timeout="auto"
                  sx={{
                    pt: collapsed[dit.title] ? 1 : 0,
                    transition: (t) =>
                      t.transitions.create(["padding-top", "height"], {
                        easing: t.transitions.easing.easeInOut,
                      }),
                  }}
                >
                  {dit.children!.map((cit) => (
                    <ListItem
                      key={cit.title}
                      disablePadding
                      sx={{
                        display: "block",
                        "&:not(:last-of-type)": { mb: 1 },
                      }}
                    >
                      <Tooltip title={cit.title} arrow placement="right">
                        <ListItemButton
                          component={NextLink}
                          aria-selected={pathnames.join("/") === cit.path}
                          href={`/dashboard/${cit.path}`}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {cit.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={cit.title}
                            aria-hidden={!open}
                          />
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                  ))}

                  <Divider sx={{ my: 1 }} />
                </Collapse>
              </ListItem>
            );
          else
            return (
              <ListItem
                key={dit.title}
                disablePadding
                sx={{ display: "block", mb: (t) => t.spacing(1) }}
              >
                <Tooltip title={dit.title} arrow placement="right">
                  <ListItemButton
                    component={NextLink}
                    href={`/dashboard/${dit.path}`}
                  >
                    <ListItemIcon
                      sx={{
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {dit.icon}
                    </ListItemIcon>
                    <ListItemText primary={dit.title} aria-hidden={!open} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
        })}
      </List>
    </Drawer>
  );
}
