import axios from "axios";

const GEMINI_API_KEY = "AIzaSyDpBX18f4beujv57yBiFTwfzpCMrdtgXzU"; // 🔑 Paste your key here

async function testGemini() {
  try {
    const prompt = "Give me a short recipe for chocolate milkshake.";

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    console.log("✅ Gemini API Response:");
    console.log(response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("❌ Error testing Gemini key:");
    console.error(error.response?.data || error.message);
  }
}

testGemini();
