import React, { useState, useEffect } from "react";
import Title from "../Template/Title.jsx";
import LineChart from "../Template/LineChart";
import Axios from "axios";
import config from "../../config/Config";

// Chart Component
const Chart = () => {
  // State to hold chart data
  const [chartData, setChartData] = useState(undefined);

  // Fetch chart data from the API on component mount
  useEffect(() => {
    const getData = async () => {
      // API endpoint for fetching random data
      const url = config.base_url + `/api/data/random`;

      // Fetch data from the API
      const response = await Axios.get(url);

      // Check if the API call was successful
      if (response.data.status === "success") {
        // Set the chart data in the component state
        setChartData(response.data);
      }
    };

    // Call the function to fetch data
    getData();
  }, []);

  // Render the component
  return (
    <React.Fragment>
      {/* Render chart only if chart data is available */}
      {chartData && (
        <div style={{ minHeight: "240px" }}>
          {/* Display chart title */}
          <Title>Explore {chartData.name}'s Stock Chart</Title>

          {/* Render LineChart component with past data and stock info */}
          <LineChart
            pastDataPeriod={chartData.data}
            stockInfo={{ ticker: chartData.ticker }}
            duration={"3 years"}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Chart;
