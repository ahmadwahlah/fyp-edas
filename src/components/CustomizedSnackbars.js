import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ message, severity }) {
  const snackbarRef = React.useRef(null);

  React.useEffect(() => {
    if (snackbarRef.current) {
      snackbarRef.current.handleClick();
    }
  }, []);

  const handleClick = () => {
    snackbarRef.current = { ...snackbarRef.current, open: true };
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    snackbarRef.current = { ...snackbarRef.current, open: false };
  };

  return (
    <Snackbar
      open={snackbarRef.current?.open || false}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
