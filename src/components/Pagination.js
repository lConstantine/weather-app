import React from 'react'

const Pagination = ({ forecastsPerPage, totalForecasts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalForecasts / forecastsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pageList">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a className="links" href="#!" onClick={(e) => {e.preventDefault(); paginate(number)}} >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination