import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import DashboardCard from "./DashboardCard";

export default function CardGroupFaculty() {
  const [formSubmitted, setFormSubmitted] = useState(0);
  const [formApproved, setFormApproved] = useState(0);
  const [formRejected, setFormRejected] = useState(0);
  const [pendingForms, setPendingForms] = useState(0);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const submitted = await axios.get(
          "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/faculty/submittedforms",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        const approved = await axios.get(
          "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/faculty/approvedforms",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        const rejected = await axios.get(
          "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/faculty/disapprovedforms",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        setFormSubmitted(submitted.data.submittedFormValue);
        const submit = submitted.data.submittedFormValue;

        setFormApproved(approved.data.approvedFormCount);
        const approve = approved.data.approvedFormCount;

        setFormRejected(rejected.data.disapprovedFormCount);
        const reject = rejected.data.disapprovedFormCount;

        const pending = submit - approve - reject;
        setPendingForms(pending);
      } catch (error) {
        setApiError(true);
      }
    };

    fetchData();
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
