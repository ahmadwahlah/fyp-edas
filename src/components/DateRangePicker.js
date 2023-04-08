import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const DateRangePicker = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  minDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        <DatePicker
          label="From"
          value={fromDate}
          onChange={setFromDate}
          renderInput={(params) => <TextField {...params} required />}
          minDate={minDate}
          maxDate={toDate || undefined} // Set the maxDate to toDate or undefined if toDate is not set
        />
        <DatePicker
          label="To"
          value={toDate}
          onChange={setToDate}
          renderInput={(params) => <TextField {...params} required />}
          minDate={minDate}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
