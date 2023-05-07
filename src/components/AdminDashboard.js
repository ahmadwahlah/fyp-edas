import React, { useState } from "react";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import CardGroupAdmin from "./CardGroupAdmin";
import FilterBar from "./FilterBar";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function AdminDashboard() {
  const [timeFilter, setTimeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [formFilter, setFormFilter] = useState("all");

  return (
    <Box
      sx={{
        width: "100%",
        left: 0,
        top: 0,
        "@media (min-width: 960px)": {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        },
      }}
    >
      <FilterBar
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        formFilter={formFilter}
        setFormFilter={setFormFilter}
      />
      <Divider />
      <CardGroupAdmin
        timeFilter={timeFilter}
        departmentFilter={departmentFilter}
        formFilter={formFilter}
      />
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "2.5%",
          "@media (min-width: 960px)": {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          },
        }}
      >
        <LineChart
          timeFilter={timeFilter}
          departmentFilter={departmentFilter}
          formFilter={formFilter}
        />
        <PieChart
          timeFilter={timeFilter}
          departmentFilter={departmentFilter}
          formFilter={formFilter}
        />
      </Box>
    </Box>
  );
}
