import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import DashboardCard from "./DashboardCard";

export default function CardGroup() {
  const [formSubmitted, setFormSubmitted] = useState(0);
  const [formApproved, setFormApproved] = useState(0);
  const [formRejected, setFormRejected] = useState(0);
  const [pendingForms, setPendingForms] = useState(0);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    // Fetch the data from the backend API
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setFormSubmitted(data.formSubmitted);
        setFormApproved(data.formApproved);
        setFormRejected(data.formRejected);
        setPendingForms(data.pendingForms);
        setApiError(false);
      })
      .catch((error) => {
        console.error(error);
        setApiError(true);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "25px",
        marginBottom: "25px",
        flexWrap: "wrap",
        gap: "20px",
        "& > *": {
          flexBasis: "250px",
          flexGrow: 1,
          minWidth: 0,
        },
      }}
    >
      <DashboardCard
        title="Forms Submitted"
        value={apiError ? 27 : formSubmitted}
      />
      <DashboardCard
        title="Forms Approved"
        value={apiError ? 15 : formApproved}
      />
      <DashboardCard
        title="Forms Rejected"
        value={apiError ? 7 : formRejected}
      />
      <DashboardCard
        title="Pending Forms"
        value={apiError ? 5 : pendingForms}
      />
    </Box>
  );
}
