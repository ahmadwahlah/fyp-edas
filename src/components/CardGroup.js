import React from "react";
import DashboardCard from "./DashboardCard";

export default function CardGroup() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    >
      <DashboardCard title="Forms Submitted" value={27} />
      <DashboardCard title="Forms Approved" value={15} />
      <DashboardCard title="Forms Rejected" value={7} />
      <DashboardCard title="Pending Forms" value={5} />
    </div>
  );
}
