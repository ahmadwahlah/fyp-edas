import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  ListItemText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DynamicFormPreview = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        console.log(formId);
        const response = await axios.get(
          `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/dynamicforms/student/${formId}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setForm(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    fetchFormData();
  }, [formId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      logFormData();
      // Your submit logic here
    }
  };

  const logFormData = () => {
    const formData = {
      inputValues,
      radioSelectedValue,
      checkboxSelectedValues,
      selectedValue,
      multiSelectedValues,
      dateValues,
      timeValues,
      selectedFiles,
    };
    console.log("Form Data:", formData);
    console.log("Form Name:", form[0].formName);
    console.log("Approval Hierarchy:", form[0].approvalHierarchy);
  };

  const [inputValues, setInputValues] = useState({});
  const handleChange = (event, placeholder) => {
    setInputValues({ ...inputValues, [placeholder]: event.target.value });
  };

  const [radioSelectedValue, setRadioSelectedValue] = useState({});
  const [checkboxSelectedValues, setCheckboxSelectedValues] = useState({});
  const [selectedValue, setSelectedValue] = useState({});
  const handleSelectChange = (event, id, heading) => {
    setSelectedValue({
      ...selectedValue,
      [id]: {
        heading: heading || "Dropdown Select",
        value: event.target.value,
      },
    });
  };

  const [multiSelectedValues, setMultiSelectedValues] = useState({});
  const handleMultiSelectChange = (event, id, heading) => {
    setMultiSelectedValues({
      ...multiSelectedValues,
      [id]: {
        heading: heading || "Dropdown Multi-Select",
        values: event.target.value,
      },
    });
  };

  const today = dayjs();
  const [dateValues, setDateValues] = useState({});
  const [timeValues, setTimeValues] = useState({});
  const handleTimePickerChange = (newValue, id, heading) => {
    setTimeValues({
      ...timeValues,
      [id]: {
        heading: heading || "Time Picker",
        value: newValue,
      },
    });
  };
  const [datePickerError, setDatePickerError] = useState({});

  const [selectedFiles, setSelectedFiles] = useState({});
  const [inputRefs, setInputRefs] = useState({});
  const handleFileSelect = (event, id) => {
    const file = event.target.files[0];
    setSelectedFiles({ ...selectedFiles, [id]: file });
    // Update the fileName property of the field object
  };

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    fields.forEach((field) => {
      if (field.required) {
        if (field.type === "dropdownSelect" && !selectedValue[field.id]) {
          errors[field.id] = "This field is required.";
        } else if (
          field.type === "dropdownMultiSelect" &&
          (!multiSelectedValues[field.id] ||
            multiSelectedValues[field.id].length === 0)
        ) {
          errors[field.id] = "This field is required.";
        }
        if (field.type === "radioButton" && !radioSelectedValue[field.id]) {
          errors[field.id] = "This field is required.";
        } else if (
          field.type === "checkboxGroup" &&
          (!checkboxSelectedValues[field.id] ||
            checkboxSelectedValues[field.id].length === 0)
        ) {
          errors[field.id] = "This field is required.";
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  const { fields = [], formName } = form;

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
        {form[0].formName || "Untitled Form"}
      </Typography>
      {form[0].fields &&
        form[0].fields.map((field) => {
          const handleDatePickerChange = (newValue, id, heading) => {
            setDateValues({
              ...dateValues,
              [id]: {
                heading: heading || "Date Picker",
                value: newValue,
              },
            });
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
                  onChange={(event) => handleChange(event, field.placeholder)}
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
                  onChange={(event) => handleChange(event, field.placeholder)}
                />
              );
            case "radioButton":
              return (
                <FormControl
                  key={field.id}
                  component="fieldset"
                  sx={{ marginBottom: 2, display: "block" }}
                  error={!!formErrors[field.id]}
                >
                  <FormLabel component="legend">
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      {field.heading || "Radio Button Group"}
                      {field.required && "*"}
                    </Typography>
                  </FormLabel>
                  <RadioGroup
                    name={field.name}
                    defaultValue={field.options[0].value}
                    onChange={(event) =>
                      setRadioSelectedValue({
                        ...radioSelectedValue,
                        [field.heading]: event.target.value,
                      })
                    }
                  >
                    {field.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio required={field.required} />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText>{formErrors[field.id]}</FormHelperText>
                </FormControl>
              );
            case "checkboxGroup":
              return (
                <FormControl
                  key={field.id}
                  component="fieldset"
                  sx={{ marginBottom: 2, display: "block" }}
                  error={!!formErrors[field.id]}
                >
                  <FormLabel component="legend">
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      {field.heading || "Checkbox Group"}
                      {field.required && "*"}
                    </Typography>
                  </FormLabel>
                  <FormGroup>
                    {field.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            required={field.required}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setCheckboxSelectedValues({
                                  ...checkboxSelectedValues,
                                  [field.id]: {
                                    heading: field.heading || "Checkbox Group",
                                    values: [
                                      ...(checkboxSelectedValues[field.id]
                                        ?.values || []),
                                      option,
                                    ],
                                  },
                                });
                              } else {
                                setCheckboxSelectedValues({
                                  ...checkboxSelectedValues,
                                  [field.id]: {
                                    heading: field.heading || "Checkbox Group",
                                    values: (
                                      checkboxSelectedValues[field.id]
                                        ?.values || []
                                    ).filter(
                                      (selectedOption) =>
                                        selectedOption !== option
                                    ),
                                  },
                                });
                              }
                            }}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>{formErrors[field.id]}</FormHelperText>
                </FormControl>
              );

            case "dropdownSelect":
              return (
                <FormControl
                  key={field.id}
                  sx={{ marginBottom: 2, display: "block" }}
                  error={!!formErrors[field.id]}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {field.heading || "Dropdown Select"}
                    {field.required && "*"}
                  </Typography>
                  <Select
                    labelId={field.id}
                    id={field.id}
                    value={selectedValue[field.id]?.value || ""}
                    onChange={(event) =>
                      handleSelectChange(event, field.id, field.heading)
                    }
                    fullWidth
                    required={field.required}
                  >
                    <FormHelperText>{formErrors[field.id]}</FormHelperText>

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
                  error={!!formErrors[field.id]}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {field.heading || "Dropdown Multi-Select"}
                    {field.required && "*"}
                  </Typography>
                  <Select
                    labelId={field.id}
                    id={field.id}
                    multiple
                    value={multiSelectedValues[field.id]?.values || []}
                    onChange={(event) =>
                      handleMultiSelectChange(event, field.id, field.heading)
                    }
                    fullWidth
                    renderValue={(selected) => selected.join(", ")}
                    required={field.required}
                  >
                    <FormHelperText>{formErrors[field.id]}</FormHelperText>

                    {field.options.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        <Checkbox
                          checked={
                            (
                              multiSelectedValues[field.id]?.values || []
                            ).indexOf(option) > -1
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
                        value={dateValues[field.id]?.value || null}
                        onChange={(newValue) =>
                          handleDatePickerChange(
                            newValue,
                            field.id,
                            field.heading
                          )
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
                      value={timeValues[field.id]?.value || null}
                      onChange={(newValue) =>
                        handleTimePickerChange(
                          newValue,
                          field.id,
                          field.heading
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required={field.required}
                          error={Boolean(
                            field.required && !timeValues[field.id]
                          )}
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
            case "fileUpload":
              return (
                <div key={field.id} style={{ marginBottom: "16px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    {field.heading || "File Upload"}
                    {field.required && "*"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => inputRefs[field.id].current.click()}
                  >
                    Upload
                  </Button>
                  <input
                    type="file"
                    id={field.id}
                    name={field.name}
                    required={field.required}
                    hidden
                    accept=".pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                    ref={inputRefs[field.id]}
                    onChange={(event) => handleFileSelect(event, field.id)}
                  />
                  {selectedFiles[field.id] && (
                    <p style={{ marginTop: "8px" }}>
                      Selected file:{" "}
                      <strong>{selectedFiles[field.id].name}</strong>
                    </p>
                  )}
                </div>
              );
            default:
              return null;
          }
        })}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default DynamicFormPreview;
