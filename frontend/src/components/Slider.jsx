import { useState } from "react";

export default function Slider(props) {
  const [playInterval, setPlayInterval] = useState();

  function playAndPause() {
    let i = props.sliderValue;
    if (playInterval === undefined) {
      let tempPlayInterval = setInterval(() => {
        if (i === 24) {
          i = 0;
        } else {
          i++;
        }
        props.setSliderValue(i);
        sessionStorage.setItem("time", i);
        props.setTime(props.raingrids[i].time);
        props.setGridLinks(
          props.raingrids[i].links
            .replace("[", "")
            .replace("]", "")
            .split(", ")
            .map((item) => {
              return Number(item);
            })
        );
      }, 900);
      setPlayInterval(tempPlayInterval);
    } else {
      clearInterval(playInterval);
      setPlayInterval(undefined);
    }
  }
  function manualChange(e) {
    let targetValueNum = Number(e.target.value);
    if (playInterval !== undefined) {
      clearInterval(playInterval);
      setPlayInterval(undefined);
    }
    props.setSliderValue(targetValueNum);
    sessionStorage.setItem("time", targetValueNum);
    props.setTime(props.raingrids[targetValueNum].time);
    props.setGridLinks(
      props.raingrids[targetValueNum].links
        .replace("[", "")
        .replace("]", "")
        .split(", ")
        .map((item) => {
          return Number(item);
        })
    );
  }

  return (
    <div className="slider">
      <button className="play-button" onClick={() => playAndPause()}>
        {playInterval !== undefined ? (
          <span className="material-symbols-outlined">pause</span>
        ) : (
          <span className="material-symbols-outlined">play_arrow</span>
        )}
      </button>
      <input
        type="range"
        name="rainfall"
        min="0"
        max={props.raingrids.length - 1}
        value={props.sliderValue}
        onChange={(e) => {
          manualChange(e);
        }}
      ></input>
    </div>
  );
}
