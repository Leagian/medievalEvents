import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

// MATERIAL
import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

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
        Cookies.remove("user"); // Supprimez le cookie contenant les informations de l'utilisateur à la déco
        setUser(null);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav>
      <Box component="nav" display="flex" mb={2} mt={1}>
        <Box />
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          flex={1}
        >
          {user ? (
            <MuiLink
              component={Link}
              to="/form"
              underline="none"
              color="inherit"
              sx={{ "&:hover": { color: "#888" } }}
            >
              <Typography variant="subtitle1">
                AJOUTER UN EVENEMENT
                <MapsUgcIcon fontSize="small" style={{ color: "#42555e" }} />
              </Typography>
            </MuiLink>
          ) : (
            <Box style={{ width: "300px" }} />
          )}
          <MuiLink
            component={Link}
            to="/"
            underline="none"
            color="inherit"
            sx={{ "&:hover": { color: "#888" } }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ letterSpacing: "0.2em" }}
            >
              ESCALE MEDIEVALE
            </Typography>
          </MuiLink>
          <MuiLink
            component={Link}
            to="/events"
            underline="none"
            color="inherit"
            sx={{ "&:hover": { color: "#888" } }}
          >
            <Typography variant="subtitle1">EVENEMENTS</Typography>
          </MuiLink>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {user ? (
            <Box display="flex" alignItems="center">
              {user.role !== "admin" && (
                <Box margin={2}>
                  <Link to={`/profile/${user.id}`}>
                    <CustomAvatar
                      photoUrl={user.avatar}
                      handleAvatarUpload={handleAvatarUpload}
                    />
                  </Link>
                </Box>
              )}

              {user.role === "admin" && (
                <Box margin={2}>
                  <Link to="/admin">
                    <img
                      src={defaultAdminAvatar}
                      alt="Admin Avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                </Box>
              )}
              <Box margin={2}>
                <Button
                  variant="contained"
                  onClick={handleDisconnection}
                  size="small" // pour changer la taille du bouton
                  style={{ fontSize: "10px", backgroundColor: "#3b4d59" }} // pour changer la taille du texte
                >
                  Déconnexion
                </Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <Box margin={2}>
                <Button
                  variant="text"
                  // style={{ fontSize: "12px", backgroundColor: "#3b4d59" }}
                  onClick={openLoginModal}
                >
                  Connexion
                </Button>
              </Box>
              <Box margin={2}>
                <Button
                  variant="text"
                  // style={{ fontSize: "12px", backgroundColor: "#3b4d59" }}
                  onClick={openSignupModal}
                >
                  Inscription
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "gray",
          margin: "0 auto",
          width: "80%",
        }}
      />
      <Login isOpen={loginModalOpen} closeModal={closeLoginModal} />
      <Signup
        isOpen={signupModalOpen}
        closeModal={closeSignupModal}
        toggleLoginModal={toggleLoginModal}
      />
    </nav>
  );
}

export default Header;
