import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const RadioButtonField = ({
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
        className="radioButtonField"
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
            {heading || "Radio Button Group"}
            {required ? " *" : ""}
          </Typography>
          <RadioGroup aria-label={heading} name={id}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
                required={required}
                disabled
              />
            ))}
          </RadioGroup>
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

export default RadioButtonField;
