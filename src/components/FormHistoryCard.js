import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
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
    statusColor = "darkorange";
  }

  const formattedDate = new Date(submissionDate).toLocaleString();

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ minWidth: 275, backgroundColor: "#f5f5f5" }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {formName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666666" }}>
              {formattedDate}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666666" }}>
              {department}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "6rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: statusColor }}>{statusIcon}</span>
              <Typography
                variant="body2"
                sx={{ color: statusColor, fontWeight: "bold" }}
              >
                {status}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormHistoryCard;
