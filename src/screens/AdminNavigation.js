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
import PeopleIcon from "@mui/icons-material/People";

import LoggedInHeader from "../components/LoggedInHeader";
import AdminDashboard from "../components/AdminDashboard";
import AdminUserManagement from "../components/AdminUserManagement";

const drawerWidth = 240;

export default function AdminNavigation() {
  const [content, setContent] = React.useState("dashboard");

  const handleListItemClick = (event, content) => {
    setContent(content);
  };

  const getContent = () => {
    switch (content) {
      case "dashboard":
        return <AdminDashboard />;
      case "userManagement":
        return <AdminUserManagement />;
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
            //            backgroundColor: "#F5F5F5",
            //            borderRight: "1px solid black",
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
              onClick={(event) => handleListItemClick(event, "userManagement")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "#000000" }}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="User Management" />
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
