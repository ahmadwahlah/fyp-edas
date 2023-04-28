import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function FilterBar() {
  const [timeFilter, setTimeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [formFilter, setFormFilter] = useState("all");

  const handleTimeChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  const handleFormChange = (event) => {
    setFormFilter(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-evenly",
        marginTop: "25px",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontWeight: "bold",
          color: "black",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Filter By
      </Typography>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="time-filter-label">Time</InputLabel>
        <Select
          labelId="time-filter-label"
          id="time-filter"
          value={timeFilter}
          label="Time"
          onChange={handleTimeChange}
          margin="dense"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="lastWeek">Last Week</MenuItem>
          <MenuItem value="lastMonth">Last Month</MenuItem>
          <MenuItem value="lastYear">Last Year</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="department-filter-label">Department/Faculty</InputLabel>
        <Select
          labelId="department-filter-label"
          margin="dense"
          id="department-filter"
          value={departmentFilter}
          label="Department/Faculty"
          onChange={handleDepartmentChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="myForms">FCSE</MenuItem>
          <MenuItem value="teamForms">Finance</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="form-filter-label">Form</InputLabel>
        <Select
          labelId="form-filter-label"
          id="from-filter"
          value={formFilter}
          margin="dense"
          label="Form"
          onChange={handleFormChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="formA">Form A</MenuItem>
          <MenuItem value="formB">Form B</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
