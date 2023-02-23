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
                  autoComplete="new-password"
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
