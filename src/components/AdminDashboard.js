import React from "react";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import CardGroup from "./CardGroup";
import FilterBar from "./FilterBar";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function AdminDashboard() {
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
      <FilterBar />
      <Divider />
      <CardGroup />
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
        <LineChart />
        <PieChart />
      </Box>
    </Box>
  );
}
