import React from "react";
import { Typography, IconButton, Divider, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUploadField = ({
  id,
  heading,
  onRemove,
  onEdit,
  fieldData,
  required,
}) => {
  const inputId = `${id}-input`;
  const inputRef = React.useRef();
  const [fileName, setFileName] = React.useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    // Do something with the selected file
    console.log(file);
  };

  return (
    <div>
      <div
        className="fileUploadField"
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            {heading || "File Upload"} {required && "*"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
            disabled
            onClick={() => inputRef.current.click()}
          >
            Upload
          </Button>
          <input
            type="file"
            id={inputId}
            hidden
            required={required}
            accept=".pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
            ref={inputRef}
            onChange={handleFileSelect}
          />
          {fileName && (
            <p style={{ marginTop: "8px" }}>
              Selected file: <strong>{fileName}</strong>
            </p>
          )}
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

export default FileUploadField;
