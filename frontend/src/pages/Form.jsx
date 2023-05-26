import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// MATERIAL
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// SERVICES
import profileAPI from "../services/profileAPI";

function Form() {
  const [file, setFile] = useState(null); // image
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    site: "",
    date: "",
    description: "",
    categorie_id: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      address: "",
      site: "",
      date: "",
      description: "",
      categorie_id: "",
    });
    setFile(null);
  };

  const [categorieList, setCategorieList] = useState([]);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (file) {
      data.append("image", file);
    }

    try {
      await profileAPI.post(`/api/events`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setOpen(true);
      resetForm(); // Set open to true when submit is successful
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      setErrorOpen(true); // Set errorOpen to true when an error occurs
    }
  };

  const handleChange = (e) => {
    const { id, name, value: originalValue } = e.target;
    const value =
      id === "title" || name === "title"
        ? originalValue.toUpperCase()
        : originalValue;

    setFormData({
      ...formData,
      [id || name]: value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorOpen(false);
  };

  // image
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await profileAPI.get(`/api/categories`);
        setCategorieList(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        Titre:
        <input
          type="text"
          id="title"
          value={formData.title}
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
      <label htmlFor="category">
        <select
          name="categorie_id"
          value={formData.categorie_id}
          onChange={handleChange}
        >
          <option value="">--Sélectionnez la catégorie--</option>
          {categorieList.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.cat_name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="site">
        Site:
        <input
          type="text"
          name="site"
          placeholder="www.medieval.com"
          value={formData.site}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="address">
        Adresse:
        <input
          type="text"
          name="address"
          placeholder="Ville, Département"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="image">
        Image:
        <input type="file" id="image" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Merci l'événement a été envoyé et sera vérifié par notre équipe pour
          validation!
        </Alert>
      </Snackbar>

      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Veuillez remplir tous les champs.
        </Alert>
      </Snackbar>
      <Outlet />
    </form>
  );
}

export default Form;
