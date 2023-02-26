import React from "react";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import CardGroup from "./CardGroup";
import FormHistoryList from "./FormHistoryList";
import SearchBar from "./SearchBar";
import Typography from "@mui/material/Typography";

export default function StudentDashboard() {
  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
      <CardGroup />
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "black",
            textTransform: "uppercase",
            letterSpacing: 1,
            mr: 2,
          }}
        >
          Forms History
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <SearchBar sx={{ ml: 2 }} />
        </Box>
      </Box>
      <Divider />
      <FormHistoryList />
    </Box>
  );
}
