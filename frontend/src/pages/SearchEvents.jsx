import { useEffect, useState } from "react";

// MATERIAL
import { Box, Pagination, Grid } from "@mui/material";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedCategories]);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEvents = filteredEvents.slice(startIndex, endIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="SearchEvents--global">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        margin={6}
      >
        <SearchFilters
          searchCat={searchCat}
          onSearch={setSearchText}
          onFilter={handleFilterChange}
          selectedCategories={selectedCategories}
        />
      </Box>
      <SearchResults events={displayedEvents} />
      <Grid container justifyContent="center">
        <Pagination
          shape="rounded"
          count={Math.ceil(filteredEvents.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          style={{ margin: "2rem" }}
        />
      </Grid>
    </div>
  );
}

export default SearchEvents;
