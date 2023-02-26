import React from "react";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import FormHistoryCard from "./FormHistoryCard";

export default function StudentDashboard() {
  const formName = "Expense Report";
  const submissionDate = "2023-02-24";
  const department = "Finance";
  const statuses = ["Approved", "Disapproved", "Pending"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
      <FormHistoryCard
        formName={formName}
        submissionDate={submissionDate}
        department={department}
        status={randomStatus}
      />
      <FormHistoryCard
        formName={formName}
        submissionDate={submissionDate}
        department={department}
        status={randomStatus}
      />
      <FormHistoryCard
        formName={formName}
        submissionDate={submissionDate}
        department={department}
        status={randomStatus}
      />
      <FormHistoryCard
        formName={formName}
        submissionDate={submissionDate}
        department={department}
        status={randomStatus}
      />
      <FormHistoryCard
        formName={formName}
        submissionDate={submissionDate}
        department={department}
        status={randomStatus}
      />
      <FormHistoryCard
        formName={formName}
        submissionDate={submissionDate}
        department={department}
        status={randomStatus}
      />
      <FormHistoryCard
        formName={formName}
        submissionDate={submissionDate}
        department={department}
        status={randomStatus}
      />
      <FormHistoryCard
        formName={formName}
        submissionDate={submissionDate}
        department={department}
        status={randomStatus}
      />
      <Divider />
    </Box>
  );
}
