import { useEffect, useState } from "react";

// CONTEXT
import { useDataContext } from "../contexts/DataContext";

// SERVICE
import categoryAPI from "../services/categoryAPI";

// COMPONENT
import SearchFilters from "../components/SearchFilters";
import SearchResults from "../components/SearchResults";

function SearchEvents() {
  const { dataEvents } = useDataContext();
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchCat, setSearchCat] = useState([]);

  useEffect(() => {
    const fetchDataAPI = async () => {
      const categoriesAPI = await categoryAPI();
      const categoriesFilterKey = categoriesAPI.map((cat) => ({
        ...cat,
        filterKey: cat.cat_name,
      }));
      setSearchCat(categoriesFilterKey);
    };

    fetchDataAPI();
  }, []);

  const handleFilterChange = (newSelectedCategories) => {
    setSelectedCategories(newSelectedCategories);
  };

  const filteredEvents = dataEvents.filter((event) => {
    const isInSelectedCategories =
      selectedCategories.length > 0
        ? selectedCategories.includes(event.category_id)
        : true;

    const isInSearchText = searchText
      ? event.title.toLowerCase().includes(searchText.toLowerCase())
      : true;

    return isInSelectedCategories && isInSearchText;
  });

  return (
    <div className="SearchEvents--global">
      <div className="SearchEvents--container">
        <SearchFilters
          searchCat={searchCat}
          onSearch={setSearchText}
          onFilter={handleFilterChange}
          selectedCategories={selectedCategories}
        />
        <SearchResults events={filteredEvents} />
      </div>
    </div>
  );
}

export default SearchEvents;
