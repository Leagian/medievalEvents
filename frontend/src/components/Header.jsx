import { Link } from "react-router-dom";

import "./styles/Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="header--nav">
        <ul>
          <li>
            <Link className="header--link" to="/carte">
              CARTE
            </Link>
          </li>
          <li>
            <Link className="header--link" to="/formulaire">
              AJOUTER UN EVENEMENT
            </Link>
          </li>
          <li>
            <Link className="header--link" to="/">
              ESCALE MEDIEVALE
            </Link>
          </li>
          <li>
            <Link className="header--link" to="/events">
              EVENEMENTS
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
