import React, { useState, useEffect } from "react";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

const DatePickerField = ({
  id,
  heading,
  onRemove,
  onEdit,
  fieldData,
  required,
  allowBeforeToday,
}) => {
  const [date, setDate] = useState(null);
  const today = dayjs();
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset the error when the required or allowBeforeToday props are changed
    setError(null);
  }, [required, allowBeforeToday]);

  const handleDateChange = (newValue) => {
    setDate(newValue);

    if (required && !newValue) {
      setError("Date is required");
    } else if (
      !allowBeforeToday &&
      (!newValue || newValue.isBefore(dayjs().startOf("day")))
    ) {
      setError("Date cannot be before today");
    } else {
      setError(null);
    }
  };

  return (
    <div>
      <div
        className="datePickerField"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            textAlign: "left",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {heading || "Date Picker"}
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
                value={date}
                onChange={handleDateChange}
                disabled
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required={required}
                    error={Boolean(error)}
                    helperText={error}
                    disabled
                  />
                )}
                minDate={allowBeforeToday ? undefined : today}
              />
            </Box>
          </LocalizationProvider>
        </div>
        <IconButton
          onClick={() => onEdit(fieldData)}
          color="primary"
          sx={{ marginRight: 1, marginTop: 4, marginLeft: 1 }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ marginTop: 4 }}
          onClick={() => onRemove(id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <Divider />
    </div>
  );
};

export default DatePickerField;
