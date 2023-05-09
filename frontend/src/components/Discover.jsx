import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

function Discover() {
  return (
    <div>
      <Typography variant="h5">
        DECOUVREZ TOUS LES EVENEMENTS MEDIEVAUX A VENIR
      </Typography>
      <h4>Connectez-vous pour pouvoir ajouter vos évènements !</h4>
      <div className="discover--cat">
        <Link to="/concerts">CONCERTS</Link>
        <Link to="/festivals">FESTIVALS</Link>
        <Link to="/marches">MARCHÉS</Link>
        <Link to="/spectacles">SPECTACLES</Link>
        <Link to="/expositions">EXPOSITIONS</Link>
      </div>
    </div>
  );
}

export default Discover;
