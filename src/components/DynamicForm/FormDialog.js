import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  TextField,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

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
    <option value="" disabled></option>
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
];

const FormDialog = ({ open, onClose, onSave }) => {
  const navigate = useNavigate();
  const [facultyVisibility, setFacultyVisibility] = useState(false);
  const [studentVisibility, setStudentVisibility] = useState(false);
  const [undertakingValues, setUndertakingValues] = useState([""]);
  const [fields, setFields] = useState([
    {
      label: "Hierarchy 1",
      name: "hierarchy1",
      options: hierarchyOptions,
    },
  ]);

  const [selectedOptions, setSelectedOptions] = useState([""]);

  const handleSubmit = () => {
    if (selectedOptions.every((option) => option !== "" && option !== null)) {
      onSave({
        facultyVisibility,
        studentVisibility,
        approvalHierarchy: selectedOptions.filter((option) => option !== ""),
        undertaking: undertakingValues.filter((value) => value !== ""),
      });
      onClose();
    } else {
      // Display an error message or handle the case when not all options are selected
      console.log("Error");
    }
  };

  // ... (other functions from FormHierarchy)
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
    if (fields.length <= 1) {
      return;
    }

    const updatedFields = fields
      .filter((_, i) => i !== index)
      .map((field, newIndex) => ({
        ...field,
        label: `Hierarchy ${newIndex + 1}`,
        name: `hierarchy${newIndex + 1}`,
      }));

    setFields(updatedFields);

    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
  };

  // New state variable for undertaking fields
  const [undertakingFields, setUndertakingFields] = useState([
    {
      label: "Undertaking 1",
      name: "undertaking1",
    },
  ]);

  // New function to add undertaking fields
  const handleAddUndertakingField = () => {
    setUndertakingFields([
      ...undertakingFields,
      {
        label: `Undertaking ${undertakingFields.length + 1}`,
        name: `undertaking${undertakingFields.length + 1}`,
      },
    ]);
  };

  // New function to delete undertaking fields
  const handleDeleteUndertakingField = (index) => {
    if (undertakingFields.length <= 1) {
      return;
    }

    const updatedFields = undertakingFields
      .filter((_, i) => i !== index)
      .map((field, newIndex) => ({
        ...field,
        label: `Undertaking ${newIndex + 1}`,
        name: `undertaking${newIndex + 1}`,
      }));

    setUndertakingFields(updatedFields);
  };
  const handleUndertakingChange = (event, index) => {
    const updatedValues = [...undertakingValues];
    updatedValues[index] = event.target.value;
    setUndertakingValues(updatedValues);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6">Form Visibility</Typography>
          <Typography variant="body2" align="left" sx={{ mb: 1 }}>
            Set form access for specific user groups:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={facultyVisibility}
                onChange={(e) => setFacultyVisibility(e.target.checked)}
              />
            }
            label="Faculty"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={studentVisibility}
                onChange={(e) => setStudentVisibility(e.target.checked)}
              />
            }
            label="Students"
          />
        </Box>
        <Divider sx={{ marginTop: "1rem" }} />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Define Hierarchy</Typography>
          <Typography variant="body2" align="left" sx={{ mb: 1 }}>
            Hierarchy 1 is the lowest level, with increasing authority in
            subsequent levels.
          </Typography>

          {fields.map((field, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
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
                sx={{
                  ml: 2,
                  color: fields.length > 1 ? "error.main" : "action.disabled",
                }}
                disabled={fields.length <= 1}
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
            sx={{ mt: 2, mb: 2 }}
          >
            Add Hierarchy Field
          </Button>
        </Box>
        <Divider sx={{ marginTop: "1rem" }} />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Add Undertaking</Typography>{" "}
          {undertakingFields.map((field, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id={field.name}
                label={field.label}
                name={field.name}
                variant="outlined"
                value={undertakingValues[index]}
                onChange={(event) => handleUndertakingChange(event, index)}
              />
              <IconButton
                aria-label="delete field"
                onClick={() => handleDeleteUndertakingField(index)}
                sx={{
                  ml: 2,
                  color:
                    undertakingFields.length > 1
                      ? "error.main"
                      : "action.disabled",
                }}
                disabled={undertakingFields.length <= 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddUndertakingField}
            sx={{ mt: 2, mb: 2 }}
          >
            Add Undertaking Field
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
