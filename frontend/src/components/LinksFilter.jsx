import TechnologyList from "./LinksFilterLists/TechnologyList";
import PolarizationList from "./LinksFilterLists/PolarizationList";
import LengthInput from "./LinksFilterLists/LengthInput";
import FrequencyList from "./LinksFilterLists/FrequencyList";
import { useState } from "react";

export default function LinksFilter(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  function clearFilter() {
    props.setLinks([
      "all",
      "1s10",
      "ip10",
      "ip20C",
      "ip20E",
      "ip20G",
      "ip20S",
      "ip50",
    ]);
    props.updateFilter((draft) => {
      draft["all"] = true;
      draft["1s10"] = true;
      draft["ip10"] = true;
      draft["ip20C"] = true;
      draft["ip20E"] = true;
      draft["ip20G"] = true;
      draft["ip20S"] = true;
      draft["ip50"] = true;
    });
    props.setMinDistance(0);
    props.setMaxDistance(50000);
    props.setPolarLinks(["H", "V"]);
    props.updatePolarFilter((draft) => {
      draft["H"] = true;
      draft["V"] = true;
    });
    props.setBandwidthLinks(["X", "Ku", "K", "Ka", "V", "W"]);
    props.updateBandwidthFilter((draft) => {
      draft["X"] = true;
      draft["Ku"] = true;
      draft["K"] = true;
      draft["Ka"] = true;
      draft["V"] = true;
      draft["W"] = true;
    });
  }

  return (
    <div className="links-filter">
      <h3 className="links-filter-header">
        CML Filter{" "}
        <button
          className="links-filter-expand-button"
          onClick={() => setIsExpanded((value) => !value)}
        >
          <span className="material-symbols-outlined">
            {isExpanded ? "expand_less" : "expand_more"}
          </span>
        </button>
      </h3>
      {isExpanded && (
        <div className="links-filter-expanded">
          <h3 className="links-filter-header">Technologies</h3>
          <TechnologyList
            filter={props.filter}
            links={props.links}
            setLinks={props.setLinks}
            updateFilter={props.updateFilter}
          />
          <h3 className="links-filter-header">Frequency</h3>
          <FrequencyList
            filter={props.bandwidthFilter}
            links={props.bandwidthLinks}
            setLinks={props.setBandwidthLinks}
            updateFilter={props.updateBandwidthFilter}
          />
          <h3 className="links-filter-header">Polarization</h3>
          <PolarizationList
            filter={props.polarFilter}
            links={props.polarLinks}
            setLinks={props.setPolarLinks}
            updateFilter={props.updatePolarFilter}
          />
          <h3 className="links-filter-header">Length</h3>
          <LengthInput
            minDistance={props.minDistance}
            maxDistance={props.maxDistance}
            setMinDistance={props.setMinDistance}
            setMaxDistance={props.setMaxDistance}
          />
          <button className="button" onClick={() => clearFilter()}>
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}
