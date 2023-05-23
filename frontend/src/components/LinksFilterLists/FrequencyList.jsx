export default function FrequencyList(props) {
  function filterLinkByFreq(freq) {
    if (props.links.includes(freq)) {
      props.setLinks(props.links.filter((link) => link !== freq));
      props.updateFilter((draft) => {
        draft[freq] = false;
      });
    } else {
      props.updateFilter((draft) => {
        draft[freq] = true;
      });
      props.setLinks([...props.links, freq]);
    }
  }
  return (
    <>
      <ul className="links-filter-list">
        <li>
          <span>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["X"]}
              onChange={() => filterLinkByFreq("X")}
            />{" "}
            X (8 - 12.5 GHz)
          </span>
        </li>
        <li>
          <span>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["Ku"]}
              onChange={() => filterLinkByFreq("Ku")}
            />{" "}
            Ku (12.5 - 18 GHz)
          </span>
        </li>
        <li>
          <span>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["K"]}
              onChange={() => filterLinkByFreq("K")}
            />{" "}
            K (18 - 26.5 GHz)
          </span>
        </li>
        <li>
          <span>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["Ka"]}
              onChange={() => filterLinkByFreq("Ka")}
            />{" "}
            Ka (26.5 - 40 GHz)
          </span>
        </li>
        <li>
          <span>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["V"]}
              onChange={() => filterLinkByFreq("V")}
            />{" "}
            V (40 - 75 GHz)
          </span>
        </li>
        <li>
          <span>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["W"]}
              onChange={() => filterLinkByFreq("W")}
            />{" "}
            W (75 - 110 GHz)
          </span>
        </li>
      </ul>
    </>
  );
}
