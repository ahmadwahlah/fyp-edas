import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const FormPreview = ({ fields }) => {
  return (
    <div className="formPreview">
      {fields.map((field) => {
        switch (field.type) {
          case "inputField":
            return (
              <TextField
                key={field.id}
                type="text"
                name={field.name}
                label={field.placeholder || "Enter text"}
                variant="outlined"
                sx={{ marginBottom: 2 }}
                required={field.required}
                fullWidth
              />
            );
          case "button":
            return (
              <Button
                key={field.id}
                variant="contained"
                sx={{ marginBottom: 2 }}
                name={field.name}
                required={field.required}
              >
                {field.text || "Submit"}
              </Button>
            );
          case "multiTextArea":
            return (
              <TextareaAutosize
                key={field.id}
                aria-label="minimum height"
                minRows={3}
                name={field.name}
                placeholder={field.placeholder || "Type here..."}
                required={field.required}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "16px",
                  resize: "vertical",
                }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FormPreview;
