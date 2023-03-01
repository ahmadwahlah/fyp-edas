import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoggedInHeader from "../components/LoggedInHeader";
import { useSearchParams } from "react-router-dom";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function FormHierarchy() {
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
      options: [
        { value: "advisor", label: "Advisor" },
        { value: "dean", label: "Dean" },
        { value: "committee convener", label: "Committee Convener" },
      ],
    },
  ]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        label: `Hierarchy ${fields.length + 1}`,
        name: `hierarchy${fields.length + 1}`,
        options: [
          { value: "advisor", label: "Advisor" },
          { value: "dean", label: "Dean" },
          { value: "committee convener", label: "Committee Convener" },
        ],
      },
    ]);
  };

  const handleDeleteField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <ThemeProvider theme={theme}>
      <LoggedInHeader />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid black",
            padding: "1.5rem",
            borderRadius: "1rem",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography component="h1" variant="h5">
            {name} Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography variant="h6">Define Hierarchy</Typography>
            <Typography variant="body1">Form ID: {id}</Typography>
            <Divider sx={{ margin: "1rem" }} />
            {fields.map((field, index) => (
              <React.Fragment key={index}>
                <CustomSelect
                  margin="normal"
                  required
                  fullWidth
                  id={field.name}
                  label={field.label}
                  name={field.name}
                  options={field.options}
                />
                <IconButton
                  aria-label="delete field"
                  onClick={() => handleDeleteField(index)}
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </React.Fragment>
            ))}

            <Button
              fullWidth
              variant="contained"
              onClick={handleAddField}
              sx={{ mt: 3, mb: 2 }}
            >
              Add Field
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
