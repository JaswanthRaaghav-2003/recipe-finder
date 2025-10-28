import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ meal }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-3 text-center">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="rounded-lg w-full h-48 object-cover"
      />
      <h3 className="text-lg font-semibold mt-2">{meal.strMeal}</h3>
      <Link
        to={`/recipe/${meal.idMeal}`}
        className="inline-block mt-3 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
      >
        View Recipe
      </Link>
    </div>
  );
};

export default RecipeCard;
