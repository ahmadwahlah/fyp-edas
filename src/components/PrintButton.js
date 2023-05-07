import React from "react";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
const handlePrint = () => {
  window.print();
};
const PrintButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<PrintIcon />}
      onClick={handlePrint}
      sx={{ marginLeft: 1 }}
    >
      Print
    </Button>
  );
};
export default PrintButton;
