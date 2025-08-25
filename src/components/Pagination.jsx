import React from "react";

const Pagination = ({ page, setPage, totalPages = 10 }) => {
  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page > 2) pages.push(1); // أول صفحة
      if (page > 3) pages.push("...");

      for (let i = page - 1; i <= page + 1; i++) {
        if (i > 0 && i <= totalPages) pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");
      if (page < totalPages - 1) pages.push(totalPages); // آخر صفحة
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center gap-2 mt-4">
        {/* Previous */}
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link rounded-circle shadow-sm border-0"
            style={{ width: "40px", height: "40px" }}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            ‹
          </button>
        </li>

        {/* Pages */}
        {getPages().map((p, idx) => (
          <li
            key={idx}
            className={`page-item ${p === page ? "active" : ""}`}
          >
            {p === "..." ? (
              <span
                className="page-link border-0 bg-transparent text-muted"
                style={{ pointerEvents: "none" }}
              >
                ...
              </span>
            ) : (
              <button
                className={`page-link rounded-circle shadow-sm ${
                  p === page ? "bg-warning text-dark fw-bold" : "bg-light"
                } border-0`}
                style={{ width: "40px", height: "40px" }}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link rounded-circle shadow-sm border-0"
            style={{ width: "40px", height: "40px" }}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
