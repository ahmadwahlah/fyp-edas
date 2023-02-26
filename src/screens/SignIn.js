import React, { useState } from "react";
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

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const validCredentials = [
    { email: "ahmad@gmail.com", password: "password", role: "admin" },
    { email: "abdullah@gmail.com", password: "password", role: "faculty" },
    { email: "hamza@gmail.com", password: "password", role: "student" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enteredEmail = data.get("email");
    const enteredPassword = data.get("password");

    // Check if entered credentials match any of the valid credentials
    const matchedCredential = validCredentials.find(
      (credential) =>
        credential.email === enteredEmail &&
        credential.password === enteredPassword &&
        credential.role === data.get("role")
    );
    if (!matchedCredential) {
      alert("Invalid email or password");
      return;
    }

    console.log({
      email: matchedCredential.email,
      password: matchedCredential.password,
      role: matchedCredential.role,
    });

    // handle sign-in action based on the selected role
    switch (matchedCredential.role) {
      case "admin":
        navigate("/adminhome");
        break;
      case "faculty":
        navigate("/facultyhome");
        break;
      case "student":
        navigate("/studenthome");
        break;
      default:
        navigate("/");
        break;
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

    if (!passwordValue) {
      setPasswordError(true);
      setHelperTextPass("Password is required");
    } else {
      setPasswordError(false);
      setHelperTextPass("");
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CustomSelect
              margin="normal"
              required
              fullWidth
              id="role"
              label="Sign in as"
              name="role"
              autoFocus
              options={[
                { value: "admin", label: "Administrator" },
                { value: "faculty", label: "Faculty/Staff" },
                { value: "student", label: "Student" },
              ]}
            />
            <TextField
              margin="normal"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={helperTextPass}
              value={password}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate("/signup")}
                >
                  {"Don't have an account? Sign Up"}
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
