const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded for testing since this is a local scratch script
const API_KEY = "AIzaSyDU4w9AuwH0LBZdtcXYLLz9N6a7EDaQ2KU";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    const result = await genAI.listModels();
    console.log("Available Models:");
    result.models.forEach((m) => {
      console.log(`- ${m.name} (Methods: ${m.supportedGenerationMethods.join(", ")})`);
    });
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
