import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const MultiTextAreaDialog = ({
  open,
  onClose,
  onSave,
  name,
  placeholder,
  required,
}) => {
  const [inputName, setInputName] = useState(name || "");
  const [inputPlaceholder, setInputPlaceholder] = useState(placeholder || "");
  const [isRequired, setIsRequired] = useState(required || false);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave({
      name: inputName,
      placeholder: inputPlaceholder,
      required: isRequired,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Multi-Text Area Settings</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Field Name"
          type="text"
          fullWidth
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Placeholder"
          type="text"
          fullWidth
          value={inputPlaceholder}
          onChange={(e) => setInputPlaceholder(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
          }
          label="Required"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MultiTextAreaDialog;
