import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Avatar from "./Avatar";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setSignupModalOpen(false);
  };

  return (
    <header className="header">
      <nav className="header--nav">
        <ul>
          {/* <li>
            <Link className="header--link" to="/map">
              CARTE
            </Link>
          </li> */}
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
        <button type="button" onClick={openLoginModal}>
          Connexion
        </button>
        <button type="button" onClick={openSignupModal}>
          Inscription
        </button>
        {isLoggedIn && <Avatar />}
      </div>
      <Login isOpen={loginModalOpen} closeModal={closeLoginModal} />
      <Signup isOpen={signupModalOpen} closeModal={closeSignupModal} />
    </header>
  );
}

export default Header;
