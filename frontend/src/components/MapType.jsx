export default function MapType(props) {
  function changeMapType(type) {
    props.setShowMapType(type);
  }
  return (
    <div
      className={
        props.showMenu ? "maptype fadeMapTypeOut" : "maptype fadeMapTypeIn"
      }
    >
      <ul>
        <li
          className={props.showMapType === "rainfall" ? "chosen" : ""}
          onClick={() => changeMapType("rainfall")}
        >
          <span className="material-symbols-outlined">rainy_light</span>{" "}
          Rainfall
        </li>
        <li
          className={props.showMapType === "links" ? "chosen" : ""}
          onClick={() => changeMapType("links")}
        >
          <span className="material-symbols-outlined">polyline</span> CMLs
        </li>
      </ul>
    </div>
  );
}
