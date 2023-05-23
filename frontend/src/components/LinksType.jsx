export default function LinksType(props) {
  return (
    <div
      className={
        props.showMenu
          ? "linkstype fadeLinksTypeOut"
          : "linkstype fadeLinksTypeIn"
      }
    >
      <ul>
        <li
          className={
            props.linksType === props.realLinksData && !props.linksHidden
              ? "chosen"
              : ""
          }
          onClick={() => {
            props.setLinksType(props.realLinksData);
            props.setLinksHidden(false);
          }}
        >
          <span className="material-symbols-outlined">vpn_lock</span> Real CMLs
        </li>
        <li
          className={
            props.linksType === props.fakeLinksData && !props.linksHidden
              ? "chosen"
              : ""
          }
          onClick={() => {
            props.setLinksType(props.fakeLinksData);
            props.setLinksHidden(false);
          }}
        >
          <span className="material-symbols-outlined">public</span> Fake CMLs
        </li>
        <li
          className={props.linksHidden ? "chosen" : ""}
          onClick={() => props.setLinksHidden(true)}
        >
          <span className="material-symbols-outlined">visibility_off</span> None
        </li>
      </ul>
    </div>
  );
}
