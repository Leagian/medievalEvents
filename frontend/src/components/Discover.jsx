import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// MATERIAL
import { Typography } from "@mui/material";

function Discover() {
  const [categoriesName, setCategoriesName] = useState([]);

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
    <div>
      <Typography variant="h5">
        DECOUVREZ TOUS LES EVENEMENTS MEDIEVAUX A VENIR
      </Typography>
      <h4>Connectez-vous pour pouvoir ajouter vos évènements !</h4>
      <div className="discover--cat">
        {categoriesName.map((category) => (
          <Link key={category.id} to={`categories/${category.cat_name}`}>
            <p>{category.cat_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Discover;
