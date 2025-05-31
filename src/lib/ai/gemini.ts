import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GEMINI_API_KEY) {
  throw new Error("Missing env.GOOGLE_GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function generateCampaignIdeas(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating campaign ideas:", error);
    throw error;
  }
}

export async function analyzeCampaignPerformance(data: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(data);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error analyzing campaign performance:", error);
    throw error;
  }
}
