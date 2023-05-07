import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Divider,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FilterBar({
  timeFilter,
  setTimeFilter,
  departmentFilter,
  setDepartmentFilter,
  formFilter,
  setFormFilter,
}) {
  const [formNames, setFormNames] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchFormNames();
    fetchStats();
  }, [timeFilter, departmentFilter, formFilter]);

  const fetchFormNames = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/forms/names",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setFormNames(response.data);
    } catch (error) {
      console.error("Error fetching form names:", error);
    }
  };

  async function fetchStats() {
    try {
      const token = localStorage.getItem("token");
      const url = `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/forms/formStats?time=${timeFilter}&faculty=${departmentFilter}&formName=${formFilter}`;
      console.log("Request URL:", url); // Log the request URL for debugging

      const response = await axios.get(url, {
        headers: {
          "x-auth-token": token,
        },
      });

      setStats(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  const handleTimeChange = (event) => {
    setTimeFilter(event.target.value);
    fetchStats();
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
    fetchStats();
  };

  const handleFormChange = (event) => {
    setFormFilter(event.target.value);
    fetchStats();
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
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="yesterday">Yesterday</MenuItem>
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
          <MenuItem value="Computer Science">Computer Science</MenuItem>
          <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
          <MenuItem value="Artificial Intelligence">
            Artificial Intelligence
          </MenuItem>
          <MenuItem value="Data Science">Data Science</MenuItem>
          <MenuItem value="Software Engineering">Software Engineering</MenuItem>
          <MenuItem value="Cyber Security">Cyber Security</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="form-filter-label">Form</InputLabel>
        <Select
          labelId="form-filter-label"
          id="form-filter"
          value={formFilter}
          margin="dense"
          label="Form"
          onChange={handleFormChange}
        >
          <MenuItem value="all">All</MenuItem>
          {formNames.map((formName) => (
            <MenuItem key={formName} value={formName}>
              {formName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
