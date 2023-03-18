import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

function AddEvent() {
  const [formData, setFormData] = useState({
    titre: "",
    image: "",
    adresse: "",
    site: "",
    date: "",
    description: "",
    categorie_id: "",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [categorie, setCategorie] = useState("");
  const [site, setSite] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/categorie");
        setCategorie(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, like send it to a server
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        {/* <label htmlFor="addEventCat">
          <select
            name="addEventCat"
            value={formData.addEventCat}
            onChange={handleChange}
            required
          >
            <option value="">--Sélectionnez la catégorie--</option>

            {categorie.map((item) => (
              <option value={item.id}>{item.ville}</option>
            ))}
          </select>
        </label> */}
        <label>
          Site:
          <input
            type="text"
            value={site}
            onChange={(event) => setSite(event.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddEvent;
