import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for anything..."
        className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
