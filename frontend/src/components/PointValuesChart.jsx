import React, { useState } from "react";
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

export default function PointValuesChart(props) {
  const [fade, setFade] = useState(true);
  const fadeClass = fade ? "fadeYIn" : "fadeYOut";
  const notSelected = props.pointInfoZ < props.linkInfoZ ? "notSelected" : "";
  let labels, data;
  labels = props.pointTimes.map((item) => {
    return new Date(item).toString().substring(3, 21);
  });
  data = props.pointValues;
  function close() {
    props.setPointInfoZ(998);
    props.setLinkInfoZ(998);
    setFade(false);
    setTimeout(() => {
      props.setShowPointValuesChart(false);
    }, 250);
  }

  function chooseBookmark() {
    props.setPointInfoZ(999);
    props.setLinkInfoZ(998);
  }
  return labels.length !== 0 && data.length !== 0 ? (
    <div
      className={`pointinfo ${fadeClass}`}
      style={{ zIndex: props.pointInfoZ }}
    >
      <div className={`pointbookmark ${notSelected}`}>
        <h2 onClick={() => chooseBookmark()}>Point</h2>
      </div>
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
              text: props.showTotal
                ? "total precipitation in mm"
                : "rainfall intensity in mm/h",
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
      <div>
        <h4>Clicked point coordinates</h4>
        <div className="latlong">
          <ul>
            <li>latitude:</li>
            <li>longitude:</li>
          </ul>
          <ul>
            <li>{props.latLong.lat.toString().substring(0, 8)}</li>
            <li>{props.latLong.lng.toString().substring(0, 8)}</li>
          </ul>
        </div>
      </div>

      <span className="material-symbols-outlined close" onClick={() => close()}>
        close
      </span>
    </div>
  ) : (
    <div className={fade ? "pointinfo fadeYIn" : "pointinfo fadeYOut"}>
      <div className="pointbookmark">
        <h2>Point</h2>
      </div>
      <div className="no-chart-data">No chart data available.</div>

      <span className="material-symbols-outlined close" onClick={() => close()}>
        close
      </span>
    </div>
  );
}
