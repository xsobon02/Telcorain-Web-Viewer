export default function Time(props) {
  return (
    <div className="time">
      <p>
        <b>Date :</b>{" "}
        {new Date(props.raingrids[props.sliderValue].time)
          .toString()
          .substring(4, 15)}
      </p>
      <p>
        <b>UTC Time :</b>{" "}
        {new Date(props.raingrids[props.sliderValue].time)
          .toString()
          .substring(16, 21)}
      </p>
      <p>
        <b>Point value :</b> {props.pointValue} {}
        {typeof props.pointValue === "number" &&
          (props.showTotal ? "mm" : "mm/h")}
      </p>
    </div>
  );
}
