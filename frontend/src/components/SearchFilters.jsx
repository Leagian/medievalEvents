import { useState } from "react";
import PropTypes from "prop-types";

// MATERIAL
import { TextField, Checkbox, FormControlLabel } from "@mui/material";

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
      <TextField
        label="Rechercher"
        type="text"
        value={searchText}
        onChange={handleSearch}
        variant="standard"
        fullWidth
        sx={{
          display: "block",
          maxWidth: "30%",
          marginBottom: "3rem",
          marginLeft: "6rem",
        }}
      />
      {searchCat.map((cat) => (
        <FormControlLabel
          key={cat.id}
          control={
            <Checkbox
              onChange={() => handleCheckboxChange(cat.id)}
              color="default"
              sx={{ marginBottom: "5px", marginLeft: "6rem" }}
            />
          }
          label={cat.cat_name}
        />
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
