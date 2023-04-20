import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const InputFieldDialog = ({ open, onClose, onSave, editingField }) => {
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [required, setRequired] = useState(false);

  useEffect(() => {
    if (editingField) {
      setName(editingField.name);
      setPlaceholder(editingField.placeholder);
      setRequired(editingField.required);
    } else {
      setName("");
      setPlaceholder("");
      setRequired(false);
    }
  }, [editingField]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleSave = () => {
    onSave({ name, placeholder, required });
    handleClose();
  };

  return (
    <Dialog open={Boolean(open)} onClose={handleClose}>
      <DialogTitle>Add Text Input</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Placeholder"
          fullWidth
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
            />
          }
          label="Required"
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

export default InputFieldDialog;
