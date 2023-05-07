import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import DashboardCard from "./DashboardCard";

export default function CardGroupAdmin({
  timeFilter,
  departmentFilter,
  formFilter,
}) {
  const [formSubmitted, setFormSubmitted] = useState(0);
  const [formApproved, setFormApproved] = useState(0);
  const [formRejected, setFormRejected] = useState(0);
  const [pendingForms, setPendingForms] = useState(0);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/forms/formStats?time=${timeFilter}&faculty=${departmentFilter}&formName=${formFilter}`;

        const response = await axios.get(url, {
          headers: {
            "x-auth-token": token,
          },
        });

        setFormSubmitted(response.data.totalForms);
        setFormApproved(response.data.approvedForms);
        setFormRejected(response.data.rejectedForms);
        setPendingForms(response.data.pendingForms);
        setApiError(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setApiError(true);
      }
    };

    fetchStats();
  }, [timeFilter, departmentFilter, formFilter]);

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
        value={apiError ? "-" : formSubmitted}
      />
      <DashboardCard
        title="Forms Approved"
        value={apiError ? "-" : formApproved}
      />
      <DashboardCard
        title="Forms Rejected"
        value={apiError ? "-" : formRejected}
      />
      <DashboardCard
        title="Pending Forms"
        value={apiError ? "-" : pendingForms}
      />
    </Box>
  );
}
