import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CheckboxGroupField = ({
  id,
  heading,
  options,
  required,
  onRemove,
  onEdit,
  fieldData,
}) => {
  return (
    <div>
      <div
        className="checkboxGroupField"
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
            {heading || "Checkbox Group"}
            {required ? " *" : ""}
          </Typography>
          <FormGroup>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={option}
                required={required}
                disabled
              />
            ))}
          </FormGroup>
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

export default CheckboxGroupField;
