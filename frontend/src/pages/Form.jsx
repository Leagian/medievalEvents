import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// MATERIAL
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

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
    Object.keys(formData).forEach((key) => {
      let value = formData[key];
      if (key === "title") {
        value = value.toUpperCase();
      }
      data.append(key, value);
    });
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
    const { id, name, value } = e.target;
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
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "600px", margin: "auto", marginTop: "3rem" }}
    >
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="title" />
        <TextField
          label="Titre*"
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="description" />
        <TextField
          label="Description*"
          id="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={8}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="date" />
        <TextField
          label="Date*"
          type="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="categorie_id">Catégorie</InputLabel>
        <Select
          labelId="categorie_id"
          id="categorie_id"
          value={formData.categorie_id}
          onChange={handleChange}
          name="categorie_id"
        >
          <MenuItem value="">
            <em>--Sélectionnez la catégorie--</em>
          </MenuItem>
          {categorieList.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.cat_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="site" />
        <TextField
          label="Site"
          type="text"
          id="site"
          name="site"
          placeholder="www.medieval.com"
          value={formData.site}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="address" />
        <TextField
          label="Adresse*"
          type="text"
          id="address"
          name="address"
          placeholder="Ville, Département"
          value={formData.address}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="image" />
        <TextField
          label="Image"
          type="file"
          id="image"
          onChange={handleFileChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ display: "block", margin: "20px auto" }}
      >
        Envoyer
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Merci l'événement a été envoyé et sera vérifié par notre équipe pour
          validation!
        </Alert>
      </Snackbar>

      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Veuillez remplir champs Titre, Description, Date, Catégorie et Adresse
        </Alert>
      </Snackbar>
      <Outlet />
    </form>
  );
}

export default Form;
