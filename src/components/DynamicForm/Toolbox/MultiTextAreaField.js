import React from "react";
import { TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const MultiTextAreaField = ({
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
        className="multiTextArea"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            textAlign: "left",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name || "Multi-line Text Area"}
            {required ? " *" : ""}
          </Typography>
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
            disabled
          />
        </div>
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

export default MultiTextAreaField;
