import React, { useState } from 'react';
import '../Styles/Navbar.css';

const Search = ({ searchTerm, setSearchTerm }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(searchValue);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      <button className="search-button" type="submit">SEARCH</button>
    </form>
  );
};

export default Search;
