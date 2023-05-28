import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { Pagination, Grid } from "@mui/material";

function CustomPagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
    <Grid container justifyContent="center">
      <Pagination
        shape="rounded"
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        style={{ margin: "2rem" }}
      />
    </Grid>
  );
}

CustomPagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
