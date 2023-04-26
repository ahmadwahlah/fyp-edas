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

const FileUploadDialog = ({ open, onClose, onSave, editingField }) => {
  const [heading, setHeading] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  useEffect(() => {
    if (editingField) {
      setHeading(editingField.heading);
      setIsRequired(editingField.required);
    } else {
      setHeading("");
      setIsRequired(false);
    }
  }, [editingField]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleSave = () => {
    onSave({ heading, required: isRequired });
    handleClose();
  };

  return (
    <Dialog open={Boolean(open)} onClose={handleClose}>
      <DialogTitle>Add File Upload</DialogTitle>
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

export default FileUploadDialog;
