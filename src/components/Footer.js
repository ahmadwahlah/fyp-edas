import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box sx={{ position: "static", bottom: 0, width: "100%", mt: 8, mb: 4 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © EDAS "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
