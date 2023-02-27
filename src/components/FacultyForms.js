import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: ".25rem",
  marginBottom: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "0.5rem",
  cursor: "pointer",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Added box-shadow
  background: "linear-gradient(135deg, #f5f5f5, #d8d8d8)", // Added gradient background
  fontFamily: "'Helvetica Neue', sans-serif", // Changed font
  transition: "all 0.2s ease-in-out", // Added hover effect
  "&:hover": {
    transform: "scale(1.0075)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    background: "linear-gradient(145deg, #fff, #000)",
  },
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});

// Define the form names and their respective routes
const forms = [
  { name: "Vehicle Requisition", route: "/vehicle-requisition" },
  { name: "Procurement Form", route: "/procurement-form" },
];

export default function Forms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredForms, setFilteredForms] = useState(forms);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = forms.filter((form) =>
      form.name.trim().replace(/\s/g, " ").toLowerCase().includes(value)
    );
    setFilteredForms(filtered);
  };

  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
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
            fontSize: 30,
            letterSpacing: 1,
            mr: 2,
          }}
        >
          Forms
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <SearchBar sx={{ ml: 2 }} value={searchQuery} func={handleSearch} />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ padding: "1rem" }}>
        {filteredForms.map((form) => (
          <StyledLink to={form.route} key={form.name}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    color: "black",
                    textTransform: "uppercase",
                  }}
                >
                  {form.name}
                </Typography>
              </CardContent>
            </StyledCard>
          </StyledLink>
        ))}
      </Box>
    </Box>
  );
}
