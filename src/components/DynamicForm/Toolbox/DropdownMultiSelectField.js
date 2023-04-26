import React, { useState } from "react";
import {
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const DropdownMultiSelectField = ({
  id,
  heading,
  options,
  onRemove,
  onEdit,
  fieldData,
  required,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };

  return (
    <div>
      <div
        className="dropdownMultiSelectField"
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
            {heading || "Dropdown Multi-Select"}
            {required && "*"}
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId={`${id}-label`}
              id={id}
              multiple
              value={selectedValues}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
              required={required}
              disabled
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  <Checkbox checked={selectedValues.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default DropdownMultiSelectField;
