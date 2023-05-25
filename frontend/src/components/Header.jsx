import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie"; // Importez la bibliothèque js-cookie

// COMPONENT
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CustomAvatar from "./CustomAvatar";

// IMAGE
import defaultAdminAvatar from "../assets/defaultAdminAvatar.png";

// CONTEXT
import { useAuthContext } from "../contexts/AuthContext";

// SERVICE
import profileAPI from "../services/profileAPI";

// HOOK
import useUserProfile from "../hooks/useUserProfile";

function getUserFromCookie() {
  const userCookie = Cookies.get("user");
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error("Erreur lors de la conversion du cookie en JSON :", error);
    }
  }
  return null;
}

function Header() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const { id } = useParams();
  const { handleAvatarUpload } = useUserProfile(id);
  const user = getUserFromCookie();

  const { setUser } = useAuthContext();
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
        Cookies.remove("user"); // Supprimez le cookie contenant les informations de l'utilisateur
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
            {user.role !== "admin" && (
              <Link to={`/profile/${user.id}`}>
                <CustomAvatar
                  photoUrl={user.avatar}
                  handleAvatarUpload={handleAvatarUpload}
                />
              </Link>
            )}
            {user.role === "admin" && (
              <Link to="/admin">
                <img
                  src={defaultAdminAvatar}
                  alt="Admin Avatar"
                  style={{ width: "50px", height: "50px" }}
                />
              </Link>
            )}
            <button type="submit" onClick={handleDisconnection}>
              Déconnexion
            </button>
          </div>
        ) : (
          <>
            <button type="submit" onClick={openLoginModal}>
              Connexion
            </button>
            <button type="submit" onClick={openSignupModal}>
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
