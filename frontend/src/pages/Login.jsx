import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import profileAPI from "../services/profileAPI";

import { useAuthContext } from "../contexts/AuthContext";

function Login({ isOpen, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser } = useAuthContext();

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      profileAPI
        .post(`/api/login`, {
          email,
          password,
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.data.role === "admin") {
            navigate("/admin"); // Rediriger vers la page d'administration pour les utilisateurs avec le rôle "admin"
          } else {
            navigate(`/profile/${res.data.id}`); // Utiliser l'ID de la réponse pour la redirection
          }
          closeModal();
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Invalid email or password"); // pour gérer les erreurs de connexion
        });
    } else {
      setErrorMessage("Please enter email and password");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <button
        type="button"
        onClick={closeModal}
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
      >
        X
      </button>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email :
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Connexion</button>
      </form>
    </Modal>
  );
}

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Login;
