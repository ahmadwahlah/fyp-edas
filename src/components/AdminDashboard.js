import React from "react";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import CardGroup from "./CardGroup";
import FilterBar from "./FilterBar";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function AdminDashboard() {
  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
      <FilterBar />
      <Divider />
      <CardGroup />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "2.5%",
        }}
      >
        <LineChart />
        <PieChart />
      </div>
    </Box>
  );
}
