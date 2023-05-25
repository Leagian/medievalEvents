import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, FormControl } from "@mui/material";
import profileAPI from "../services/profileAPI";

// COMPONENT
import ErrorMessage from "./ErrorMessage";
import PasswordField from "./PasswordField";

function SignupForm({ onSignUpSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <>
      <h5>Inscrivez-vous pour pouvoir ajouter votre évènement</h5>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <form onSubmit={handleForm}>
        <TextField
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <PasswordField
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Valider
        </Button>
      </form>
    </>
  );
}

SignupForm.propTypes = {
  onSignUpSuccess: PropTypes.func.isRequired,
};

export default SignupForm;
