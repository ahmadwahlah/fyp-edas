import * as React from "react";
import { useState } from "react";
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

export default function SignUp() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !phoneNumberError
    ) {
      console.log({
        email: data.get("email"),
        password: data.get("password"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phoneNumber: data.get("phoneNumber"),
        role: data.get("role"),
        department: data.get("department"),
        faculty: data.get("faculty"),
      });

      // Add code here to submit the form
    } else {
      alert("Please fix all errors before submitting the form");
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
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
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

    const phoneNumberRegex = /^\d{11}$/;
    const isValidPhoneNumber = phoneNumberRegex.test(phoneNumberValue);

    if (!isValidPhoneNumber) {
      setPhoneNumberError(true);
      setHelperTextPhone("Phone number must be 11 digits");
    } else {
      setPhoneNumberError(false);
      setHelperTextPhone("");
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
                  <CustomSelect
                    required
                    fullWidth
                    id="faculty"
                    label="Faculty"
                    name="faculty"
                    options={[
                      { value: "FME", label: "FME" },
                      { value: "FCSE", label: "FCSE" },
                      { value: "FES", label: "FES" },
                    ]}
                  />
                ) : (
                  <CustomSelect
                    required
                    fullWidth
                    id="department"
                    label="Department"
                    name="department"
                    options={[
                      { value: "FME", label: "FME" },
                      { value: "FCSE", label: "FCSE" },
                      { value: "FES", label: "FES" },
                      { value: "Procurement", label: "Procurement" },
                      { value: "Finance", label: "Finance" },
                    ]}
                  />
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate("/")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
