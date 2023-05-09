import React, { useState } from "react";
import PropTypes from "prop-types";
import profileAPI from "../services/profileAPI";

function SignupForm({ onSignUpSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();

    if (email && password && name) {
      profileAPI
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
          email,
          password,
          name,
        })
        .then(() => {
          onSignUpSuccess();
        })
        .catch((err) => console.error(err));
    } else {
      setErrorMessage("You must provide a name, an email, and a password");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h2>Inscription</h2>
      <h4>Inscrivez-vous pour pouvoir ajouter votre évènement</h4>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleForm}>
        <div>
          <label>
            Nom :
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <div>
          <label>
            Mot de passe :
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              style={{ marginLeft: "0.5rem" }}
            >
              {showPassword ? "Cacher" : "Afficher"}
            </button>
          </label>
        </div>
        <button type="submit">Valider</button>
      </form>
    </>
  );
}

SignupForm.propTypes = {
  onSignUpSuccess: PropTypes.func.isRequired,
};

export default SignupForm;
