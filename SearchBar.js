import React, { useState } from 'react';

const SearchBar = ({ setSearchTerm, searchCustomers }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        setSearchTerm(inputValue);
        searchCustomers();
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by name or location"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
