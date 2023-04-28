import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

export default function FormTracingDialog({
  open,
  onClose,
  hierarchy,
  activestep,
  formName,
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
      <DialogTitle id="hierarchy-dialog-title" sx={{ textAlign: "center" }}>
        {" "}
        {formName} - Form Approval Progress
      </DialogTitle>
      <DialogContent>
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
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
