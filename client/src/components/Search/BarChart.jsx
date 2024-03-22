import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// BarChart component displays a bar chart of the average closing price per month for the past 6 months.
const BarChart = ({ sixMonthAverages, stockInfo }) => {
  // Array of month names for labeling the x-axis
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Bar chart JSX element
  const barChart = sixMonthAverages ? (
    <Bar
      data={{
        labels: sixMonthAverages.map(({ month }) => monthNames[month]),
        datasets: [
          {
            label: "Price",
            backgroundColor: "rgba(0, 0, 255, 0.3)",
            data: sixMonthAverages.map(({ value }) => value),
          },
        ],
      }}
      options={{
        // Set to false to allow the chart to be responsive
        maintainAspectRatio: false,
        scales: {
          y: {
            // Start the y-axis from zero
            beginAtZero: true,
          },
        },
        // Do not display the legend
        legend: { display: false },
        layout: {
          // Adjust padding for better visualization
          padding: {
            left: 10,
            right: 10,
            top: 15,
            bottom: 0,
          },
        },
        title: {
          // Display title with information about the chart
          display: true,
          text: `Average closing price per month of ${stockInfo.ticker} over the past 6 months`,
          position: "bottom",
        },
        animation: {
          // Set animation duration for visual appeal
          duration: 2000,
        },
      }}
    />
  ) : null;

  // Return the rendered bar chart
  return barChart;
};

export default BarChart;
