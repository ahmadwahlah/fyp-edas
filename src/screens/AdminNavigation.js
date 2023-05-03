import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";

import LoggedInHeader from "../components/LoggedInHeader";
import AdminDashboard from "../components/AdminDashboard";
import AdminUserManagement from "../components/AdminUserManagement";
import AllForms from "../components/AllForms";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function AdminNavigation() {
  const navigate = useNavigate();
  const [content, setContent] = React.useState(() => {
    // Retrieve the previous state from browser storage
    const storedContent = window.localStorage.getItem("adminNavigationContent");
    return storedContent ? storedContent : "dashboard";
  });

  // Update the state and browser storage whenever the user selects a different content
  const handleListItemClick = (event, content) => {
    setContent(content);
    window.localStorage.setItem("adminNavigationContent", content);
  };

  const getContent = () => {
    switch (content) {
      case "dashboard":
        return <AdminDashboard />;
      case "userManagement":
        return <AdminUserManagement />;
      case "forms":
        return <AllForms />;
      default:
        return <AdminDashboard />;
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
            <ListItem
              disablePadding
              onClick={(event) => handleListItemClick(event, "createform")}
              sx={{ cursor: "pointer" }}
            >
              <ListItemButton onClick={() => navigate("/formbuilder")}>
                <ListItemIcon sx={{ color: "#000000" }}>
                  <NoteAddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Form" />
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
