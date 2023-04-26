import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="header--nav">
        <ul>
          <li>
            <Link className="header--link" to="/map">
              CARTE
            </Link>
          </li>
          <li>
            <Link className="header--link" to="/form">
              AJOUTER UN EVENEMENT
            </Link>
          </li>
          <li>
            <Link className="header--link" to="/">
              <span>ESCALE MEDIEVALE</span>
            </Link>
          </li>
          <li>
            <Link className="header--link" to="/events">
              EVENEMENTS
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <h5>Connexion</h5>
        <h5>Inscription</h5>
      </div>
    </header>
  );
}

export default Header;
