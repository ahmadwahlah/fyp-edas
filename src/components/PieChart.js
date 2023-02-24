import React from "react";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

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
    width: "375px",
    height: "430px",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "black",
  };

  return (
    <div style={boxStyle}>
      <div style={headingStyle}>Status Chart</div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
