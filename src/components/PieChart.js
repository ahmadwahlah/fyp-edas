import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Box from "@mui/material/Box";

const PieChart = ({ timeFilter, departmentFilter, formFilter }) => {
  const [chartData, setChartData] = useState({
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  });
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/forms/formStats?time=${timeFilter}&faculty=${departmentFilter}&formName=${formFilter}`;

        const response = await axios.get(url, {
          headers: {
            "x-auth-token": token,
          },
        });

        setChartData({
          labels: ["Approved", "Rejected", "Pending"],
          datasets: [
            {
              data: [
                response.data.approvedForms,
                response.data.rejectedForms,
                response.data.pendingForms,
              ],
              backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
              hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
          ],
        });
        setApiError(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setApiError(true);
      }
    };

    fetchStats();
  }, [timeFilter, departmentFilter, formFilter]);

  const boxStyle = {
    width: "75%",
    maxWidth: "720px",
    height: "100%",
    backgroundColor: "#f5f5f5",
    border: "1px solid #CCC",
    borderRadius: "5px",
    padding: "2%",
    margin: "2.5%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
        width: "71.5%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <Box sx={boxStyle}>
        <Box style={headingStyle}>Status Chart</Box>
        <Pie data={chartData} />
      </Box>
    </Box>
  );
};

export default PieChart;
