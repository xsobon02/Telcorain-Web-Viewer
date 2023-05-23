import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { ImageOverlay } from "react-leaflet/ImageOverlay";
import { THIS_URL } from "../constants/constants";

export default function RainfallCanvas(props) {
  useMapEvents({
    click(e) {
      props.setShowPointValuesChart(true);
      props.setLatLong(e.latlng);
      fetch(`${THIS_URL}/output/pointvalue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: e.latlng.lat,
          long: e.latlng.lng,
          index: props.sliderValue,
          showTotal: props.showTotal,
        }),
      })
        .then((res) => {
          if (res.status === 422) {
            console.log("Error!");
            throw new Error("Error.");
          }
          if (res.status !== 200 && res.status !== 201) {
            console.log("Error!");
            throw new Error("Error.");
          }
          if (res.status === 401) {
            console.log("Error!");
          }
          return res.json();
        })
        .then((resData) => {
          props.setPointValue(resData.pointValue);
          props.setPointValues(resData.pointValues);
          props.setPointTimes(resData.times);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <>
      {props.raingrids.raingrids.map((item) => {
        return (
          props.time === item.time && (
            <ImageOverlay
              bounds={[
                [props.raingrids.Y_MAX, props.raingrids.X_MAX],
                [props.raingrids.Y_MIN, props.raingrids.X_MIN],
              ]}
              zIndex={999}
              url={props.showTotal ? item.totalCanvas : item.intensityCanvas}
              opacity={0.7}
              key={item.time}
            />
          )
        );
      })}
    </>
  );
}
