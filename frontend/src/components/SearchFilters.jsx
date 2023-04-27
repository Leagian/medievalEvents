import { useState } from "react";
import PropTypes from "prop-types";

function SearchFilters({ onSearch, searchCat, onFilter }) {
  const [searchText, setSearchText] = useState(""); // Stocke le texte de recherche

  // Gère les changements de texte de recherche
  const handleSearch = ({ target }) => {
    setSearchText(target.value);
    onSearch(target.value);
  };

  // Gère les changements d'état des cases à cocher
  const handleCheckboxChange = (categoryId, isChecked) => {
    onFilter(categoryId, isChecked);
  };

  return (
    <div className="SearchFilters">
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Rechercher"
      />
      {searchCat.map((cat) => (
        <label key={cat.id}>
          <input
            type="checkbox"
            value={cat.id}
            id={`categorie-${cat.id}`}
            onChange={(e) => handleCheckboxChange(cat.id, e.target.checked)}
          />
          {cat.nom}
        </label>
      ))}
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

export default SearchFilters;
