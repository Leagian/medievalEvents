import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function AddEvent() {
  const inputRef = useRef();
  const [formData, setFormData] = useState({
    titre: "",
    image: "",
    adresse: "",
    site: "",
    date: "",
    description: "",
    categorie_id: "",
  });

  const [categorieList, setCategorieList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategorieList(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/events", formData);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //  UPLOAD FICHIER
  function hSubmit(e) {
    e.preventDefault();

    const formDataPhoto = new FormData();
    formData.append("image", inputRef.current.files[0]);
    // Todo changer api
    axios.post("http://localhost:5000/events", formDataPhoto);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titre">
          Titre:
          <input
            type="text"
            id="titre"
            value={formData.titre}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="date">
          Date:
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="categorie">
          <select
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
          >
            <option value="">--Sélectionnez la catégorie--</option>
            {categorieList.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categories}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="site">
          Site:
          <input
            type="text"
            name="site"
            value={formData.site}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="adresse">
          Adresse:
          <input
            type="text"
            name="adresse"
            value={formData.Adresse}
            onChange={handleChange}
          />
        </label>
      </form>
      <form encType="multipart/form-data" onSubmit={hSubmit}>
        <label htmlFor="banner">
          Image:
          <input className="banner" type="file" name="banner" ref={inputRef} />
        </label>
      </form>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}

export default AddEvent;
