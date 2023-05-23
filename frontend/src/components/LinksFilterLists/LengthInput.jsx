export default function LengthInput(props) {
  return (
    <>
      <span>Min. length in m</span>
      <input
        className="links-filter-number-input"
        type="number"
        value={props.minDistance}
        onChange={(e) => props.setMinDistance(e.target.value)}
      />
      <span>Max. length in m</span>
      <input
        className="links-filter-number-input"
        type="number"
        value={props.maxDistance}
        onChange={(e) => props.setMaxDistance(e.target.value)}
      />
    </>
  );
}
