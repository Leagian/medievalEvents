import { Link } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import "./styles/Header.css";

function Header() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    // Ici, vous pouvez ajouter votre logique de recherche
  };

  return (
    <header className="header">
      <nav className="header--nav">
        <ul>
          <li>
            <Link className="header-link" to="/carte">
              CARTE
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/ajouter">
              AJOUTER UN EVENEMENT
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/">
              ESCALE MEDIEVALE
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/events">
              EVENEMENTS
            </Link>
          </li>
        </ul>
        <div className="search-container">
          <input
            type="text"
            placeholder="Recherche..."
            value={searchText}
            onChange={handleSearch}
          />
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
