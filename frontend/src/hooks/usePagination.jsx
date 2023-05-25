import { useState, useEffect } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Math.ceil(data.length / itemsPerPage));
  const [currentData, setCurrentData] = useState(data.slice(0, itemsPerPage));

  useEffect(() => {
    setMaxPage(Math.ceil(data.length / itemsPerPage));
    setCurrentData(
      data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );
  }, [data, currentPage, itemsPerPage]);

  function next() {
    setCurrentPage((oldPage) => Math.min(oldPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export default usePagination;
