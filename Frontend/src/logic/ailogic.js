// src/logic/aiLogic.js
import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getChatbotResponse(prompt, context = "") {
  try {
    const fullPrompt = `
      You are an AI recipe assistant.
      Context: ${context}
      User Question: ${prompt}
      Reply in a friendly and concise way.
    `;

    // ✅ Use the working Gemini 2.x endpoint
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: fullPrompt }] }],
      }
    );

    // Extract AI reply safely
    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Hmm... I’m not sure!";

    return reply;
  } catch (err) {
    console.error("❌ Gemini Error:", err.response?.data || err.message);
    return "Sorry, something went wrong!";
  }
}
