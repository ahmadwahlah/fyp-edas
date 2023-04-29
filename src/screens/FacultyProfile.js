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

const FacultyProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    subrole: "Lecturer",
    role: "Faculty",
    firstName: "John",
    lastName: "Doe",
    department: "Computer Science",
    email: "johndoe@example.com",
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

  const handleRoleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex" }}>
      <LoggedInHeader />
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
                      label="Department"
                      name="department"
                      value={profileData.department}
                      fullWidth
                      margin="normal"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSelect
                      label="Sub Role"
                      name="subrole"
                      type="subrole"
                      onChange={handleRoleChange}
                      value={profileData.subrole}
                      options={[
                        { value: "Professor", label: "Professor" },
                        {
                          value: "Associate Professor",
                          label: "Associate Professor",
                        },
                        {
                          value: "Assistant Professor",
                          label: "Assistant Professor",
                        },
                        { value: "Lecturer", label: "Lecturer" },
                        { value: "Lab Instructor", label: "Lab Instructor" },
                      ]}
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
                  <Grid item xs={12}>
                    {profileData.externalrole.map((external, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={12} sm={4}>
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
                              { value: "FAI", label: "FAI" },
                              { value: "FCS", label: "FCS" },
                              { value: "FCE", label: "FCE" },
                              { value: "FDS", label: "FDS" },
                            ]}
                            disabled
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
                              { value: "Advisor", label: "Advisor" },
                              { value: "Dean", label: "Dean" },
                              { value: "Instructor", label: "Instructor" },
                            ]}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomSelect
                            label="Batch"
                            name={`externalrole[${index}].batch`}
                            value={external.batch}
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
                              { value: "28", label: "28" },
                              { value: "29", label: "29" },
                              { value: "30", label: "30" },
                              { value: "31", label: "31" },
                              { value: "32", label: "32" },
                            ]}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    ))}
                    {/* {isEditable && (
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
                    )} */}
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

export default FacultyProfile;