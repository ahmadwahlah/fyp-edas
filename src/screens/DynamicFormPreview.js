import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import styled from "@mui/material/styles/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router";
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
import { Divider } from "@mui/material";

import LoggedInHeader from "../components/LoggedInHeader";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[3],
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[5],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const DynamicFormPreview = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const token = localStorage.getItem("token");

        try {
          const decodedPayload = jwt_decode(token);
          console.log("Decoded Payload:", decodedPayload);
        } catch (error) {
          console.error("Error decoding token:", error);
        }

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

  const validateForm = () => {
    let valid = true;
    let errors = {};

    form[0].fields.forEach((field) => {
      if (field.required) {
        let fieldError = false;
        switch (field.type) {
          case "inputField":
          case "multiTextArea":
            if (!inputValues[field.id]?.value) {
              fieldError = true;
            }
            break;
          case "radioButton":
            if (!radioSelectedValue[field.id]?.value) {
              fieldError = true;
            }
            break;
          case "checkboxGroup":
            if (
              !checkboxSelectedValues[field.id]?.values ||
              !checkboxSelectedValues[field.id]?.values.length
            ) {
              fieldError = true;
            }
            break;
          case "dropdownSelect":
            if (!selectedValue[field.id]?.value) {
              fieldError = true;
            }
            break;
          case "dropdownMultiSelect":
            if (
              !multiSelectedValues[field.id]?.values ||
              !multiSelectedValues[field.id]?.values.length
            ) {
              fieldError = true;
            }
            break;
          case "datePicker":
            if (!dateValues[field.id]?.value) {
              fieldError = true;
            }
            break;
          case "timePicker":
            if (!timeValues[field.id]?.value) {
              fieldError = true;
            }
            break;
          case "fileUpload":
            if (!selectedFiles[field.id]) {
              fieldError = true;
            }
            break;
          default:
            break;
        }
        if (fieldError) {
          errors[field.id] = "This field is required";
          valid = false;
        }
      }
    });

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      logFormData();
      postFormData();
      navigate("/studenthome");
    } else {
      alert("Please fill all required fields");
    }
  };

  const logFormData = () => {
    const token = localStorage.getItem("token");
    const decodedPayload = jwt_decode(token);
    const id = decodedPayload.student || decodedPayload.faculty.id;
    const responces = {
      inputValues,
      radioSelectedValue,
      checkboxSelectedValues,
      selectedValue,
      multiSelectedValues,
      dateValues,
      timeValues,
      selectedFiles,
    };

    console.log(responces);
    console.log(form[0].formName);
    console.log(form[0].approvalHierarchy);
    console.log(id);
  };
  const postFormData = async () => {
    const token = localStorage.getItem("token");
    const decodedPayload = jwt_decode(token);
    const id = decodedPayload.student || decodedPayload.faculty.id;
    const responces = {
      inputValues,
      radioSelectedValue,
      checkboxSelectedValues,
      selectedValue,
      multiSelectedValues,
      dateValues,
      timeValues,
      selectedFiles,
    };

    const payload = {
      responces,
      formName: form[0].formName,
      approvalHierarchy: form[0].approvalHierarchy,
      id,
    };

    try {
      const response = await axios.post(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/forms/",
        payload,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error, error.response.data);
    }
  };

  const [inputValues, setInputValues] = useState({});
  const handleChange = (event, id, heading) => {
    setInputValues({
      ...inputValues,
      [id]: {
        heading: heading,
        value: event.target.value,
      },
    });
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

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ marginTop: "7rem" }}>
      <LoggedInHeader />
      <CssBaseline />
      <StyledContainer maxWidth="md">
        <StyledPaper sx={{ backgroundColor: "#f5f5f5" }}>
          <div className="formPreview">
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                color: "black",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {form[0].formName || "Untitled Form"}
            </Typography>
            <Divider />
            <Box sx={{ marginTop: "1.5rem" }}>
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
                          error={
                            field.required &&
                            (!inputValues[field.id] ||
                              !inputValues[field.id].value)
                          }
                          helperText={
                            field.required &&
                            (!inputValues[field.id] ||
                              !inputValues[field.id].value)
                              ? "This field is required"
                              : null
                          }
                          onChange={(event) =>
                            handleChange(event, field.id, field.heading)
                          }
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
                            width: "100%",
                            padding: "8px",
                            marginBottom: "16px",
                            resize: "vertical",
                            borderColor:
                              field.required &&
                              (!inputValues[field.id] ||
                                !inputValues[field.id].value)
                                ? "red"
                                : undefined,
                            borderWidth:
                              field.required &&
                              (!inputValues[field.id] ||
                                !inputValues[field.id].value)
                                ? "1.5px"
                                : undefined,
                            borderStyle:
                              field.required &&
                              (!inputValues[field.id] ||
                                !inputValues[field.id].value)
                                ? "solid"
                                : undefined,
                          }}
                          onChange={(event) =>
                            handleChange(event, field.id, field.heading)
                          }
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
                                [field.id]: {
                                  heading: field.heading,
                                  value: event.target.value,
                                },
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
                          <FormHelperText>
                            {formErrors[field.id]}
                          </FormHelperText>
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
                                            heading:
                                              field.heading || "Checkbox Group",
                                            values: [
                                              ...(checkboxSelectedValues[
                                                field.id
                                              ]?.values || []),
                                              option,
                                            ],
                                          },
                                        });
                                      } else {
                                        setCheckboxSelectedValues({
                                          ...checkboxSelectedValues,
                                          [field.id]: {
                                            heading:
                                              field.heading || "Checkbox Group",
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
                          <FormHelperText>
                            {formErrors[field.id]}
                          </FormHelperText>
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
                            <FormHelperText>
                              {formErrors[field.id]}
                            </FormHelperText>

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
                              handleMultiSelectChange(
                                event,
                                field.id,
                                field.heading
                              )
                            }
                            fullWidth
                            renderValue={(selected) => selected.join(", ")}
                            required={field.required}
                          >
                            <FormHelperText>
                              {formErrors[field.id]}
                            </FormHelperText>

                            {field.options.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                <Checkbox
                                  checked={
                                    (
                                      multiSelectedValues[field.id]?.values ||
                                      []
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
                            {field.required && "*"}
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
                                minDate={
                                  field.allowBeforeToday ? undefined : today
                                }
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
                            {field.required && "*"}
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
                            fullWidth
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
                            onChange={(event) =>
                              handleFileSelect(event, field.id)
                            }
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: ".5rem",
                }}
              >
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </StyledButton>
              </Box>
            </Box>
          </div>
        </StyledPaper>
      </StyledContainer>
    </Box>
  );
};

export default DynamicFormPreview;
