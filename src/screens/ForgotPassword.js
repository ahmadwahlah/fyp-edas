import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import Header from "../components/Header";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
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

  return (
    <Box>
      <Header />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {submitted ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPasswordPage;
