import React from "react";
import { useDrop } from "react-dnd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import InputField from "./Toolbox/InputField";
import MultiTextAreaField from "./Toolbox/MultiTextAreaField";
import RadioButtonField from "./Toolbox/RadioButtonField";
import CheckboxGroupField from "./Toolbox/CheckboxGroupField";

const FormEditor = ({ fields, onAddField, onRemoveField }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["inputField", "multiTextArea", "radioButton", "checkboxGroup"],
    drop: () => ({ name: "formBuilder" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        height: "100%",
        textAlign: "center",
        bgcolor: isOver ? "#e6e6e6" : "white",
      }}
    >
      {fields.length === 0 ? (
        <Box
          sx={{
            p: 2,
            height: "95%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "lightgray",
          }}
        >
          <Typography variant="h3">Dropzone</Typography>
        </Box>
      ) : (
        fields.map((field) => {
          switch (field.type) {
            case "inputField":
              return (
                <InputField
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  onRemove={onRemoveField}
                  onEdit={(fieldData) => onAddField(fieldData, true)}
                  fieldData={field}
                />
              );
            case "multiTextArea":
              return (
                <MultiTextAreaField
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  onRemove={onRemoveField}
                  onEdit={(fieldData) => onAddField(fieldData, true)}
                  fieldData={field}
                />
              );
            case "radioButton":
              return (
                <RadioButtonField
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  heading={field.heading}
                  options={field.options}
                  onRemove={onRemoveField}
                  onEdit={(fieldData) => onAddField(fieldData, true)}
                  fieldData={field}
                />
              );
            case "checkboxGroup":
              return (
                <CheckboxGroupField
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  heading={field.heading}
                  options={field.options}
                  onRemove={onRemoveField}
                  onEdit={(fieldData) => onAddField(fieldData, true)}
                  fieldData={field}
                />
              );

            default:
              return null;
          }
        })
      )}
    </Box>
  );
};

export default FormEditor;
