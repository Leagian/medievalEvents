import { useState } from "react";
import PropTypes from "prop-types";

function SearchFilters({ onSearch, searchCat, onFilter }) {
  const [searchText, setSearchText] = useState(""); // stock le texte de recherche

  // Gère les changements de texte de recherche
  const handleSearch = ({ target }) => {
    setSearchText(target.value);
    onSearch(target.value);
  };

  // Gère les changements d'état des cases à cocher
  const handleCheckboxChange = (categoryId) => {
    onFilter((prevSelectedCategories) => {
      const newSelectedCategories = prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId];

      return newSelectedCategories;
    });
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
            onChange={() => handleCheckboxChange(cat.id)}
          />
          {cat.cat_name}
        </label>
      ))}
    </div>
  );
}

SearchFilters.propTypes = {
  searchCat: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cat_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default SearchFilters;
