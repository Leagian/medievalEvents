import { useEffect, useState } from "react";
import axios from "axios";
import { useDataContext } from "../contexts/DataContext";
import SearchFilters from "../components/SearchFilters";
import SearchResults from "../components/SearchResults";

function SearchEvents() {
  const [searchText, setSearchText] = useState(""); // Stocke le texte de recherche
  const [searchCat, setSearchCat] = useState([]); // Stocke les catégories
  const [selectedCategories, setSelectedCategories] = useState([]); // Stocke les catégories sélectionnées

  // Récupère les événements et les catégories du contexte
  const { dataEvents } = useDataContext();

  // Récupère les catégories depuis le serveur
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((response) => {
        const categoriesWithFilterKeys = response.data.map((cat) => ({
          ...cat,
          filterKey: cat.cat_name,
        }));
        setSearchCat(categoriesWithFilterKeys);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  // Gère les changements de filtre en mettant à jour les catégories sélectionnées
  const handleFilterChange = (categoryId, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  // Filtrer les événements en fonction des catégories sélectionnées et du texte de recherche
  const filteredEvents = dataEvents.filter((event) => {
    if (selectedCategories.length > 0) {
      return (
        selectedCategories.includes(event.categorie_id) &&
        event.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return event.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="SearchEvents--global">
      <div className="SearchEvents--container">
        <SearchFilters
          searchCat={searchCat}
          onSearch={(text) => setSearchText(text)} // Met à jour le texte de recherche
          onFilter={handleFilterChange} // Gère les changements de filtre
        />
        {/* Affiche les événements filtrés */}
        <SearchResults events={filteredEvents} />
      </div>
    </div>
  );
}

export default SearchEvents;
