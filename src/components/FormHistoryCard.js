import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CheckCircle, Error, HourglassEmpty } from "@mui/icons-material";

const FormHistoryCard = ({ formName, submissionDate, department, status }) => {
  let statusIcon;
  let statusColor;

  if (status === "Approved") {
    statusIcon = <CheckCircle />;
    statusColor = "green";
  } else if (status === "Disapproved") {
    statusIcon = <Error />;
    statusColor = "red";
  } else {
    statusIcon = <HourglassEmpty />;
    statusColor = "orange";
  }

  const formattedDate = new Date(submissionDate).toLocaleString();

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ minWidth: 275, backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="div">
                {formName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                Form Submission Date: {formattedDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">Department: {department}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="div">
                Status:{" "}
                <span style={{ color: statusColor }}>
                  {statusIcon} {status}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormHistoryCard;
