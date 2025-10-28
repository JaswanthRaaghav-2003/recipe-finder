import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatbotPanel from "../components/ChatBotPanel";
import { getChatbotResponse } from "../logic/ailogic";
import { MessageCircle } from "lucide-react";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [modified, setModified] = useState("");
  const [chatOpen, setChatOpen] = useState(false); // Chatbot open/close state

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const mealData = res.data.meals[0];
        setMeal(mealData);

        // Check if it's already a favorite
        const saved = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorite(saved.some((item) => item.idMeal === mealData.idMeal));
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };
    fetchMeal();
  }, [id]);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorite) {
      const updated = saved.filter((item) => item.idMeal !== meal.idMeal);
      localStorage.setItem("favorites", JSON.stringify(updated));
    } else {
      saved.push(meal);
      localStorage.setItem("favorites", JSON.stringify(saved));
    }
    setFavorite(!favorite);
  };

  const handleModify = async (type) => {
    if (!meal) return;
    const prompt =
      type === "simplify"
        ? `Simplify this recipe's instructions to be beginner-friendly:\n${meal.strInstructions}`
        : `Convert this recipe into a vegan-friendly version by replacing non-vegan ingredients:\n${meal.strInstructions}`;

    const aiReply = await getChatbotResponse(prompt);
    setModified(aiReply);
  };

  if (!meal)
    return (
      <div className="text-center mt-10 text-amber-600 text-lg font-semibold">
        Loading your delicious recipe...
      </div>
    );

  // Extract ingredients
  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key, idx) => `${meal[key]} - ${meal[`strMeasure${idx + 1}`]}`);

  return (
    <div className="relative flex flex-col md:flex-row">
      {/* Inline animation CSS */}
      <style>
        {`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0%);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        `}
      </style>

      {/* Main Content */}
      <div
        className={`flex-1 px-4 py-6 sm:px-8 max-w-3xl mx-auto transition-all duration-300 ${
          chatOpen ? "md:mr-[33%]" : ""
        }`}
      >
        {/* Title + Chat Icon */}
        <div className="flex items-center justify-center gap-3 mb-6 relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-600 text-center">
            🍽️ {meal.strMeal}
          </h1>

          {/* Chatbot Toggle Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-md transition transform hover:scale-110"
            title="Chat with AI Chef 🤖"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Meal Image */}
        <div className="flex justify-center mb-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="rounded-xl shadow-md w-full max-w-sm sm:max-w-md object-cover"
          />
        </div>

        {/* Ingredients */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-amber-600">
          🧂 Ingredients
        </h2>
        <ul className="list-disc pl-5 mb-6 text-gray-700 text-sm sm:text-base space-y-1">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {/* Instructions */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-amber-600">
          👩‍🍳 Instructions
        </h2>
        <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {meal.strInstructions}
        </p>

        {/* AI Modifier Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          <button
            onClick={() => handleModify("simplify")}
            className="bg-amber-500 text-white px-5 py-3 rounded-lg hover:bg-amber-600 transition"
          >
            ✨ Simplify Instructions using AI 
          </button>
          <button
            onClick={() => handleModify("vegan")}
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
          >
            🌱 Make it Vegan using AI
          </button>
        </div>

        {/* AI-Modified Output */}
        {modified && (
          <div className="bg-amber-50 p-4 rounded-lg shadow-inner">
            <h3 className="font-semibold text-amber-700 mb-2">
              🍳 AI Chef Suggestion:
            </h3>
            <p className="whitespace-pre-line text-gray-700">{modified}</p>
          </div>
        )}

        {/* Favorite Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleFavorite}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white text-sm sm:text-base font-medium shadow-md transition-transform transform hover:scale-105 ${
              favorite ? "bg-green-500" : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {favorite ? "💚 Saved to Favorites" : "⭐ Add to Favorites"}
          </button>
        </div>
      </div>

      {/* Floating Chatbot Panel */}
      {chatOpen && (
        <div className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-2xl border-l border-amber-200 z-50 transition-transform animate-slide-in">
          <ChatbotPanel context={meal.strInstructions} />
          <button
            onClick={() => setChatOpen(false)}
            className="absolute top-3 right-3 bg-amber-500 text-white p-2 rounded-full shadow hover:bg-amber-600"
            title="Close Chat"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
