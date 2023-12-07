import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Divider } from "@mui/material";

const InputField = ({
  id,
  name,
  placeholder,
  required,
  onRemove,
  onEdit,
  fieldData,
}) => {
  return (
    <div>
      <div
        className="inputField"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <TextField
          type="text"
          name={name}
          label={placeholder || "Enter text"}
          variant="outlined"
          sx={{ marginRight: 1, flexGrow: 1 }}
          required={required}
          fullWidth
          disabled
        />
        <IconButton
          onClick={() => onEdit(fieldData)}
          color="primary"
          sx={{ marginRight: 1 }}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onRemove(id)} color="error">
          <DeleteIcon />
        </IconButton>
      </div>
      <Divider />
    </div>
  );
};

export default InputField;
