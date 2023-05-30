import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// MATERIAL
import { Box, Typography, Link as MuiLink } from "@mui/material";

// COMPONENT
import SocialShareButtons from "./SocialShareButtons";
import DarkModeToggle from "./DarkModeToggle";

function Footer({ darkMode, setDarkMode }) {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
      sx={{
        backgroundColor: "#f4f0ea",
        padding: "0.1rem",
        width: "100%",
      }}
    >
      <Box>
        <SocialShareButtons />
      </Box>
      <Typography variant="body1" color="#333432">
        &copy; ESCALE MEDIEVALE 2023
      </Typography>
      <MuiLink component={Link} to="/contact" color="#464646" underline="hover">
        CONTACT
      </MuiLink>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </Box>
  );
}

Footer.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default Footer;
