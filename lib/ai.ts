import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
})

export async function getAIRecommendations(userQuery: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a fashion shopping assistant. 

User is looking for: "${userQuery}"

Suggest 5 specific clothing items they should search for. 
For each item, give:
- Product name
- Why it matches what they want
- Approximate price range

Keep it short and helpful.`
  })
  
  return response.text
}