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
import axios from "axios";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enteredRole = data.get("role");
    const enteredEmail = data.get("email");
    const enteredPassword = data.get("password");

    // handle sign-in action based on the selected role
    switch (enteredRole) {
      case "admin":
        try {
          //const token = localStorage.getItem("token");

          const response = await axios.post(
            "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/auth/admin",
            {
              email: enteredEmail,
              password: enteredPassword,
            },
            {
              headers: {
                "Content-Type": "application/json",
                //  "x-auth-token": token,
              },
            }
          );
          console.log(response);
          if (response.status === 200) {
            const token = response.data.token;
            console.log(token);
            localStorage.setItem("token", token);
            navigate("/adminhome");
          } else {
            console.error("An error occurred. Please try again later.");
          }
        } catch (error) {
          console.error(error);
          if (error.response && error.response.status === 400) {
            console.error("Incorrect email or password. Please try again.");
            window.alert("Incorrect email or password. Please try again.");
          } else {
            console.error("An error occurred. Please try again later.");
          }
        }
        break;

      case "faculty":
        try {
          const response = await axios.post(
            "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/auth/faculty",
            {
              email: enteredEmail,
              password: enteredPassword,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          if (response.status === 200) {
            const token = response.data.token;
            console.log(token);
            localStorage.setItem("token", token);
            navigate("/facultyhome");
          } else {
            console.error("An error occurred. Please try again later.");
          }
        } catch (error) {
          console.error(error);
          if (error.response && error.response.status === 400) {
            console.error("Incorrect email or password. Please try again.");
            window.alert("Incorrect email or password. Please try again.");
          } else if (error.response && error.response.status === 401) {
            console.error(
              "Attention: Your request is currently pending approval. Please be patient as we review and process your submission. Thank you for your understanding!"
            );
            window.alert(
              "Attention: Your request is currently pending approval. Please be patient as we review and process your submission.\nThank you for your understanding!"
            );
          } else {
            console.error("An error occurred. Please try again later.");
          }
        }
        break;

      case "student":
        try {
          const response = await axios.post(
            "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/auth/student",
            {
              email: enteredEmail,
              password: enteredPassword,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          if (response.status === 200) {
            const token = response.data.token;
            console.log(token);
            localStorage.setItem("token", token);
            navigate("/studenthome");
          } else {
            console.error("An error occurred. Please try again later.");
          }
        } catch (error) {
          console.error(error);
          if (error.response && error.response.status === 400) {
            console.error("Incorrect email or password. Please try again.");
            window.alert("Incorrect email or password. Please try again.");
          } else if (error.response && error.response.status === 401) {
            console.error(
              "Attention: Your request is currently pending approval. Please be patient as we review and process your submission. Thank you for your understanding!"
            );
            window.alert(
              "Attention: Your request is currently pending approval. Please be patient as we review and process your submission.\nThank you for your understanding!"
            );
          } else {
            console.error("An error occurred. Please try again later.");
          }
        }
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
