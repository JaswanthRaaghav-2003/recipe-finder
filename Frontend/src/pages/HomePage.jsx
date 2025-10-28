import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchRecipes = async () => {
    if (!ingredient.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      setMeals(res.data.meals || []);
    } catch (error) {
      console.error(error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4 leading-snug">
          Welcome home, Taylor! What's in the fridge?
        </h1>
        <p className="text-gray-700 mb-6 text-base md:text-lg">
          Let’s find something delicious to cook tonight. Just enter the main
          ingredient you have on hand — like “chicken,” “salmon,” or “broccoli” —
          and we’ll find recipes for you in seconds.
        </p>

        <SearchBar
          ingredient={ingredient}
          setIngredient={setIngredient}
          onSearch={fetchRecipes}
        />

        {/* ✨ Extra descriptive section */}
        <div className="mt-10 text-gray-700 text-sm md:text-base leading-relaxed px-2">
          <p className="mb-3">
            As a busy professional, Taylor doesn’t always have time to plan meals. 
            This app takes the stress out of deciding what to cook. Just type what’s 
            available in your fridge, and we’ll instantly serve up mouthwatering 
            recipe ideas that match your ingredients.
          </p>
          <p className="mb-3">
            Whether you have only 15 minutes or an hour, you’ll find simple, step-by-step 
            meal ideas that fit your schedule and taste. From quick snacks to hearty dinners, 
            your next favorite recipe is just one search away.
          </p>
          <p className="mb-3">
            Add recipes you love to your <span className="text-amber-700 font-medium">Favorites</span> 
            for easy access later. No more scrolling through endless websites — your personal cookbook 
            is right here, ready whenever you are.
          </p>
        </div>
      </div>

      {/* Loading / No Results / Recipes */}
      {loading && <LoadingSpinner />}

      {!loading && searched && meals.length === 0 && (
        <p className="text-red-500 mt-8 text-center px-4">
          No recipes found. We couldn't find any meals with that ingredient.
          Please try a different search.
        </p>
      )}

      {!loading && meals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-5xl px-2">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
