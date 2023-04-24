import React from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const FormPreview = ({ fields, formName }) => {
  const [inputValues, setInputValues] = useState({});
  const today = dayjs();
  const [dateValues, setDateValues] = useState({});
  const [timeValues, setTimeValues] = useState({});
  const handleTimePickerChange = (newValue, id) => {
    setTimeValues({ ...timeValues, [id]: newValue });
  };

  const [datePickerError, setDatePickerError] = useState({});

  const handleChange = (event, id) => {
    setInputValues({ ...inputValues, [id]: event.target.value });
  };

  const [selectedValue, setSelectedValue] = useState({});
  const handleSelectChange = (event, id) => {
    setSelectedValue({ ...selectedValue, [id]: event.target.value });
  };

  const [multiSelectedValues, setMultiSelectedValues] = useState({});
  const handleMultiSelectChange = (event, id) => {
    setMultiSelectedValues({
      ...multiSelectedValues,
      [id]: event.target.value,
    });
  };

  return (
    <div className="formPreview">
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          textTransform: "uppercase",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {formName || "Untitled Form"}
      </Typography>
      {fields.map((field) => {
        const handleDatePickerChange = (newValue, id) => {
          setDateValues({ ...dateValues, [id]: newValue });
          if (field.required && !newValue) {
            setDatePickerError({
              ...datePickerError,
              [id]: "Date is required",
            });
          } else if (
            !field.allowBeforeToday &&
            (!newValue || newValue.isBefore(dayjs().startOf("day")))
          ) {
            setDatePickerError({
              ...datePickerError,
              [id]: "Date cannot be before today",
            });
          } else {
            setDatePickerError({ ...datePickerError, [id]: null });
          }
        };

        switch (field.type) {
          case "inputField":
            return (
              <TextField
                key={field.id}
                type="text"
                name={field.name}
                label={field.placeholder || "Enter text"}
                variant="outlined"
                sx={{ marginBottom: 2 }}
                required={field.required}
                fullWidth
                error={field.required && !inputValues[field.id]}
                helperText={
                  field.required && !inputValues[field.id]
                    ? "This field is required"
                    : null
                }
                onChange={(event) => handleChange(event, field.id)}
              />
            );
          case "multiTextArea":
            return (
              <TextareaAutosize
                key={field.id}
                aria-label="minimum height"
                minRows={3}
                name={field.name}
                placeholder={field.placeholder || "Type here..."}
                required={field.required}
                style={{
                  width: "96.5%",
                  padding: "8px",
                  marginBottom: "16px",
                  resize: "vertical",
                  borderColor:
                    field.required && !inputValues[field.id]
                      ? "red"
                      : undefined,
                  borderWidth:
                    field.required && !inputValues[field.id]
                      ? "1.5px"
                      : undefined,
                  borderStyle:
                    field.required && !inputValues[field.id]
                      ? "solid"
                      : undefined,
                }}
                onChange={(event) => handleChange(event, field.id)}
              />
            );
          case "radioButton":
            return (
              <FormControl
                key={field.id}
                component="fieldset"
                sx={{ marginBottom: 2, display: "block" }}
              >
                <FormLabel component="legend">
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    {field.heading || "Radio Button Group"}
                  </Typography>
                </FormLabel>
                <RadioGroup
                  name={field.name}
                  defaultValue={field.options[0].value}
                >
                  {field.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            );
          case "checkboxGroup":
            return (
              <FormControl
                key={field.id}
                component="fieldset"
                sx={{ marginBottom: 2, display: "block" }}
              >
                <FormLabel component="legend">
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    {field.heading || "Checkbox Group"}
                  </Typography>
                </FormLabel>
                <FormGroup>
                  {field.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={option}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            );
          case "dropdownSelect":
            return (
              <FormControl
                key={field.id}
                sx={{ marginBottom: 2, display: "block" }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {field.heading || "Dropdown Select"}
                </Typography>
                <Select
                  labelId={field.id}
                  id={field.id}
                  value={selectedValue[field.id] || ""}
                  onChange={(event) => handleSelectChange(event, field.id)}
                  fullWidth
                >
                  {field.options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          case "dropdownMultiSelect":
            return (
              <FormControl
                key={field.id}
                sx={{ marginBottom: 2, display: "block" }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {field.heading || "Dropdown Multi-Select"}
                </Typography>
                <Select
                  labelId={field.id}
                  id={field.id}
                  multiple
                  value={multiSelectedValues[field.id] || []}
                  onChange={(event) => handleMultiSelectChange(event, field.id)}
                  fullWidth
                  renderValue={(selected) => selected.join(", ")}
                >
                  {field.options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      <Checkbox
                        checked={
                          (multiSelectedValues[field.id] || []).indexOf(
                            option
                          ) > -1
                        }
                      />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          case "datePicker":
            return (
              <FormControl
                key={field.id}
                sx={{ marginBottom: 2, display: "block" }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {field.heading || "Date Picker"}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <DatePicker
                      value={dateValues[field.id] || null}
                      onChange={(newValue) =>
                        handleDatePickerChange(newValue, field.id)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(datePickerError[field.id])}
                          helperText={datePickerError[field.id]}
                        />
                      )}
                      minDate={field.allowBeforeToday ? undefined : today}
                    />
                  </Box>
                </LocalizationProvider>
              </FormControl>
            );
          case "timePicker":
            return (
              <FormControl
                key={field.id}
                sx={{ marginBottom: 2, display: "block" }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {field.heading || "Time Picker"}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    ampm={field.clockFormat === "12h"}
                    value={timeValues[field.id] || null}
                    onChange={(newValue) =>
                      handleTimePickerChange(newValue, field.id)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required={field.required}
                        error={Boolean(field.required && !timeValues[field.id])}
                        helperText={
                          field.required && !timeValues[field.id]
                            ? "Time is required"
                            : ""
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default FormPreview;
