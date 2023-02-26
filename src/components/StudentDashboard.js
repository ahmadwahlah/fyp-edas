import React from "react";
import { Divider, Grid } from "@mui/material";
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
      <Grid container sx={{ alignItems: "center", mb: 2 }}>
        <Grid item>
          <Typography variant="h4">Forms History</Typography>
        </Grid>
        <Grid item xs />
        <Grid item>
          <SearchBar />
        </Grid>
      </Grid>
      <FormHistoryList />
    </Box>
  );
}
