import { useState } from "react";
import Chart from "./Chart";

export default function LinkInfo(props) {
  const [fade, setFade] = useState(true);
  const notSelected = props.pointInfoZ > props.linkInfoZ ? "notSelected" : "";
  function closeInfo() {
    props.setPointInfoZ(998);
    props.setLinkInfoZ(998);
    setFade(false);
    setTimeout(() => {
      props.setShowLinkInfo(false);
    }, 250);
  }

  function chooseBookmark() {
    props.setPointInfoZ(998);
    props.setLinkInfoZ(999);
  }
  return (
    <div
      className={fade ? "linkinfo fadeYIn" : "linkinfo fadeYOut"}
      style={{ zIndex: props.linkInfoZ }}
    >
      {props.linksType === props.realLinksData && (
        <div>
          <h3>CML info :</h3>
          <div className="linkinfo-table">
            <ul>
              <li>id</li>
              <li>frequency A</li>
              <li>frequency B</li>
              <li>bandwidth</li>
              <li>technology</li>
              <li>polarization</li>
              <li>length</li>
            </ul>
            <ul>
              <li>{props.selectedLink.id}</li>
              <li>{props.selectedLink.frequencyA}</li>
              <li>{props.selectedLink.frequencyB}</li>
              <li>{props.selectedLink.freqBand}</li>
              <li>{props.selectedLink.technology}</li>
              <li>{props.selectedLink.polarization}</li>
              <li>{props.selectedLink.distance}m</li>
            </ul>
          </div>
        </div>
      )}

      <div className={`linkbookmark ${notSelected}`}>
        <h2 onClick={() => chooseBookmark()}>Link</h2>
      </div>
      <div className="linkinfo-chart">
        {props.cmlOutput !== undefined && (
          <Chart
            cmlOutput={props.cmlOutput.realTimeData}
            linkId={props.selectedLink.id}
            select={props.select}
          />
        )}
      </div>
      <span
        className="material-symbols-outlined close"
        onClick={() => closeInfo()}
      >
        close
      </span>
    </div>
  );
}
