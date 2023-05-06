import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskSharpIcon from "@mui/icons-material/TaskSharp";

import LoggedInHeader from "../components/LoggedInHeader";
import FacultyDashboard from "../components/FacultyDashboard";
import FacultyForms from "../components/FacultyForms";
import PendingForms from "../components/PendingForms";

const drawerWidth = 240;

export default function FacultyNavigation() {
  const [content, setContent] = React.useState(() => {
    const storedContent = window.localStorage.getItem(
      "facultyNavigationContent"
    );
    return storedContent ? storedContent : "dashboard";
  });

  const handleListItemClick = (event, content) => {
    setContent(content);
    window.localStorage.setItem("facultyNavigationContent", content);
  };

  const getContent = () => {
    switch (content) {
      case "dashboard":
        return <FacultyDashboard />;
      case "forms":
        return <FacultyForms />;
      case "pendingforms":
        return <PendingForms />;
      case "reviewedforms":
        return <PendingForms />;
      default:
        return <Typography paragraph>Invalid content selected.</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <LoggedInHeader />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: drawerWidth + 1,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding sx={{ cursor: "pointer" }}>
              <ListItemButton
                selected={content === "dashboard"}
                onClick={(event) => handleListItemClick(event, "dashboard")}
              >
                <ListItemIcon sx={{ color: "#000000" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ cursor: "pointer" }}>
              <ListItemButton
                selected={content === "forms"}
                onClick={(event) => handleListItemClick(event, "forms")}
              >
                <ListItemIcon sx={{ color: "#000000" }}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Forms" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ cursor: "pointer" }}>
              <ListItemButton
                selected={content === "pendingforms"}
                onClick={(event) => handleListItemClick(event, "pendingforms")}
              >
                <ListItemIcon sx={{ color: "#000000" }}>
                  <PendingActionsIcon />
                </ListItemIcon>
                <ListItemText primary="Pending Forms" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ cursor: "pointer" }}>
              <ListItemButton
                selected={content === "reviewedforms"}
                onClick={(event) => handleListItemClick(event, "reviewedforms")}
              >
                <ListItemIcon sx={{ color: "#000000" }}>
                  <TaskSharpIcon />
                </ListItemIcon>
                <ListItemText primary="Reviewed Forms" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, left: drawerWidth }}>
        <Toolbar />
        {getContent()}
      </Box>
    </Box>
  );
}
