import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormControlLabel, Checkbox } from "@mui/material";

const CheckboxGroupDialog = ({ open, onClose, onSave, editingField }) => {
  const [heading, setHeading] = useState("");
  const [options, setOptions] = useState(["Option 1"]);
  const [required, setRequired] = useState(false);

  useEffect(() => {
    if (editingField) {
      setHeading(editingField.heading);
      setOptions(editingField.options);
      setRequired(editingField.required);
    } else {
      setHeading("");
      setOptions(["Option 1"]);
      setRequired(false);
    }
  }, [editingField]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleSave = () => {
    onSave({ heading, options, required });
    handleClose();
  };

  const handleOptionChange = (index, value) => {
    setOptions(options.map((option, idx) => (idx === index ? value : option)));
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const deleteOption = (index) => {
    if (options.length > 1) {
      setOptions(options.filter((_, idx) => idx !== index));
    }
  };

  return (
    <Dialog open={Boolean(open)} onClose={handleClose}>
      <DialogTitle>Add Checkbox Group</DialogTitle>
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
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={10}>
              <TextField
                margin="dense"
                label={`Option ${index + 1}`}
                fullWidth
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                edge="end"
                color="error"
                onClick={() => deleteOption(index)}
                disabled={options.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button onClick={addOption}>Add Option</Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={required}
                onChange={(e) => setRequired(e.target.checked)}
              />
            }
            label="Required"
          />
        </Box>
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

export default CheckboxGroupDialog;
