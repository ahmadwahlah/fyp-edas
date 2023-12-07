import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import NewRequestsList from "./NewRequestsList";
import CurrentUsersList from "./CurrentUsersList";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";

const AdminUserManagementPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `user-management-tab-${index}`,
      "aria-controls": `user-management-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="inherit"
        textColor="inherit"
        aria-label="User management tabs"
        sx={{
          color: "black",
          "& .MuiTabs-indicator": {
            backgroundColor: "black",
          },
        }}
      >
        <Tab
          icon={<ListAltIcon />}
          label="New Requests"
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          icon={<PeopleIcon />}
          label="Current Users"
          iconPosition="start"
          {...a11yProps(1)}
        />
      </Tabs>
      <Box sx={{ top: 0, left: 0 }}>
        {activeTab === 0 && <NewRequestsList />}
        {activeTab === 1 && <CurrentUsersList />}
      </Box>
    </Box>
  );
};

export default AdminUserManagementPage;
