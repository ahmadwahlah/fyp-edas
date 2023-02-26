import React from "react";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Box from "@mui/material/Box";

const PieChart = () => {
  const data = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        data: [15, 7, 5],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const boxStyle = {
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    maxwidth: "100%",
    height: "100%",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "black",
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={boxStyle}>
        <Box style={headingStyle}>Status Chart</Box>
        <Pie data={data} />
      </Box>
    </Box>
  );
};

export default PieChart;
