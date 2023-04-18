import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const InputField = ({ id, name, placeholder, required, onRemove, onEdit }) => {
  return (
    <div
      className="inputField"
      style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
    >
      <TextField
        type="text"
        name={name}
        label={placeholder || "Enter text"}
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

export default InputField;
