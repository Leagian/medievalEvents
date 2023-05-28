import React from "react";
import { Link } from "react-router-dom";

// MATERIAL
import { Box, Typography, Link as MuiLink } from "@mui/material";

// COMPONENT
import SocialShareButtons from "./SocialShareButtons";

function Footer() {
  return (
    <Box
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
      <Box component="footer">
        <SocialShareButtons />
      </Box>
      <Typography variant="body1" color="#333432" sx={{ marginLeft: "2rem" }}>
        &copy; ESCALE MEDIEVALE 2023
      </Typography>
      <MuiLink
        component={Link}
        to="/contact"
        color="#464646"
        underline="hover"
        sx={{ marginRight: "2rem" }}
      >
        CONTACT
      </MuiLink>
    </Box>
  );
}

export default Footer;
