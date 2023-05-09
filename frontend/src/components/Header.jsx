import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Avatar from "./Avatar";

import { useAuthContext } from "../contexts/AuthContext";

import profileAPI from "../services/profileAPI";

function Header() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const { user, setUser } = useAuthContext();

  const navigate = useNavigate();

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

  const toggleLoginModal = () => {
    closeSignupModal();
    openLoginModal();
  };

  const handleDisconnection = () => {
    profileAPI
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`)
      .then(() => {
        localStorage.clear();
        setUser(null);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

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
            <Link className="header--link" to="/">
              <span>ESCALE MEDIEVALE</span>
            </Link>
          </li>
          <li>
            <Link className="header--link" to="/events">
              EVENEMENTS
            </Link>
          </li>
          {user ? (
            <li>
              <Link className="header--link" to="/form">
                AJOUTER UN EVENEMENT
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
      <div>
        {user ? (
          <div>
            {user.role !== "admin" ? (
              <Link to={`/profile/${user.id}`}>
                <Avatar />
              </Link>
            ) : (
              <Link to="/admin">
                <Avatar />
              </Link>
            )}
            <button type="submit" onClick={handleDisconnection}>
              Se Déconnecter
            </button>
          </div>
        ) : (
          <>
            <button type="button" onClick={openLoginModal}>
              Connexion
            </button>
            <button type="button" onClick={openSignupModal}>
              Inscription
            </button>
          </>
        )}
      </div>
      <Login isOpen={loginModalOpen} closeModal={closeLoginModal} />
      <Signup
        isOpen={signupModalOpen}
        closeModal={closeSignupModal}
        toggleLoginModal={toggleLoginModal}
      />
    </header>
  );
}

export default Header;
