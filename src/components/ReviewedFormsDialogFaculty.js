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

export default function ReviewedFormsDialogFaculty({
  open,
  onClose,
  hierarchy,
  activestep,
  formName,
  response,
  user,
  id,
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
            <strong>Subrole: </strong>
            {user.subrole}
          </Typography>

          <Typography variant="subtitle1">
            <strong>Faculty: </strong>
            {user.department}
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
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
