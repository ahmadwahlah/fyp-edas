import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const TimePickerDialog = ({ open, onClose, onSave, editingField }) => {
  const [heading, setHeading] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [clockFormat, setClockFormat] = useState("12h");

  useEffect(() => {
    if (editingField) {
      setHeading(editingField.heading);
      setIsRequired(editingField.required);
      setClockFormat(editingField.clockFormat);
    } else {
      setHeading("");
      setIsRequired(false);
      setClockFormat("12h");
    }
  }, [editingField]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleSave = () => {
    onSave({ heading, required: isRequired, clockFormat });
    handleClose();
  };

  return (
    <Dialog open={Boolean(open)} onClose={handleClose}>
      <DialogTitle>Add Time Picker</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Heading"
          fullWidth
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isRequired}
              onChange={() => setIsRequired(!isRequired)}
            />
          }
          label="Required"
        />
        <RadioGroup
          row
          value={clockFormat}
          onChange={(e) => setClockFormat(e.target.value)}
        >
          <FormControlLabel
            value="12h"
            control={<Radio />}
            label="12-hour clock"
          />
          <FormControlLabel
            value="24h"
            control={<Radio />}
            label="24-hour clock"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimePickerDialog;
