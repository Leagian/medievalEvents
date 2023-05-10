import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h5>Inscrivez-vous pour pouvoir ajouter votre évènement</h5>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
          <InputLabel>Mot de passe</InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
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
