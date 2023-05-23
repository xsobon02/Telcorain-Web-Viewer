export default function TechnologyList(props) {
  function filterLinkByTech(tech) {
    if (props.links.includes(tech)) {
      props.setLinks(props.links.filter((link) => link !== tech));
      props.updateFilter((draft) => {
        draft[tech] = false;
      });
    } else {
      props.updateFilter((draft) => {
        draft[tech] = true;
      });
      props.setLinks([...props.links, tech]);
    }
  }
  return (
    <>
      <ul className="links-filter-list">
        <li>
          <span style={{ color: "#d20f39" }}>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["1s10"]}
              onChange={() => filterLinkByTech("1s10")}
            />{" "}
            1s10
          </span>
        </li>
        <li>
          <span style={{ color: "#40a02b" }}>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["ip10"]}
              onChange={() => filterLinkByTech("ip10")}
            />{" "}
            ip10
          </span>
        </li>
        <li>
          <span style={{ color: "#df8e1d" }}>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["ip20C"]}
              onChange={() => filterLinkByTech("ip20C")}
            />{" "}
            ip20C
          </span>
        </li>
        <li>
          <span style={{ color: "#1e66f5" }}>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["ip20E"]}
              onChange={() => filterLinkByTech("ip20E")}
            />{" "}
            ip20E
          </span>
        </li>
        <li>
          <span style={{ color: "#88e9ef" }}>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["ip20G"]}
              onChange={() => filterLinkByTech("ip20G")}
            />{" "}
            ip20G
          </span>
        </li>
        <li>
          <span style={{ color: "#179299" }}>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["ip20S"]}
              onChange={() => filterLinkByTech("ip20S")}
            />{" "}
            ip20S
          </span>
        </li>
        <li>
          <span style={{ color: "#ea76cb" }}>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["ip50"]}
              onChange={() => filterLinkByTech("ip50")}
            />{" "}
            ip50
          </span>
        </li>
      </ul>
    </>
  );
}
