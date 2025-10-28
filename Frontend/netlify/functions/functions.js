// netlify/functions/gemini.js


export async function handler(event) {
  try {
    const { prompt, context } = JSON.parse(event.body);

    const fullPrompt = `
      You are an AI recipe assistant.
      Context: ${context}
      User Question: ${prompt}
      Reply in a friendly and concise way.
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
