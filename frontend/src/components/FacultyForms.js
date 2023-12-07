import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

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
  { name: "Leave", route: "/leave" },
  { name: "Course Registration", route: "/courseregistration" },
  { name: "Hall Requisition", route: "/hallrequisition" },
  { name: "Medical Leave", route: "/medical-leave" },
  { name: "Vehicle Requisition", route: "/vehicle-requisition" },
];

export default function FacultyForms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredForms, setFilteredForms] = useState([]);
  const [forms, setForms] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = forms.filter((form) =>
      form.name.trim().replace(/\s/g, " ").toLowerCase().includes(value)
    );
    setFilteredForms(filtered);
  };

  useEffect(() => {
    // Fetch form data from API and update state
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/dynamicforms/faculty",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        const data = response.data;
        const mappedData = data.map((form) => ({
          id: form._id,
          name: form.formName,
          route: `/facultyform/${form._id}`,
        }));
        setForms(mappedData);
        setFilteredForms(mappedData);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchForms();
  }, []);

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
        {filteredForms.map((form, index) => (
          <StyledLink to={form.route} key={form._id || index}>
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
