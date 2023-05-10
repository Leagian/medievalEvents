import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import profileAPI from "../services/profileAPI";
import { useAuthContext } from "../contexts/AuthContext";

function Login({ isOpen, closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

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
            navigate("/admin");
          } else {
            navigate(`/profile/${res.data.id}`);
          }
          closeModal();
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Invalid email or password");
        });
    } else {
      setErrorMessage("Please enter email and password");
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>
        Connexion
        <IconButton
          style={{ position: "absolute", top: "1rem", right: "1rem" }}
          onClick={closeModal}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Button type="submit">Connexion</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Login;
