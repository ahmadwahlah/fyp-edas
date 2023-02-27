import React, { useState } from "react";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import CardGroup from "./CardGroup";
import SearchBar from "./SearchBar";
import Typography from "@mui/material/Typography";
import FormHistoryCard from "./FormHistoryCard";

const forms = [
  {
    formName: "Hall Requisition",
    submissionDate: "2022-02-25, 10:00:00",
    department: "Department A",
    status: "Approved",
  },
  {
    formName: "Leave",
    submissionDate: "2022-02-24, 12:00:00",
    department: "Department B",
    status: "Pending",
  },
  {
    formName: "Medical Leave",
    submissionDate: "2022-02-23, 8:08:08",
    department: "Department C",
    status: "Disapproved",
  },
  {
    formName: "Vehicle Requisition",
    submissionDate: "2022-02-22, 6:00:00",
    department: "Department D",
    status: "Pending",
  },
  {
    formName: "Form 5",
    submissionDate: "2022-02-21, 9:09:00",
    department: "Department E",
    status: "Approved",
  },
  {
    formName: "Form 6",
    submissionDate: "2022-02-20, 10:00:00",
    department: "Department F",
    status: "Disapproved",
  },
  // add more objects for the remaining forms
];

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredForms, setFilteredForms] = useState(forms);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = forms.filter((form) =>
      form.formName.trim().replace(/\s/g, " ").toLowerCase().includes(value)
    );
    setFilteredForms(filtered);
  };

  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
      <CardGroup />
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
            submissionDate={data.submissionDate}
            department={data.department}
            status={data.status}
          />
        ))}
        <Divider />
      </Box>
    </Box>
  );
}
