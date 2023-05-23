export default function Navbar(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <span className="material-symbols-outlined" id="raincloud-icon">
          rainy
        </span>
        Telcorain
      </a>
      <span className="navbar-menu" onClick={() => props.setShowMenu(true)}>
        <span className="material-symbols-outlined" id="menu-icon">
          menu
        </span>
      </span>
    </nav>
  );
}
