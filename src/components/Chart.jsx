import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./Chart.css";

const ApexChart = () => {
  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Tech-Skills",
        data: [140, 100, 210, 110, 170, 130, 190, 120, 220, 180, 250]
      },
      {
        name: "Soft-Skills",
        data: [11, 32, 145, 82, 274, 52, 41, 100, 150, 200, 58]
      }
    ],
    options: {
      chart: {
        height: "100%",
        type: "area"
      },
      title: {
        text: "Performance Report"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#0000FF", "#FAC032", "#FF0000", "#E91E63", "#FF9800"],
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        categories: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6",
          "Week 7",
          "Week 8",
          "Week 9",
          "Week 10",
          "Week 11",
          "Week 12"
        ],
        labels: {
          style: {
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        min: 0,
        max: 300,

        labels: {
          style: {
            fontSize: "12px"
          }
        }
      }
    }
  });

  return (
    <div className="myChart">
      <div id="chart">
        <ReactApexChart
          options={chartState.options}
          series={chartState.series}
          type="area"
          height="100%"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
