import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-amber-50 to-amber-100 px-4 py-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4">
          ⭐ My Saved Recipes
        </h1>
        <p className="text-gray-700 mb-8 text-sm md:text-base">
          Here’s your cozy collection of mouthwatering dishes you’ve saved 🍲.
          When you’re not sure what to cook, just return here and pick something
          you love — your favorites never go out of style! ❤️
        </p>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 mx-auto max-w-md text-gray-600">
            <p className="text-lg mb-3">🍽️ Your plate’s still empty!</p>
            <p>
              You don’t have any saved recipes yet. When you find a meal you
              like, tap the{" "}
              <span className="text-amber-600 font-medium">
                “Add to Favorites”
              </span>{" "}
              button on its recipe page. All your saved meals will appear here,
              ready for you to cook anytime! 👩‍🍳
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {favorites.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-3 text-center hover:scale-[1.02]"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="rounded-lg w-full h-48 object-cover"
                />
                <h3 className="text-lg font-semibold mt-3 text-gray-800">
                  {meal.strMeal}
                </h3>
                <Link
                  to={`/recipe/${meal.idMeal}`}
                  className="inline-block mt-4 bg-amber-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                >
                  🍴 View Recipe
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* ✨ Extra closing message */}
        {favorites.length > 0 && (
          <div className="mt-10 text-gray-600 text-sm md:text-base leading-relaxed">
            <p>
              🌟 Keep exploring new flavors and don’t forget to add more to your
              favorites. Soon you’ll have your very own personal cookbook right
              here — easy to browse, delicious to cook, and made just for you,
              Taylor! 👨‍🍳
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
