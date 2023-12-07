// ButtonField.js
import React from "react";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ButtonField = ({ id, name, text, required, onRemove, onEdit }) => {
  return (
    <div
      className="button"
      style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
    >
      <Button
        variant="contained"
        sx={{ marginRight: 1, flexGrow: 1 }}
        name={name}
        required={required}
      >
        {text || "Button"}
      </Button>
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

export default ButtonField;
