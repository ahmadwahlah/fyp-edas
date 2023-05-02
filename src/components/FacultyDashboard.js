import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import CardGroupFaculty from "./CardGroupFaculty";
import SearchBar from "./SearchBar";
import Typography from "@mui/material/Typography";
import FormHistoryCard from "./FormHistoryCard";
import FormTrackingDialog from "./FormTrackingDialog";
import axios from "axios";

export default function FacultyDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredForms, setFilteredForms] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentHierarchy, setCurrentHierarchy] = useState([]);
  const [currentFormName, setCurrentFormName] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const [allForms, setAllForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/forms/faculty",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setFilteredForms(response.data);
        setAllForms(response.data); // store fetched forms in the state
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const setActiveStepIndex = (hierarchy) => {
    let lastApprovedOrDisapprovedIndex = 0;
    for (let i = 0; i < hierarchy.length; i++) {
      if (hierarchy[i].status === "Approved") {
        lastApprovedOrDisapprovedIndex = i + 1;
      } else if (hierarchy[i].status === "Disapproved") {
        lastApprovedOrDisapprovedIndex = i;
      }
    }
    return lastApprovedOrDisapprovedIndex;
  };

  // ... (previous imports and code)

  const handleHierarchyClick = (approvers, formName) => {
    const hierarchy = approvers.map((approver) => ({
      title: approver.role,
      status: approver.disapproved
        ? "Disapproved"
        : approver.approved
        ? "Approved"
        : "Pending",
    }));

    setCurrentHierarchy(hierarchy);
    setActiveStep(setActiveStepIndex(hierarchy));
    setCurrentFormName(formName);
    setDialogOpen(true);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = allForms.filter((form) =>
      form.formName.trim().replace(/\s/g, " ").toLowerCase().includes(value)
    );
    setFilteredForms(filtered);
  };

  const getFormStatus = (approvers) => {
    let isAnyDisapproved = false;
    let isAllApproved = true;

    approvers.forEach((approver) => {
      if (approver.disapproved) {
        isAnyDisapproved = true;
      }
      if (!approver.approved) {
        isAllApproved = false;
      }
    });

    if (isAnyDisapproved) {
      return "Disapproved";
    } else if (isAllApproved) {
      return "Approved";
    } else {
      return "Pending";
    }
  };

  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
      <CardGroupFaculty />
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "black",
            textTransform: "uppercase",
            letterSpacing: 1,
            mr: 2,
          }}
        >
          Forms History
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <SearchBar sx={{ ml: 2 }} value={searchQuery} func={handleSearch} />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ width: "100%", left: 0, top: 0 }}>
        {filteredForms.map((data, index) => (
          <FormHistoryCard
            key={index}
            formName={data.formName}
            submissionDate={data.date}
            status={getFormStatus(data.approvers)}
            onHierarchyClick={() =>
              handleHierarchyClick(data.approvers, data.formName)
            }
          />
        ))}
        <Divider />
      </Box>
      <FormTrackingDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        hierarchy={currentHierarchy}
        activestep={activeStep}
        formName={currentFormName}
      />
    </Box>
  );
}
