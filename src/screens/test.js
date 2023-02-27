import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker() {
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DatePicker
          label="From"
          value={fromDate}
          onChange={(newValue) => {
            setFromDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="To"
          value={toDate}
          onChange={(newValue) => {
            setToDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
