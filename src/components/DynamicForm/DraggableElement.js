import React from "react";
import { useDrag } from "react-dnd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { v4 as uuid } from "uuid";

const DraggableElement = ({ type, onAddField }) => {
  const [, drag] = useDrag(() => ({
    type: type,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onAddField({ id: `field-${uuid()}`, type });
      }
    },
  }));

  const renderElement = () => {
    switch (type) {
      case "inputField":
        return (
          <Typography
            variant="button"
            sx={{
              color: "white",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Input Field
          </Typography>
        );
      case "button":
        return (
          <Typography
            variant="button"
            sx={{
              color: "white",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Button
          </Typography>
        );
      case "multiTextArea":
        return (
          <Typography
            variant="button"
            sx={{
              color: "white",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Muilti-text Area
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      ref={drag}
      sx={{
        bgcolor: "black",
        height: "2.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        cursor: "grab",
        marginBottom: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s, box-shadow 0.1s",
        "&:hover": {
          transform: "scale(1.025)",
          boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {renderElement()}
    </Box>
  );
};

export default DraggableElement;
