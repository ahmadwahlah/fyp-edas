import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Grid, Card, CardContent } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import LoggedInHeader from "../components/LoggedInHeader";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  marginBottom: theme.spacing(2),
}));

const EditUser = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    role: "Student",
    firstName: "John",
    lastName: "Doe",
    faculty: "Computer Science",
    regNo: "2021-12345",
    batchNo: "2021",
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    password: "********",
    courses: [],
  });

  const allCourses = [
    "Course 1",
    "Course 2",
    "Course 3",
    "Course 4",
    "Course 5",
  ];

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({
        ...profileData,
        profilePicture: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCoursesChange = (event, value) => {
    setProfileData({
      ...profileData,
      courses: value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex" }}>
      <LoggedInHeader />
      <Box sx={{ flexGrow: 1, mt: 12, mx: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Profile Picture */}
                <input
                  accept="image/*"
                  id="profilePictureInput"
                  type="file"
                  hidden
                  disabled={!isEditable}
                  onChange={handleProfilePicChange}
                />
                <label htmlFor="profilePictureInput">
                  <StyledAvatar
                    src={profileData.profilePicture}
                    alt="Profile Picture"
                    sx={isEditable ? { cursor: "pointer" } : {}}
                  />
                </label>
                {/* Role */}
                <Typography component="h1" variant="h5">
                  {profileData.role}
                </Typography>
                {/* Edit Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleEditClick}
                  sx={{ mt: 2 }}
                >
                  {isEditable ? "Save" : "Edit"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Registration Number"
                      name="regNo"
                      value={profileData.regNo}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Batch Number"
                      name="batchNo"
                      value={profileData.batchNo}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Faculty"
                      name="faculty"
                      value={profileData.faculty}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={profileData.password}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={allCourses}
                      value={profileData.courses}
                      onChange={handleCoursesChange}
                      disabled={!isEditable}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Courses"
                          margin="normal"
                          fullWidth
                        />
                      )}
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditUser;
