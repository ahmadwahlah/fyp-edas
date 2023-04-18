import React from "react";
import { useDrop } from "react-dnd";
import InputField from "./Toolbox/InputField";
import ButtonField from "./Toolbox/ButtonField";
import MultiTextAreaField from "./Toolbox/MultiTextAreaField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FormEditor = ({ fields, onAddField, onRemoveField }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["inputField", "button", "multiTextArea"],
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
            display: "inline-block",
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
                />
              );
            case "button":
              return (
                <ButtonField
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  text={field.text}
                  required={field.required}
                  onRemove={onRemoveField}
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
