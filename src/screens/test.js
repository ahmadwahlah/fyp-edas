import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const TimePickerField = ({ id, heading, onRemove, onEdit, fieldData }) => {
  const [time, setTime] = useState(null);

  return (
    <div>
      <div
        className="timePickerField"
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
            {heading || "Time Picker"}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={time}
              onChange={setTime}
              renderInput={(params) => <TextField {...params} />}
            />
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
    </div>
  );
};

export default TimePickerField;
