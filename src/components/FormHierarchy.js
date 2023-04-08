import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoggedInHeader from "../components/LoggedInHeader";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomSelect = ({ label, options, ...rest }) => (
  <TextField
    {...rest}
    select
    label={label}
    SelectProps={{
      native: true,
    }}
    variant="outlined"
  >
    <option value="">None</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </TextField>
);

const hierarchyOptions = [
  { value: "advisor", label: "Advisor" },
  { value: "dean", label: "Dean" },
  { value: "committee convener", label: "Committee Convener" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const FormHierarchy = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enteredRole = data.get("role");
  };

  const [fields, setFields] = useState([
    {
      label: "Hierarchy 1",
      name: "hierarchy1",
      options: hierarchyOptions,
    },
  ]);

  const [selectedOptions, setSelectedOptions] = useState(
    new Array(hierarchyOptions.length).fill("")
  );

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        label: `Hierarchy ${fields.length + 1}`,
        name: `hierarchy${fields.length + 1}`,
        options: hierarchyOptions,
      },
    ]);
    setSelectedOptions([...selectedOptions, ""]);
  };

  const handleOptionChange = (event, index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = event.target.value;
    setSelectedOptions(updatedOptions);
  };

  const availableOptions = (index) =>
    hierarchyOptions.filter(
      (option) =>
        !selectedOptions.includes(option.value) ||
        selectedOptions[index] === option.value
    );

  const handleDeleteField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);

    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
  };

  return (
    <ThemeProvider theme={theme}>
      <LoggedInHeader />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              padding: "2rem",
              borderRadius: "1rem",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography component="h1" variant="h5" align="center">
              {name} Form
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Typography variant="h6" align="center">
                Define Hierarchy
              </Typography>
              <Typography variant="body1" align="center">
                Form ID: {id}
              </Typography>
              <Divider sx={{ margin: "1rem 0" }} />
              {fields.map((field, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <CustomSelect
                    margin="normal"
                    required
                    fullWidth
                    id={field.name}
                    label={field.label}
                    name={field.name}
                    value={selectedOptions[index]}
                    options={availableOptions(index)}
                    onChange={(event) => handleOptionChange(event, index)}
                  />
                  <IconButton
                    aria-label="delete field"
                    onClick={() => handleDeleteField(index)}
                    sx={{ ml: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddField}
                disabled={fields.length >= hierarchyOptions.length}
                sx={{ mt: 3, mb: 2 }}
              >
                Add Field
              </Button>{" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormHierarchy;
