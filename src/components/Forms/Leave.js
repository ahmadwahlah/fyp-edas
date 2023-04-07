import * as React from "react";
import { useState } from "react";
import styled from "@mui/material/styles/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import LoggedInHeader from "../LoggedInHeader";
import CssBaseline from "@mui/material/CssBaseline";
import FileUploadButton from "../FileUploadButton";
import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StudentLeaveApplicationForm = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  React.useEffect(() => {
    if (fromDate && toDate) {
      const diffTime = Math.abs(toDate - fromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData({
        ...formData,
        numOfDays: diffDays,
        leaveRequiredFrom: dayjs(fromDate).format("YYYY-MM-DD"),
        leaveRequiredTill: dayjs(toDate).format("YYYY-MM-DD"),
      });
    }
  }, [fromDate, toDate]);

  const today = dayjs();

  const [formData, setFormData] = useState({
    leaveRequiredFrom: "",
    leaveRequiredTill: "",
    numOfDays: "",
    reason: "",
    addressDuringLeave: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = Object.values(formData).every((value) => value !== "");
    if (isFormValid) {
      console.log(formData);
      navigate("/studenthome");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <Box sx={{ marginTop: "7rem" }}>
      <LoggedInHeader />
      <CssBaseline />
      <StyledContainer maxWidth="sm">
        <StyledPaper sx={{ backgroundColor: "#f5f5f5" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              color: "black",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Student Leave Application Form
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginTop: "1.5rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2.5rem",
                  }}
                >
                  <DatePicker
                    label="From"
                    value={fromDate}
                    onChange={(newValue) => {
                      setFromDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} required />}
                    minDate={today}
                  />
                  <DatePicker
                    label="To"
                    value={toDate}
                    onChange={(newValue) => {
                      setToDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} required />}
                    minDate={today}
                  />
                </Box>
                {formData.numOfDays && (
                  <Typography
                    variant="body1"
                    sx={{
                      marginTop: ".5rem",
                      marginLeft: ".5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Number of days: {formData.numOfDays}
                  </Typography>
                )}
              </LocalizationProvider>
            </Box>
            <TextField
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
            />
            <TextField
              label="Address during Leave"
              name="addressDuringLeave"
              value={formData.addressDuringLeave}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: ".5rem",
              }}
            >
              <FileUploadButton />
              <StyledButton type="submit" variant="contained">
                Submit
              </StyledButton>
            </Box>
          </form>
        </StyledPaper>
      </StyledContainer>
    </Box>
  );
};

export default StudentLeaveApplicationForm;
