import * as React from "react";
import { useState } from "react";
import styled from "@mui/material/styles/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(2),
  minWidth: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StudentLeaveApplicationForm = () => {
  const [currentApproverIndex, setCurrentApproverIndex] = useState(0);
  const approvers = ["John", "Jane", "Jim"]; // replace with actual user IDs
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    leaveRequiredFrom: "",
    leaveRequiredTill: "",
    numOfDays: "",
    reason: "",
    addressDuringLeave: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Construct form data string
    let formDataString = "";
    for (let [key, value] of formData.entries()) {
      formDataString += `${key}: ${value}\n`;
    }

    // Display form data in alert window
    alert(formDataString);

    // TODO: send formData to first approver in array
    fetch("/approve", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.ok) {
          // TODO: handle success
        } else {
          throw new Error("Error sending form data");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error sending form data");
      });
    // and disable submit button

    setCurrentApproverIndex(1); // move to next approver
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledPaper>
        <h2>Student Leave Application Form</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Student's Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Reg No"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <StyledFormControl fullWidth margin="normal" required>
            <InputLabel>Leave Required From</InputLabel>
            <Select
              name="leaveRequiredFrom"
              value={formData.leaveRequiredFrom}
              onChange={handleChange}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="tomorrow">Tomorrow</MenuItem>
              <MenuItem value="other">Other (please specify)</MenuItem>
            </Select>
            {formData.leaveRequiredFrom === "other" && (
              <TextField
                name="leaveRequiredFrom"
                value={formData.leaveRequiredFrom}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            )}
          </StyledFormControl>
          <TextField
            label="Leave Required Till"
            name="leaveRequiredTill"
            value={formData.leaveRequiredTill}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="No of Days"
            name="numOfDays"
            value={formData.numOfDays}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
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
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <StyledButton type="submit" variant="contained" color="primary">
            Submit
          </StyledButton>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default StudentLeaveApplicationForm;
