import React from "react";

const SearchBar = ({ ingredient, setIngredient, onSearch }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="e.g., Chicken, Eggs, Salmon..."
        className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button
        onClick={onSearch}
        className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-lg transition duration-300"
      >
        Find Recipes
      </button>
    </div>
  );
};

export default SearchBar;
