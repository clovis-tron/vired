import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Sample data for the chart
  const data = {
    labels: ["Users Enrolled in Course A", "Users Enrolled in Course B", "Users Enrolled in Course C"],
    datasets: [
      {
        label: "Users vs Courses",
        data: [120, 95, 85], // Number of users enrolled in each course
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    maintainAspectRatio: false, // Allow resizing
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-center font-semibold text-lg mb-4">Users vs Courses Enrolled</h3>
      {/* Wrapper for controlled size */}
      <div className="relative w-full max-w-md mx-auto" style={{ height: "300px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
