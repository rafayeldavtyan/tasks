import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
}) => {
  const start = (Number(currentPage) - 1) * Number(resultsPerPage) + 1;
  const end = Math.min(Number(currentPage) * Number(resultsPerPage), Number(totalResults));
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getPageRange = () => {
    const range: (number | string)[] = [];
    const visibleRange = 3;
    const current = Number(currentPage);
    const total = Number(totalPages);

    for (let i = Math.max(current - visibleRange, 1); i <= Math.min(current + visibleRange, total); i++) {
      range.push(i);
    }

    if (+range[0] > 1) range.unshift('...');
    if (+range[range.length - 1] < total) range.push('...');

    return range;
  };

  return (
    <div className="flex items-center my-4 justify-between w-full">
      <div className="text-15 text-body">
        Showing <span className="font-medium text-black">{start}</span> to{' '}
        <span className="font-medium text-black">{end}</span> of{' '}
        <span className="font-medium text-black">{totalResults}</span> tasks
      </div>

      <div className="flex justify-center space-x-2">
        {getPageRange().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-body">...</span>
            ) : (
              <button
                onClick={() => onPageChange(Number(page))}
                className={`px-3 py-1 rounded-4 transition-all border border-stroke shadow-default text-15 font-medium
                  ${page === currentPage ? 'bg-gray-700 text-white' : 'bg-gray text-black'}`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Pagination;