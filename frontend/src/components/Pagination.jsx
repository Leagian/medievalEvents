import PropTypes from "prop-types";
import { useEffect } from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Fait remonter la page après chaque mise à jour de la pagination
  }, [currentPage]);

  const renderPaginationLinks = () => {
    return new Array(totalPages).fill(undefined).map((_, i) => {
      const pageNumber = i + 1;
      return (
        <button
          type="submit"
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return <div className="Pagination">{renderPaginationLinks()}</div>;
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
