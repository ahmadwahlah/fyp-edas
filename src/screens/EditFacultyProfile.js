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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import LoggedInHeader from "../components/LoggedInHeader";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

function CustomSelect(props) {
  const { label, options, ...rest } = props;
  return (
    <TextField
      {...rest}
      select
      label={label}
      fullWidth
      margin="normal"
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

const EditFacultyProfile = () => {
  const location = useLocation(); // Use the useLocation hook
  const userId = location.state?.userId;
  const userRole = location.state?.userRole;

  console.log("User ID:", userId);
  console.log("User Role:", userRole);
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    subrole: "Lecturer",
    role: "Faculty",
    firstName: "XXX",
    lastName: "XXXXX",
    department: "XXX XXXXXX",
    email: "XXXXX@example.com",
    phoneNumber: "1234567890",
    password: "********",
    courses: ["Course 1", "Course 2"],
    externalrole: [
      {
        externalfaculty: "FCS",
        role: "advisor",
        batch: 29,
      },
      {
        externalfaculty: "FCS",
        role: "Dean",
        batch: 29,
      },
    ],
  });

  const allCourses = [
    "Course 1",
    "Course 2",
    "Course 3",
    "Course 4",
    "Course 5",
  ];

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

  const handleRoleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/faculty/data/${userId}`,
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
            //     //   // Map the received data to the respective fields
            //   profilePicture: data.profile_picture,
            //  role: data.role
            subrole: data.subrole,
            firstName: data.firstname,
            lastName: data.lastname,
            department: data.department,
            email: data.email,
            phoneNumber: data.phoneNumber,
            //     //   // Assuming the API provides courses in a compatible format
            courses: data.courses,
            externalrole: data.externalRoles,
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error, error.message);
      }
    };

    fetchProfileData();
  }, []);

  const [department, setDepartment] = useState(profileData.department || "");
  useEffect(() => {
    setDepartment(profileData.department);
  }, [profileData.department]);

  const [subRoleOptions, setSubRoleOptions] = useState([]);

  useEffect(() => {
    if (department === "Admin") {
      setSubRoleOptions([
        { value: "Rector", label: "Rector" },
        { value: "Pro-Rector (A)", label: "Pro-Rector (A)" },
        { value: "Pro-Rector (A&F)", label: "Pro-Rector (A&F)" },
        { value: "Director Facilitation", label: "Director Facilitation" },
        { value: "Account Section", label: "Account Section" },
        { value: "HR", label: "HR" },
      ]);
    } else if (department === "IT") {
      setSubRoleOptions([{ value: "IT Manager", label: "IT Manager" }]);
    } else if (department === "Transportation") {
      setSubRoleOptions([
        { value: "Transportation Manager", label: "Transportation Manager" },
      ]);
    } else if (department === "Security") {
      setSubRoleOptions([
        { value: "Security Manager", label: "Security Manager" },
      ]);
    } else {
      setSubRoleOptions([
        { value: "Professor", label: "Professor" },
        { value: "Associate Professor", label: "Associate Professor" },
        { value: "Assistant Professor", label: "Assistant Professor" },
        { value: "Lecturer", label: "Lecturer" },
        { value: "Lab Instructor", label: "Lab Instructor" },
      ]);
    }
  }, [department]);

  const handleDepartmentChange = (event) => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
  };

  const handleDepartmentInputChange = (event) => {
    handleDepartmentChange(event);
    handleInputChange(event);

    // Update the subrole to the first subrole option of the new department
    const selectedDepartment = event.target.value;
    let newSubRoleOptions = [];

    if (selectedDepartment === "Admin") {
      newSubRoleOptions = [
        { value: "Rector", label: "Rector" },
        { value: "Pro-Rector (A)", label: "Pro-Rector (A)" },
        { value: "Pro-Rector (A&F)", label: "Pro-Rector (A&F)" },
        { value: "Director Facilitation", label: "Director Facilitation" },
        { value: "Account Section", label: "Account Section" },
        { value: "HR", label: "HR" },
      ];
    } else if (selectedDepartment === "IT") {
      newSubRoleOptions = [{ value: "IT Manager", label: "IT Manager" }];
    } else if (selectedDepartment === "Transportation") {
      newSubRoleOptions = [
        { value: "Transportation Manager", label: "Transportation Manager" },
      ];
    } else if (selectedDepartment === "Security") {
      newSubRoleOptions = [
        { value: "Security Manager", label: "Security Manager" },
      ];
    } else {
      newSubRoleOptions = [
        { value: "Professor", label: "Professor" },
        { value: "Associate Professor", label: "Associate Professor" },
        { value: "Assistant Professor", label: "Assistant Professor" },
        { value: "Lecturer", label: "Lecturer" },
        { value: "Lab Instructor", label: "Lab Instructor" },
      ];
    }

    if (newSubRoleOptions.length > 0) {
      setProfileData({
        ...profileData,
        department: selectedDepartment,
        subrole: newSubRoleOptions[0].value,
      });
    }
  };

  const updateProfileData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/faculty/data/${userId}`,
        {
          phoneNumber: profileData.phoneNumber,
          courses: profileData.courses,
          firstname: profileData.firstName,
          lastname: profileData.lastName,
          department: profileData.department,
          subrole: profileData.subrole,
          externalRoles: profileData.externalrole,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log(profileData.subrole);

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

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex" }}>
      <LoggedInHeader />
      <Box>
        <Button
          onClick={handleBackClick}
          startIcon={<ArrowBackIosNewIcon />}
          color="primary"
          sx={{ flexGrow: 1, mt: 12 }}
        >
          Back
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, mt: 12, mx: 4, marginBottom: "1.5rem" }}>
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
                    <CustomSelect
                      label="Department"
                      name="department"
                      value={profileData.department}
                      fullWidth
                      margin="normal"
                      onChange={handleDepartmentInputChange}
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
                        { value: "Admin", label: "Admin" },
                        { value: "IT", label: "IT" },
                        { value: "Security", label: "Security" },
                        { value: "Transportation", label: "Transportation" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSelect
                      label="Sub Role"
                      name="subrole"
                      type="subrole"
                      value={profileData.subrole}
                      disabled={!isEditable}
                      onChange={handleRoleChange}
                      options={subRoleOptions}
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
                  <Grid item xs={12}>
                    {profileData.externalrole.map((external, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={12} sm={4.5}>
                          <CustomSelect
                            label="External Faculty"
                            name={`externalrole[${index}].externalfaculty`}
                            value={external.externalfaculty}
                            onChange={(event) => {
                              const updatedExternalRole = [
                                ...profileData.externalrole,
                              ];
                              updatedExternalRole[index].externalfaculty =
                                event.target.value;
                              setProfileData({
                                ...profileData,
                                externalrole: updatedExternalRole,
                              });
                            }}
                            fullWidth
                            options={[
                              {
                                value: "",
                                label: "",
                              },
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
                              { value: "Admin", label: "Admin" },
                              { value: "IT", label: "IT" },
                              { value: "Security", label: "Security" },
                              {
                                value: "Transportation",
                                label: "Transportation",
                              },
                            ]}
                            disabled={!isEditable}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomSelect
                            label="Role"
                            name={`externalrole[${index}].role`}
                            value={external.role}
                            onChange={(event) => {
                              const updatedExternalRole = [
                                ...profileData.externalrole,
                              ];
                              updatedExternalRole[index].role =
                                event.target.value;
                              setProfileData({
                                ...profileData,
                                externalrole: updatedExternalRole,
                              });
                            }}
                            fullWidth
                            options={[
                              {
                                value: "",
                                label: "",
                              },
                              { value: "advisor", label: "Advisor" },
                              { value: "dean", label: "Dean" },
                              { value: "instructor", label: "Instructor" },
                              { value: "Rector", label: "Rector" },
                              {
                                value: "Pro-Rector (A)",
                                label: "Pro-Rector (A)",
                              },
                              {
                                value: "Pro-Rector (A&F)",
                                label: "Pro-Rector (A&F)",
                              },
                              {
                                value: "Director Facilitation",
                                label: "Director Facilitation",
                              },
                              {
                                value: "Account Section",
                                label: "Account Section",
                              },
                              { value: "HR", label: "HR" },
                              { value: "IT Manager", label: "IT Manager" },
                              {
                                value: "Transportation Manager",
                                label: "Transportation Manager",
                              },
                              {
                                value: "Security Manager",
                                label: "Security Manager",
                              },
                              {
                                value: "Incharge of Guest House",
                                label: "Incharge of Guest House",
                              },
                              {
                                value: "Secretary of Faculty Club",
                                label: "Secretary of Faculty Club",
                              },
                            ]}
                            disabled={!isEditable}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <CustomSelect
                            label="Batch"
                            name={`externalrole[${index}].batch`}
                            value={external.batch || ""}
                            onChange={(event) => {
                              const updatedExternalRole = [
                                ...profileData.externalrole,
                              ];
                              updatedExternalRole[index].batch =
                                event.target.value;
                              setProfileData({
                                ...profileData,
                                externalrole: updatedExternalRole,
                              });
                            }}
                            fullWidth
                            options={[
                              {
                                value: "",
                                label: "",
                              },
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
                            disabled={!isEditable}
                          />
                        </Grid>
                        {isEditable && (
                          <Grid
                            item
                            xs={12}
                            sm={1.5}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                const updatedExternalRole = [
                                  ...profileData.externalrole,
                                ];
                                updatedExternalRole.splice(index, 1);
                                setProfileData({
                                  ...profileData,
                                  externalrole: updatedExternalRole,
                                });
                              }}
                            >
                              <DeleteIcon
                                fontSize="large"
                                sx={{ color: "red" }}
                              />
                            </IconButton>
                          </Grid>
                        )}
                      </Grid>
                    ))}
                    {isEditable && (
                      <Button
                        onClick={() => {
                          const updatedExternalRole = [
                            ...profileData.externalrole,
                            {
                              externalfaculty: "",
                              role: "",
                              batch: "",
                            },
                          ];
                          setProfileData({
                            ...profileData,
                            externalrole: updatedExternalRole,
                          });
                        }}
                        sx={{ mt: 2 }}
                      >
                        Add External Role
                      </Button>
                    )}
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

export default EditFacultyProfile;
