import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart(props) {
  let labels, data;
  if (props.cmlOutput[`${props.linkId}`] !== undefined) {
    labels = props.cmlOutput[`${props.linkId}`].timeStamps
      .slice(-(Number(props.select) * 12 + 1))
      .map((item) => {
        return new Date(item).toUTCString().substring(5, 22);
      });
    data = props.cmlOutput[`${props.linkId}`].values.slice(
      -(Number(props.select) * 12 + 1)
    );
  }
  return labels !== undefined && data !== undefined ? (
    <Line
      className="chart"
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "rainfall intensity in mm/h",
          },
        },
      }}
      data={{
        labels: labels,
        datasets: [
          {
            label: "rainfall intensity in mm/h",
            data: data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }}
    />
  ) : (
    <div className="no-chart-data">No chart data available.</div>
  );
}
