import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// MATERIAL
import { Typography, Box, Link as MuiLink } from "@mui/material";

// CONTEXT
import { useAuthContext } from "../contexts/AuthContext";

function Discover() {
  const [categoriesName, setCategoriesName] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((res) => {
        setCategoriesName(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <header>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        mt={6}
        ml={6}
      >
        <Typography variant="h5" fontWeight="bold">
          DÉCOUVREZ TOUS LES ÉVÈNEMENTS MÉDIÉVAUX À VENIR
        </Typography>
        {!user && <h4>Connectez-vous pour pouvoir ajouter vos évènements !</h4>}
      </Box>

      <div className="discover--cat" style={{ display: "flex" }}>
        {categoriesName.map((category) => (
          <MuiLink
            component={Link}
            underline="none"
            color="#3b4c54"
            sx={{
              "&:hover": { color: "#000" },
              marginLeft: 6,
              marginTop: 5,
              marginBottom: 6,
            }}
            key={category.id}
            to={`categories/${category.cat_name}`}
          >
            <Typography variant="h6">{category.cat_name}</Typography>
          </MuiLink>
        ))}
      </div>
    </header>
  );
}

export default Discover;
