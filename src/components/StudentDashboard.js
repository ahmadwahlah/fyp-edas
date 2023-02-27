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
    submissionDate: "2022-09-01",
    submissionTime: "09:30:00",
    status: "Approved",
  },
  {
    formName: "Leave Application",
    submissionDate: "2022-08-15",
    submissionTime: "13:45:00",
    status: "Pending",
  },
  {
    formName: "Expense Reimbursement",
    submissionDate: "2022-10-03",
    submissionTime: "11:15:00",
    status: "Disapproved",
  },
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
            department={data.submissionTime}
            status={data.status}
          />
        ))}
        <Divider />
      </Box>
    </Box>
  );
}
