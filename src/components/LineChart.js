import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";

const data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Number of Form Submissions",
      data: [10, 5, 15, 8, 20, 12, 6],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Number of Form Submissions",
      },
    },
  },
};

export default function LineChart() {
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
      <Box
        sx={{
          width: "100%",
          maxWidth: "720px",
          height: "100%",
          backgroundColor: "#f5f5f5",
          border: "1px solid #CCC",
          borderRadius: "5px",
          padding: "2%",
          margin: "2.5%",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "15px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Form Submissions by Day of the Week
        </Box>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
}
