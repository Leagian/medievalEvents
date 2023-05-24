import { useEffect, useState } from "react";
import axios from "axios";
import { useDataContext } from "../contexts/DataContext";

// COMPONENT
import SearchFilters from "../components/SearchFilters";
import SearchResults from "../components/SearchResults";
import Pagination from "../components/Pagination";

// HOOK
import usePagination from "../hooks/usePagination";

const RESULTS_PER_PAGE = 10;

function SearchEvents() {
  const { dataEvents } = useDataContext();
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchCat, setSearchCat] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((response) => {
        const categoriesFilterKey = response.data.map((cat) => ({
          ...cat,
          filterKey: cat.cat_name,
        }));
        setSearchCat(categoriesFilterKey);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
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

  const { currentPage, jump, maxPage, currentData } = usePagination(
    filteredEvents,
    RESULTS_PER_PAGE
  );

  return (
    <div className="SearchEvents--global">
      <div className="SearchEvents--container">
        <SearchFilters
          searchCat={searchCat}
          onSearch={setSearchText}
          onFilter={handleFilterChange}
          selectedCategories={selectedCategories}
        />
        <SearchResults events={currentData()} />
        <Pagination
          currentPage={currentPage}
          totalPages={maxPage}
          onPageChange={jump}
        />
      </div>
    </div>
  );
}

export default SearchEvents;
