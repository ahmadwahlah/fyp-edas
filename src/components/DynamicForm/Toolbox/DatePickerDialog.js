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
} from "@mui/material";

const DatePickerDialog = ({ open, onClose, onSave, editingField }) => {
  const [heading, setHeading] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [allowBeforeToday, setAllowBeforeToday] = useState(false);

  useEffect(() => {
    if (editingField) {
      setHeading(editingField.heading);
      setIsRequired(editingField.required);
      setAllowBeforeToday(editingField.allowBeforeToday);
    } else {
      setHeading("");
      setIsRequired(false);
      setAllowBeforeToday(false);
    }
  }, [editingField]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleSave = () => {
    onSave({ heading, required: isRequired, allowBeforeToday });
    handleClose();
  };

  return (
    <Dialog open={Boolean(open)} onClose={handleClose}>
      <DialogTitle>Add Date Picker</DialogTitle>
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
        <FormControlLabel
          control={
            <Checkbox
              checked={allowBeforeToday}
              onChange={() => setAllowBeforeToday(!allowBeforeToday)}
            />
          }
          label="Allow date before today"
        />
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

export default DatePickerDialog;
