import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ isOpen, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifier que les champs sont remplis
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Envoyer une requête de connexion au serveur
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      // Stocker le token JWT et l'ID de l'utilisateur dans le localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);

      // Réinitialiser le message d'erreur et fermer la modale
      setErrorMessage("");
      closeModal();

      // Rediriger l'utilisateur vers la page de profil
      navigate(`/users/${response.data.user.id}/profile`);
    } catch (error) {
      setErrorMessage("Email ou mot de passe incorrect.");
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <button type="submit">Se connecter</button>
      </form>
    </Modal>
  );
}

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Login;
