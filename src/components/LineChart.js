import React, { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import axios from "axios";

export default function LineChart({
  timeFilter,
  departmentFilter,
  formFilter,
}) {
  const [chartData, setChartData] = useState({
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
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/forms/formStats?time=${timeFilter}&faculty=${departmentFilter}&formName=${formFilter}`;

        const response = await axios.get(url, {
          headers: {
            "x-auth-token": token,
          },
        });

        console.log(response.data.formsByDayOfWeek);
        const chartDataCopy = { ...chartData };
        chartDataCopy.datasets[0].data = response.data.formsByDayOfWeek;
        setChartData((prevState) => ({
          ...prevState,
          datasets: [
            {
              ...prevState.datasets[0],
              data: response.data.formsByDayOfWeek,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [timeFilter, departmentFilter, formFilter]);

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
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
}
