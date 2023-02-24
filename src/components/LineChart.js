import React from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

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
    <div
      style={{
        width: "720px",
        height: "430px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #CCC",
        borderRadius: "5px",
        padding: "20px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "15px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Form Submissions by Day of the Week
      </div>
      <Line data={data} options={options} />
    </div>
  );
}
