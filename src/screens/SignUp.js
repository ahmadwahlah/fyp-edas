import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Stack } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Header from "../components/Header";
import Footer from "../components/Footer";

const theme = createTheme();

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const [department, setDepartment] = useState("");
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
    setDepartment(event.target.value);
  };

  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("This is a success message!");
  const [severity, setSeverity] = useState("success");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstname = data.get("firstName");
    const lastname = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    const phoneNumber = data.get("phoneNumber");
    const role = data.get("role");
    const department = data.get("department");
    const faculty = data.get("faculty");
    const regnum = data.get("regNo");
    const batch = data.get("batchNo");
    const subrole = data.get("subrole");

    console.log("First Name: ", firstname);
    console.log("Last Name: ", lastname);
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("Phone Number: ", phoneNumber);
    console.log("Role: ", role);
    console.log("Department: ", department);
    console.log("Faculty: ", faculty);
    console.log("Registration Number: ", regnum);
    console.log("Batch Number: ", batch);
    console.log("Subrole: ", subrole);

    if (role === "student") {
      if (
        firstname &&
        lastname &&
        email &&
        password &&
        phoneNumber &&
        role &&
        faculty &&
        regnum &&
        batch
      ) {
        try {
          const response = await axios.post(
            "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/student",
            {
              firstname,
              lastname,
              email,
              password,
              phoneNumber,
              role,
              faculty,
              regnum,
              batch,
            }
          );

          console.log("Form submitted successfully");
          setMessage("Signup request sent successfully!");
          setSeverity("success");
          setOpen(true);
          const timer = setTimeout(() => {
            navigate("/");
          }, 2500);
        } catch (error) {
          console.error(
            "An error occurred while submitting the form",
            error,
            error.message
          );
          setMessage("An error occurred while submitting the form!");
          setSeverity("error");
          setOpen(true);
          // Add code here to handle error
        }
      } else {
        setMessage("Please fill all fields before submitting the form!");
        setSeverity("warning");
        setOpen(true);
      }
    } else if (role === "faculty") {
      if (
        firstname &&
        lastname &&
        email &&
        password &&
        phoneNumber &&
        role &&
        department &&
        subrole
      ) {
        try {
          const response = await axios.post(
            "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/faculty",
            {
              firstname,
              lastname,
              email,
              password,
              phoneNumber,
              role,
              department,
              subrole,
            }
          );

          console.log("Form submitted successfully");
          setMessage("Signup request sent successfully!");
          setSeverity("success");
          setOpen(true);
          const timer = setTimeout(() => {
            navigate("/");
          }, 2500);
        } catch (error) {
          console.error("An error occurred while submitting the form", error);
          setMessage("An error occurred while submitting the form!");
          setSeverity("error");
          setOpen(true);
          // Add code here to handle error
        }
      } else {
        setMessage("Please fill all fields before submitting the form!");
        setSeverity("warning");
        setOpen(true);
      }
    }
  };

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [helperTextFirst, setHelperTextFirst] = useState("");

  const handleFirstNameChange = (event) => {
    const firstNameValue = event.target.value;
    setFirstName(firstNameValue);

    if (!firstNameValue) {
      setFirstNameError(true);
      setHelperTextFirst("First Name is required");
    } else {
      setFirstNameError(false);
      setHelperTextFirst("");
    }
  };

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [helperTextLast, setHelperTextLast] = useState("");

  const handleLastNameChange = (event) => {
    const lastNameValue = event.target.value;
    setLastName(lastNameValue);

    if (!lastNameValue) {
      setLastNameError(true);
      setHelperTextLast("Last Name is required");
    } else {
      setLastNameError(false);
      setHelperTextLast("");
    }
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (!emailValue) {
      setEmailError(true);
      setHelperText("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setEmailError(true);
      setHelperText("Invalid email address");
    } else {
      setEmailError(false);
      setHelperText("");
    }
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [helperTextPass, setHelperTextPass] = useState("");

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValidPassword = passwordRegex.test(passwordValue);

    if (!isValidPassword) {
      setPasswordError(true);
      setHelperTextPass(
        "Password must be at least 8 characters long and contain both letters and numbers"
      );
    } else {
      setPasswordError(false);
      setHelperTextPass("");
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [helperTextPhone, setHelperTextPhone] = useState("");

  const handlePhoneNumberChange = (event) => {
    const phoneNumberValue = event.target.value;
    setPhoneNumber(phoneNumberValue);

    const phoneNumberRegex = /^03\d{9}$/;
    const isValidPhoneNumber = phoneNumberRegex.test(phoneNumberValue);

    if (!isValidPhoneNumber) {
      setPhoneNumberError(true);
      setHelperTextPhone("Phone number must be 11 digits");
    } else {
      setPhoneNumberError(false);
      setHelperTextPhone("");
    }
  };

  const [regNo, setRegNo] = useState("");
  const [regNoError, setRegNoError] = useState(false);
  const [helperTextReg, setHelperTextReg] = useState("");

  const handleRegNoChange = (event) => {
    const regNoValue = event.target.value;
    setRegNo(regNoValue);

    if (!regNoValue) {
      setRegNoError(true);
      setHelperTextReg("Registration No is required");
    } else {
      setRegNoError(false);
      setHelperTextReg("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomSelect
                  required
                  fullWidth
                  autoFocus
                  id="role"
                  label="Role"
                  onChange={handleRoleChange}
                  name="role"
                  options={[
                    { value: "faculty", label: "Faculty/Staff" },
                    { value: "student", label: "Student" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstNameError}
                  helperText={helperTextFirst}
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={lastNameError}
                  helperText={helperTextLast}
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                {role === "student" ? (
                  <>
                    <CustomSelect
                      required
                      fullWidth
                      id="faculty"
                      label="Faculty"
                      name="faculty"
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
                        { value: "Data Science", label: "Data Science" },
                        {
                          value: "Software Engineering",
                          label: "Software Engineering",
                        },
                        { value: "Cyber Security", label: "Cyber Security" },
                      ]}
                    />
                    <Box
                      sx={{
                        marginTop: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <CustomSelect
                            name="batchNo"
                            required
                            fullWidth
                            id="batchNo"
                            label="Batch No."
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
                              { value: "30", label: "30" },
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
                          <TextField
                            required
                            fullWidth
                            id="regNo"
                            label="Reg. No."
                            name="regNo"
                            error={regNoError}
                            helperText={helperTextReg}
                            value={regNo}
                            onChange={handleRegNoChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                ) : (
                  <Stack gap={2.5}>
                    <CustomSelect
                      required
                      fullWidth
                      id="department"
                      label="Department"
                      name="department"
                      onChange={handleDepartmentChange}
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
                        { value: "Data Science", label: "Data Science" },
                        {
                          value: "Software Engineering",
                          label: "Software Engineering",
                        },
                        { value: "Cyber Security", label: "Cyber Security" },
                        { value: "Admin", label: "Admin" },
                        { value: "IT", label: "IT" },
                        { value: "Security", label: "Security" },
                        { value: "Transportation", label: "Transportation" },
                      ]}
                    />
                    <CustomSelect
                      required
                      fullWidth
                      autoFocus
                      id="subrole"
                      label=" Sub Role"
                      onChange={handleRoleChange}
                      name="subrole"
                      options={subRoleOptions}
                    />
                  </Stack>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                  helperText={helperText}
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  id="phoneNumber"
                  autoComplete="tel"
                  error={phoneNumberError}
                  helperText={helperTextPhone}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={passwordError}
                  helperText={helperTextPass}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent="flex-end"
              sx={{ marginBottom: "1.5rem" }}
            >
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate("/")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Container>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}
