import * as React from "react";
import { useState } from "react";
import styled from "@mui/material/styles/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import LoggedInHeader from "../LoggedInHeader";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router";

import CourseAutocomplete from "../CourseAutocomplete";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CourseRegistrationForm = () => {
  const navigate = useNavigate();

  const courses = [
    {
      courseNo: "CSE101",
      title: "Introduction to Computer Science",
      creditHours: 3,
    },
    { courseNo: "MATH101", title: "Calculus I", creditHours: 4 },
    { courseNo: "PHY101", title: "Physics I", creditHours: 3 },
    // Add more courses here
  ];

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedCourses.length > 0) {
      console.log(selectedCourses);
      navigate("/studenthome");
    } else {
      alert("Please select at least one course");
    }
  };

  const totalCreditHours = selectedCourses.reduce(
    (sum, course) => sum + course.creditHours,
    0
  );

  // Filter out selected courses from the list
  const availableCourses = courses.filter(
    (course) =>
      !selectedCourses.some(
        (selectedCourse) => selectedCourse.courseNo === course.courseNo
      )
  );

  return (
    <Box sx={{ marginTop: "7rem" }}>
      <LoggedInHeader />
      <CssBaseline />
      <StyledContainer maxWidth="sm">
        <StyledPaper sx={{ backgroundColor: "#f5f5f5" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              color: "black",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Course Registration Form
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginTop: "1.5rem" }}>
              <CourseAutocomplete
                courses={availableCourses}
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses}
              />
              <Typography
                variant="body1"
                sx={{
                  marginTop: ".5rem",
                  marginLeft: ".5rem",
                  fontWeight: "bold",
                }}
              >
                Total credit hours: {totalCreditHours}
              </Typography>
            </Box>
            {selectedCourses.map((course) => (
              <Box key={course.courseNo} sx={{ marginTop: "1.5rem" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {course.courseNo}: {course.title}
                </Typography>
                <Typography variant="body2">
                  Credit Hours: {course.creditHours}
                </Typography>
              </Box>
            ))}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1.5rem",
              }}
            >
              <StyledButton type="submit" variant="contained">
                Register
              </StyledButton>
            </Box>
          </form>
        </StyledPaper>
      </StyledContainer>
    </Box>
  );
};

export default CourseRegistrationForm;
