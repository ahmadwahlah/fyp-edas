import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function FileUploadButton() {
  const inputRef = React.useRef();
  const [fileName, setFileName] = React.useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    // Do something with the selected file
    console.log(file);
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileSelect}
      />
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleClick}
      >
        Upload
      </Button>
      {fileName && (
        <p style={{ marginTop: "8px" }}>
          Selected file: <strong>{fileName}</strong>
        </p>
      )}
    </>
  );
}
