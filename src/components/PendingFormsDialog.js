import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Typography,
  DialogActions,
  Button,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function PendingFormsDialog({
  open,
  onClose,
  hierarchy,
  activestep,
  formName,
  response,
  user,
  id,
  image,
}) {
  const getStepLabelColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Disapproved":
        return "red";
      case "Pending":
      default:
        return "darkorange";
    }
  };

  const handleClick = () => {
    const link = document.createElement("a");
    link.href = image;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(id);
      console.log(token);
      const response = await axios.put(
        `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/faculty/studentForms/${id}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log("Form approved:", response);
      // TODO: You can add any additional logic to handle the successful approval here
    } catch (error) {
      console.error("Error approving form:", error);
      // TODO: You can add any additional logic to handle the error here
    }
  };

  const handleDisapprove = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(id);
      console.log(token);
      const response = await axios.put(
        `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/faculty/studentForms/disapprove/${id}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log("Form approved:", response);
      // TODO: You can add any additional logic to handle the successful approval here
    } catch (error) {
      console.error("Error approving form:", error);
      // TODO: You can add any additional logic to handle the error here
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="hierarchy-dialog-title"
      maxWidth="100vw"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          width: "60%",
        },
      }}
    >
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            <strong>{formName}</strong>
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mb: 2, mt: 2, ml: 2 }}>
          <Typography variant="subtitle1">
            <strong>Name: </strong>
            {user.firstname} {user.lastname}
          </Typography>

          <Typography variant="subtitle1">
            <strong>Role: </strong>
            {user.role}
          </Typography>

          <Typography variant="subtitle1">
            <strong>Batch Number: </strong>
            {user.batch}
          </Typography>

          <Typography variant="subtitle1">
            <strong>Reg Number: </strong>
            {user.regnum}
          </Typography>

          <Typography variant="subtitle1">
            <strong>Faculty: </strong>
            {user.faculty}
          </Typography>

          <Typography variant="subtitle1">
            <strong>Email: </strong>
            {user.email}
          </Typography>

          <Typography variant="subtitle1">
            <strong>Phone Number: </strong>
            {user.phoneNumber}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mb: 2, mt: 2, ml: 2 }}>
          {response && response.combinedArray ? (
            response.combinedArray.map((item) => (
              <Typography key={item.id} variant="subtitle1">
                <strong>{item.heading}: </strong>
                {item.value ? item.value : item.values.join(", ")}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No data available</Typography>
          )}
        </Box>
        <Divider />
        <Box sx={{ mb: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            <strong>Form Approval Progress</strong>
          </Typography>
        </Box>
        <Stepper
          orientation="horizontal"
          alternativeLabel
          activeStep={activestep}
        >
          {hierarchy.map((step, index) => (
            <Step key={index}>
              <StepLabel
                optional={
                  <Typography
                    variant="overline"
                    sx={{ color: getStepLabelColor(step.status) }}
                  >
                    {step.status}
                  </Typography>
                }
              >
                {step.title}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
          <Box>
            {image && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={{
                  mr: 1,
                }}
              >
                View Attachment
              </Button>
            )}
            <Button
              onClick={handleDisapprove}
              variant="contained"
              sx={{
                mr: 1,
                backgroundColor: "red",
                "&:hover": {
                  backgroundColor: "darkred",
                },
                "&:focus": {
                  backgroundColor: "red",
                  boxShadow: "0 0 0 3px rgba(255, 0, 0, 0.3)", // Optional: Add a red glow around the button when focused
                },
              }}
            >
              Disapprove
            </Button>
            <Button
              onClick={handleApprove}
              variant="contained"
              sx={{
                backgroundColor: "green",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                "&:focus": {
                  backgroundColor: "green",
                  boxShadow: "0 0 0 3px rgba(0, 128, 0, 0.3)", // Optional: Add a green glow around the button when focused
                },
              }}
            >
              Approve
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
