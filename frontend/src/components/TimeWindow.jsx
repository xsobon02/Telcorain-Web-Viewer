import { useState } from "react";
import { THIS_URL } from "../constants/constants";

export default function TimeWindow(props) {
  const [fade, setFade] = useState(true);

  function handleChange(e) {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    props.setSelect(value);
  }

  return (
    <div className={fade ? "timewindow fadeYIn" : "timewindow fadeYOut"}>
      <label>Time Window :</label>
      <input
        type="number"
        value={props.select}
        min={1}
        max={36}
        onChange={(e) => handleChange(e)}
      />
      <span> hours</span>
      <span className="timewindowinfo">
        * click and use the scroll wheel to change the value
      </span>
    </div>
  );
}
