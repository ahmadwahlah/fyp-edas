import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  marginBottom: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "0.5rem",
  cursor: "pointer",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});

// Define the form names and their respective routes
const forms = [
  { name: "Hall Requisition", route: "/hall-requisition" },
  { name: "Medical Leave", route: "/medical-leave" },
  { name: "Leave", route: "/leave" },
  { name: "Vehicle Requisition", route: "/vehicle-requisition" },
  { name: "Procurement Form", route: "/procurement-form" },
];

export default function Forms() {
  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
      <SearchBar />
      <Box sx={{ padding: "1rem" }}>
        {forms.map((form) => (
          <StyledLink to={form.route} key={form.name}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5">{form.name}</Typography>
              </CardContent>
            </StyledCard>
          </StyledLink>
        ))}
      </Box>
    </Box>
  );
}
