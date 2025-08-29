import React from "react";
import searchIcon from "../assets/search.svg"; // make sure this path is correct

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search w-full max-w-xl mx-auto">
      <div className="relative w-full">
        {/* Search icon */}
        <img
          src={searchIcon}
          alt="search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
        />

        {/* Input field */}
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Search;
