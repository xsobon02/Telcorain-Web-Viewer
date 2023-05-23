export default function PolarizationList(props) {
  function filterLinkByPolar(polar) {
    if (props.links.includes(polar)) {
      props.setLinks(props.links.filter((link) => link !== polar));
      props.updateFilter((draft) => {
        draft[polar] = false;
      });
    } else {
      props.updateFilter((draft) => {
        draft[polar] = true;
      });
      props.setLinks([...props.links, polar]);
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
              checked={props.filter["H"]}
              onChange={() => filterLinkByPolar("H")}
            />{" "}
            Horizontal
          </span>
        </li>
        <li>
          <span>
            <input
              className="checkbox"
              type="checkbox"
              checked={props.filter["V"]}
              onChange={() => filterLinkByPolar("V")}
            />{" "}
            Vertical
          </span>
        </li>
      </ul>
    </>
  );
}
