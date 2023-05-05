import React, { useEffect, useState } from "react";
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
  editingField,
}) => {
  const [inputName, setInputName] = useState(name || "");
  const [inputPlaceholder, setInputPlaceholder] = useState(placeholder || "");
  const [isRequired, setIsRequired] = useState(required || false);

  useEffect(() => {
    if (editingField) {
      setInputName(editingField.name);
      setInputPlaceholder(editingField.placeholder);
      setIsRequired(editingField.required);
    } else {
      setInputName("");
      setInputPlaceholder("");
      setIsRequired(false);
    }
  }, [editingField]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleSave = () => {
    onSave({
      name: inputName,
      placeholder: inputPlaceholder,
      required: isRequired,
    });
    handleClose();
  };

  return (
    <Dialog open={Boolean(open)} onClose={handleClose}>
      <DialogTitle>Add Multi-Text Area</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Field Name"
          type="text"
          fullWidth
          value={inputName}
          onChange={(e) => (
            setInputName(e.target.value), setInputPlaceholder(e.target.value)
          )}
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
