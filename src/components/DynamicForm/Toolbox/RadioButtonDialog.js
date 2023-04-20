// RadioButtonDialog.js
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const RadioButtonDialog = ({ open, onClose, onSave, editingField }) => {
  const [heading, setHeading] = useState("");
  const [options, setOptions] = useState(["Option 1"]);

  useEffect(() => {
    if (editingField) {
      setHeading(editingField.heading);
      setOptions(editingField.options);
    } else {
      setHeading("");
      setOptions(["Option 1"]);
    }
  }, [editingField]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleSave = () => {
    onSave({ heading, options });
    handleClose();
  };

  const handleOptionChange = (index, value) => {
    setOptions(options.map((option, idx) => (idx === index ? value : option)));
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Radio Button Group</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Heading"
          fullWidth
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        {options.map((option, index) => (
          <TextField
            key={index}
            margin="dense"
            label={`Option ${index + 1}`}
            fullWidth
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <Button onClick={addOption}>Add Option</Button>
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

export default RadioButtonDialog;
