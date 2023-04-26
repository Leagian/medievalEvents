import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function SearchFilters({ onSearch, searchCat, onFilter }) {
  const [searchText, setSearchText] = useState("");
  const [checkedCategories, setCheckedCategories] = useState([]);

  const handleSearch = ({ target }) => {
    setSearchText(target.value);
    onSearch(target.value);
  };

  const handleCheckboxChange = (categoryId, isChecked) => {
    setCheckedCategories((prev) => {
      if (isChecked) {
        return [...prev, categoryId];
      }
      return prev.filter((id) => id !== categoryId);
    });
  };

  useEffect(() => {
    onFilter(checkedCategories);
  }, [checkedCategories, onFilter]);

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
  onSearch: PropTypes.func.isRequired,
  searchCat: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nom: PropTypes.string.isRequired,
      filterKey: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default SearchFilters;
