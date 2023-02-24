import React from "react";
import { Divider } from "@mui/material";
import CardGroup from "./CardGroup";
import FilterBar from "./FilterBar";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

export default function AdminDashboard() {
  return (
    <div>
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
    </div>
  );
}
