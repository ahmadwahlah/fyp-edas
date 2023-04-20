// DropdownSelectField.js
import { React, useState } from "react";
import {
  Typography,
  IconButton,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const DropdownSelectField = ({
  id,
  heading,
  options,
  onRemove,
  onEdit,
  fieldData,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <div
        className="dropdownSelectField"
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
            {heading || "Dropdown Select"}
          </Typography>
          <Select
            labelId={`${id}-label`}
            id={id}
            value={selectedValue}
            onChange={handleChange}
            fullWidth
            disabled
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
        <IconButton
          onClick={() => onEdit(fieldData)}
          color="primary"
          sx={{ marginRight: 1, marginTop: 4, marginLeft: 1 }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ marginTop: 4 }}
          onClick={() => onRemove(id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <Divider />
    </div>
  );
};

export default DropdownSelectField;
