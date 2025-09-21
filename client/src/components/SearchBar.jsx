import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/widgetSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.widgets.searchTerm);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
};

export default SearchBar;