import { Card, CardContent, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Quicksand", "sans-serif"].join(","),
  },
});

export default function DashboardCard({ title, value }) {
  const [formsSubmitted, setFormsSubmitted] = useState(10);

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          width: 250,
          height: 120,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f5f5f5",
          border: "1px solid #CCC",
          borderRadius: "5px",
          margin: "0 16px",
        }}
      >
        <CardContent sx={{ textAlign: "center", padding: "16px" }}>
          <Typography variant="subtitle1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
