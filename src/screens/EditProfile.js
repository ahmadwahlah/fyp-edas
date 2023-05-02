import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Grid, Card, CardContent } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useLocation } from "react-router-dom";

import LoggedInHeader from "../components/LoggedInHeader";

function CustomSelect(props) {
  const { label, options, ...rest } = props;

  return (
    <TextField
      {...rest}
      select
      label={label}
      SelectProps={{
        native: true,
      }}
      variant="outlined"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(16),
  height: theme.spacing(16),
  marginBottom: theme.spacing(2),
}));

const EditProfile = () => {
  const location = useLocation(); // Use the useLocation hook
  const userId = location.state?.userId;
  const userRole = location.state?.userRole;

  console.log("User ID:", userId);
  console.log("User Role:", userRole);
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    role: "Student",
    firstName: "test",
    lastName: "XXXXX",
    faculty: "Computer Science",
    regNo: "XXXXXXX",
    batchNo: "XX",
    email: "ahmad@example.com",
    phoneNumber: "1234567890",
    password: "********",
    courses: [],
  });

  const allCourses = ["HM-321", "CS-424", "Course 3", "Course 4", "Course 5"];

  const handleEditClick = async () => {
    if (isEditable) {
      await updateProfileData();
    }
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/student/data/${userId}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          console.log(response.data);
          setProfileData({
            ...profileData,
            //   // Map the received data to the respective fields
            //   profilePicture: data.profile_picture,
            //   role: data.role,
            firstName: data.firstname,
            lastName: data.lastname,
            faculty: data.faculty,
            regNo: data.regnum,
            batchNo: data.batch,
            email: data.email,
            phoneNumber: data.phoneNumber,
            //   // Assuming the API provides courses in a compatible format
            courses: data.courses,
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const updateProfileData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/student/data/${userId}`,
        {
          phoneNumber: profileData.phoneNumber,
          courses: profileData.courses,
          firstname: profileData.firstName,
          lastname: profileData.lastName,
          faculty: profileData.faculty,
          regnum: profileData.regNo,
          batch: profileData.batchNo,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully");
      } else {
        console.error("Error updating profile data");
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };
  const [coursesList, setCoursesList] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/course"
      );

      if (response.status === 200) {
        console.log(response.data[0].courses.map((course) => course.name));

        const courses = response.data[0].courses.map((course) => course.name);
        setCoursesList(courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ display: "flex" }}>
      <LoggedInHeader />
      <Box sx={{ flexGrow: 1, mt: 12, mx: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                padding: 3,
                backgroundColor: "background.paper",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "background.default",
                },
              }}
            >
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
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                padding: 3,
                backgroundColor: "background.paper",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "background.default",
                },
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Registration Number"
                      name="regNo"
                      value={profileData.regNo}
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSelect
                      label="Batch Number"
                      name="batchNo"
                      value={profileData.batchNo}
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      disabled={!isEditable}
                      options={[
                        {
                          value: "27",
                          label: "27",
                        },
                        {
                          value: "28",
                          label: "28",
                        },
                        {
                          value: "29",
                          label: "29",
                        },
                        {
                          value: "30",
                          label: "30",
                        },
                        {
                          value: "31",
                          label: "31",
                        },
                        {
                          value: "32",
                          label: "32",
                        },
                        {
                          value: "33",
                          label: "33",
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSelect
                      label="Faculty"
                      name="faculty"
                      value={profileData.faculty}
                      fullWidth
                      margin="normal"
                      onChange={handleInputChange}
                      disabled={!isEditable}
                      options={[
                        {
                          value: "Computer Science",
                          label: "Computer Science",
                        },
                        {
                          value: "Computer Engineering",
                          label: "Computer Engineering",
                        },
                        {
                          value: "Artificial Intelligence",
                          label: "Artificial Intelligence",
                        },
                        {
                          value: "Data Science",
                          label: "Data Science",
                        },
                        {
                          value: "Software Engineering",
                          label: "Software Engineering",
                        },
                        {
                          value: "Cyber Security",
                          label: "Cyber Security",
                        },
                      ]}
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
                      disabled
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
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={coursesList}
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

export default EditProfile;
