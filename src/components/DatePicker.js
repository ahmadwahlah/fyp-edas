import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

export default function BasicDatePicker() {
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, margin: ".5rem" }}
      >
        <DatePicker
          label="From"
          value={fromDate}
          onChange={(newValue) => {
            setFromDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          minDate={today}
        />
        <DatePicker
          label="To"
          value={toDate}
          onChange={(newValue) => {
            setToDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          minDate={today}
        />
      </Box>
      {numDays && (
        <Typography variant="body1" sx={{ margin: ".5rem" }}>
          Number of days: {numDays}
        </Typography>
      )}
    </LocalizationProvider>
  );
}
