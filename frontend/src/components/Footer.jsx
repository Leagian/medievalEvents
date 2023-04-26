import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <p>&copy;ESCALE MEDIEVALE 2023</p>
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default Footer;
