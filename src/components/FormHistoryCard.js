import React, { useState, useEffect } from "react";
import moment from "moment";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { CheckCircle, Error, HourglassEmpty } from "@mui/icons-material";

const FormHistoryCard = ({
  formName,
  submissionDate,
  submissionTime,
  status,
  onHierarchyClick,
}) => {
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

  const formattedDate = moment(submissionDate).format("DD-MM-YYYY");
  const formattedTime = moment(submissionTime).format("HH:mm:ss");

  return (
    <Box sx={{ p: 2 }}>
      <div onClick={onHierarchyClick}>
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: "#f5f5f5",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.8)",
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {formName}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  flex: 1,
                  fontFamily: "Arial, sans-serif",
                  color: "black",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  marginTop: "0.5rem",
                }}
              >
                {`Submission Date: ${formattedDate}`}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  flex: 1,
                  fontFamily: "Arial, sans-serif",
                  color: "black",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                {`Submission Time: ${formattedTime}`}
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
      </div>
    </Box>
  );
};

export default FormHistoryCard;
