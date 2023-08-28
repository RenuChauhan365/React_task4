function Pagination({ currentPage, setCurrentPage, itemsPerPage, totalItems }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (

    <ul className="pagination">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(page)}>
            {page}
          </button>

        </li>
      ))}
    </ul>
  );
}

export default Pagination