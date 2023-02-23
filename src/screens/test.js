import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function NavigationTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      orientation="vertical"
      sx={{ borderRight: 1, borderColor: "divider" }}
    >
      <Tab label="Dashboard" icon={<DashboardIcon />} />
      <Tab label="User Management" icon={<PeopleAltIcon />} />
    </Tabs>
  );
}

export default NavigationTabs;
