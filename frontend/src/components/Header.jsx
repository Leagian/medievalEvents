import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

// MATERIAL
import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

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
    <>
      <Box component="nav" display="flex" mb={2} mt={1}>
        <Box
          display="flex"
          flexDirection={isTablet ? "column" : "row"}
          justifyContent={isTablet ? "center" : "space-evenly"}
          alignItems="center"
          flex={1}
          ml={isTablet ? 15 : 0}
        >
          {user ? (
            <MuiLink
              component={Link}
              to="/form"
              underline="none"
              color="inherit"
              sx={{ "&:hover": { color: "#888" } }}
              ml={isTablet ? 1 : 10}
            >
              <Typography variant="subtitle1">
                AJOUTER UN EVENEMENT
                <MapsUgcIcon fontSize="small" style={{ color: "#42555e" }} />
              </Typography>
            </MuiLink>
          ) : (
            <Box style={{ width: "345px" }} />
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
              ml={isTablet ? 0 : 3}
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
        <Box
          display="flex"
          justifyContent="flex-end"
          flexDirection={isTablet ? "column" : "row"}
        >
          {user ? (
            <Box
              display="flex"
              alignItems="center"
              flexDirection={isTablet ? "column" : "row"}
            >
              {user.role !== "admin" && (
                <Box>
                  <Link to={`/profile/${user.id}`}>
                    <CustomAvatar
                      photoUrl={user.avatar}
                      handleAvatarUpload={handleAvatarUpload}
                      style={{ width: "2.5rem", height: "auto" }}
                    />
                  </Link>
                </Box>
              )}

              {user.role === "admin" && (
                <Box margin={1}>
                  <Link to="/admin">
                    <img
                      src={defaultAdminAvatar}
                      alt="Admin Avatar"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Link>
                </Box>
              )}
              <Box margin={isTablet ? 0 : 2}>
                <Button
                  variant="elevated"
                  onClick={handleDisconnection}
                  size="small"
                >
                  Déconnexion
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              flexDirection={isTablet ? "column" : "row"}
            >
              <Box margin={isTablet ? 0 : 2}>
                <Button variant="text" onClick={openLoginModal} size="small">
                  Connexion
                </Button>
              </Box>
              <Box margin={isTablet ? 0 : 2}>
                <Button variant="text" onClick={openSignupModal} size="small">
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
    </>
  );
}

export default Header;
