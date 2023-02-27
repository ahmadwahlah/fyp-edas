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

import LoggedInHeader from "../components/LoggedInHeader";
import StudentDashboard from "../components/StudentDashboard";
import Forms from "../components/StudentForms";

const drawerWidth = 240;

export default function StudentNavigation() {
  const [content, setContent] = React.useState(() => {
    // Retrieve the previous state from browser storage
    const storedContent = window.localStorage.getItem(
      "studentNavigationContent"
    );
    return storedContent ? storedContent : "dashboard";
  });

  // Update the state and browser storage whenever the user selects a different content
  const handleListItemClick = (event, content) => {
    setContent(content);
    window.localStorage.setItem("studentNavigationContent", content);
  };

  const getContent = () => {
    switch (content) {
      case "dashboard":
        return <StudentDashboard />;
      case "forms":
        return <Forms />;
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
            <ListItem
              disablePadding
              onClick={(event) => handleListItemClick(event, "dashboard")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#000000" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={(event) => handleListItemClick(event, "forms")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#000000" }}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Forms" />
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
