import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./styles/Highlight.css";

function Highlight() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [descr, setDescr] = useState(null);
  const [category, setCategory] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    // todo api
    fetch("/api/random-image")
      .then((response) => response.json())
      .then((data) => {
        setImage(data.image_url);
        setTitle(data.title);
        setDescr(data.descr);
        setCategory(data.category);
        setDate(data.date);
      });
  }, []);

  return (
    <div>
      {image && (
        <div className="highlight--global">
          <h2>{title}</h2>
          <img src={image} alt="Random Highlight Event Medieval" />
          <p>{descr}</p>
          <p>{category}</p>
          <p>{date}</p>
        </div>
      )}
    </div>
  );
}

export default Highlight;
