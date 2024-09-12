import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, setCurrentPage, scrollTop }) => {
  const maxPageNumbersToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <div
        key={i}
        onClick={() => {
          setCurrentPage(i);
          window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }}
        className={`Pagination-frame ${currentPage === i ? 'active' : ''}`}
      >
        <div className="Pagination-text-wrapper">{i}</div>
      </div>
    );
  }

  return (
    <div className="Pagination-frame-2">
      {totalPages > 5 && currentPage > 1 && (
        <div
          className="Pagination-text-wrapper-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          style={{ visibility: currentPage > 1 ? 'visible' : 'hidden' }}
        >
          이전
        </div>
      )}
      {pages}
      {totalPages > 5 && currentPage < totalPages && (
        <div
          className="Pagination-text-wrapper-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{ visibility: currentPage < totalPages ? 'visible' : 'hidden' }}
        >
          다음
        </div>
      )}
    </div>
  );
};

export default Pagination;