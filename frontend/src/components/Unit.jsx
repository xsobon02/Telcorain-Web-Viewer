export default function Unit(props) {
  return (
    <div className={props.showMenu ? "unit fadeUnitOut" : "unit fadeUnitIn"}>
      <ul>
        <li
          className={!props.showTotal ? "chosen" : ""}
          onClick={() => {
            props.setShowPointValuesChart(false);
            props.setShowLinkInfo(false);
            props.setShowTotal(false);
            props.setPointValue("-");
          }}
        >
          <span className="material-symbols-outlined">rainy_heavy</span>{" "}
          Intensity [mm/h]
        </li>
        <li
          className={props.showTotal ? "chosen" : ""}
          onClick={() => {
            props.setShowPointValuesChart(false);
            props.setShowLinkInfo(false);
            props.setShowTotal(true);
            props.setPointValue("-");
          }}
        >
          <span className="material-symbols-outlined">water_drop</span> Total
          [mm]
        </li>
      </ul>
    </div>
  );
}
