// src/logic/aiLogic.js

export async function getChatbotResponse(prompt, context = "") {
  try {
    const response = await fetch("/.netlify/functions/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, context }),
    });

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Hmm... I’m not sure!";

    return reply;
  } catch (err) {
    console.error("❌ Gemini Fetch Error:", err);
    return "Sorry, something went wrong!";
  }
}
