import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Generate style advice based on user query and filters
export async function getStyleRecommendation(
  userQuery: string,
  filters: any
): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a professional fashion stylist. 

User is looking for: "${userQuery}"

Their preferences:
- Gender: ${filters?.gender || "any"}
- Size: ${filters?.size || "any"}
- Budget: $${filters?.priceMin || 0} - $${filters?.priceMax || 500}
- Ethical shopping: ${
      filters?.ethical
        ? "Yes, they prefer sustainable/ethical brands"
        : "Not specified"
    }

Provide a brief, stylish recommendation (2-3 sentences) about what they should look for. 
Be specific about styles, colors, fabrics, or occasions. 
Start with "You should opt for..." or "Consider..." or "I'd recommend..."

Keep it concise, friendly, and helpful.`,
  });

  return response.text || "";
}

export async function getAIRecommendations(userQuery: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a fashion shopping assistant. 

User is looking for: "${userQuery}"

Suggest 5 specific clothing items they should search for. 
For each item, give:
- Product name
- Why it matches what they want
- Approximate price range

Keep it short and helpful.`,
  });

  return response.text || ""; 
}