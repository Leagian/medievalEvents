import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDataContext } from "../contexts/DataContext";
import SearchFilters from "../components/SearchFilters";
import SearchResults from "../components/SearchResults";

function SearchEvents() {
  const [searchText, setSearchText] = useState("");
  const [searchCat, setSearchCat] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);

  const { dataEvents } = useDataContext();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((response) => {
        const categoriesWithFilterKeys = response.data.map((cat) => ({
          ...cat,
          filterKey: cat.nom,
        }));
        setSearchCat(categoriesWithFilterKeys);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const filterEvents = (event) => {
    if (checkedCategories.length === 0) {
      return true;
    }

    return checkedCategories.includes(event.categorie_id);
  };

  return (
    <div className="SearchEvents--global">
      <div className="SearchEvents--container">
        <SearchFilters
          searchCat={searchCat}
          onSearch={(text) => setSearchText(text)}
          onFilter={(newCheckedCategories) =>
            setCheckedCategories(newCheckedCategories)
          }
        />
        <SearchResults
          events={dataEvents
            .filter((event) => filterEvents(event))
            .filter((event) =>
              event.titre.toLowerCase().includes(searchText.toLowerCase())
            )}
        />
      </div>
    </div>
  );
}

SearchFilters.propTypes = {
  searchCat: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nom: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default SearchEvents;
