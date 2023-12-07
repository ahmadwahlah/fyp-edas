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
  Grid,
} from "@mui/material";
import axios from "axios";
import PrintButton from "./PrintButton";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloseIcon from "@mui/icons-material/Close";

export default function ReviewedFormsDialogFaculty({
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Name: </strong>
                {user.firstname} {user.lastname}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Role: </strong>
                {user.role}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Subrole: </strong>
                {user.subrole}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Faculty: </strong>
                {user.department}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Email: </strong>
                {user.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Phone Number: </strong>
                {user.phoneNumber}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ mb: 2, mt: 2, ml: 2 }}>
          <Grid container spacing={2}>
            {response && response.combinedArray ? (
              response.combinedArray.map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Typography variant="subtitle1">
                    <strong>{item.heading}: </strong>
                    {item.value ? item.value : item.values.join(", ")}
                  </Typography>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="subtitle1">No data available</Typography>
              </Grid>
            )}
          </Grid>
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
          <Button
            startIcon={<CloseIcon />}
            onClick={onClose}
            variant="contained"
          >
            Close
          </Button>
          <Box>
            {image && (
              <Button
                startIcon={<AttachmentIcon />}
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                View Attachment
              </Button>
            )}
            <PrintButton />
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
