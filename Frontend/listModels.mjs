import axios from "axios";

const GEMINI_API_KEY = "AIzaSyDpBX18f4beujv57yBiFTwfzpCMrdtgXzU"; // replace with your actual key

async function listModels() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`
    );
    console.log("✅ Available models:\n");
    res.data.models.forEach((m) => console.log(m.name));
  } catch (error) {
    console.error("❌ Error listing models:");
    console.error(error.response?.data || error.message);
  }
}

listModels();
