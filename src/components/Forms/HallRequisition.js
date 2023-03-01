import * as React from "react";
import { useState } from "react";
import styled from "@mui/material/styles/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import LoggedInHeader from "../LoggedInHeader";
import CssBaseline from "@mui/material/CssBaseline";
import FileUploadButton from "../FileUploadButton";
import { useNavigate } from "react-router";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
//Date Picker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(2),
  minWidth: "100%",
}));
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const HallRequisitionForm = () => {
  const navigate = useNavigate();
  // Date Picker
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [numDays, setNumDays] = React.useState(null);

  React.useEffect(() => {
    if (fromDate && toDate) {
      const diffTime = Math.abs(toDate - fromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumDays(diffDays);
    }
  }, [fromDate, toDate]);

  const today = dayjs();
  //

  const [formData, setFormData] = useState({
    leaveRequiredFrom: "",
    leaveRequiredTill: "",
    numOfDays: "",
    reason: "",
    addressDuringLeave: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // check if all fields are filled
    const isFormValid = Object.values(formData).every((value) => value !== "");
    console.log("formData:", formData);
    console.log("isFormValid:", isFormValid);
    if (isFormValid) {
      console.log(formData); // log form data
      navigate.push("/studenthome");
      // TODO: submit form data to backend or reset form
    } else {
      //alert("Please fill all fields");
      navigate("/studenthome");
    }
  };

  return (
    <Box sx={{ marginTop: "5rem" }}>
      <LoggedInHeader />
      <CssBaseline />
      <StyledContainer maxWidth="sm">
        <StyledPaper sx={{ backgroundColor: "#f5f5f5" }}>
          <Typography
            variant="h6"
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              color: "black",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Hall Requisition Form
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginTop: "1.5rem" }}></Box>
            <Stack spacing={3} sx={{ marginTop: "1.2rem" }}>
              <CustomSelect
                required
                fullWidth
                id="society"
                label="Society"
                name="society"
                options={[
                  { value: "pt", label: "Project Topi" },
                  { value: "naqsh", label: "Naqsh" },
                  { value: "netronix", label: "Netronix" },
                  { value: "acm", label: "ACM" },
                  { value: "ieee", label: "IEEE" },
                ]}
              />
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
              <TextField
                required
                fullWidth
                id="lectureHall"
                label="Lecture Hall"
                name="lectureHall"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2.5rem",
                  }}
                >
                  <DateTimePicker
                    label="Key collection date and time"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DateTimePicker
                    label="Key return date and time"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
                {numDays && (
                  <Typography
                    variant="body1"
                    sx={{
                      marginTop: ".5rem",
                      marginLeft: ".5rem",
                      fontWeight: "bold",
                    }}
                  >
                    Number of days: {numDays}
                  </Typography>
                )}
              </LocalizationProvider>

              <TextField
                label="Reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                multiline
                rows={4}
              />
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: ".5rem",
              }}
            >
              <FileUploadButton />
              <StyledButton type="submit" variant="contained" color="primary">
                Submit
              </StyledButton>
            </Box>
          </form>
        </StyledPaper>
      </StyledContainer>
    </Box>
  );
};

export default HallRequisitionForm;
