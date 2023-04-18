import React from "react";
import { TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MultiTextAreaField = ({
  id,
  name,
  placeholder,
  required,
  onRemove,
  onEdit,
}) => {
  return (
    <div
      className="multiTextArea"
      style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
    >
      <TextField
        id={`multi-text-area-${id}`}
        name={name}
        label={placeholder || "Multi-line Text Area"}
        multiline
        rows={4}
        variant="outlined"
        sx={{ marginRight: 1, flexGrow: 1 }}
        required={required}
        fullWidth
      />
      <IconButton
        onClick={() => onEdit(id)}
        color="primary"
        sx={{ marginRight: 1 }}
      >
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onRemove(id)} color="error">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default MultiTextAreaField;
