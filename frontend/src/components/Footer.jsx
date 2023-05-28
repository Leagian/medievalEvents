import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Link as MuiLink } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="space-between"
      mt={3}
      sx={{
        backgroundColor: "#f4f0ea",
        padding: "0.5rem",
        width: "100%",
      }}
    >
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
