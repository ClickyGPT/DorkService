import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a dork using standard Flash model for speed.
 */
export const generateDorkFromPrompt = async (prompt: string, useThinking: boolean = false): Promise<string> => {
  try {
    const config: any = {
      maxOutputTokens: 200, // Reasonable limit for a single string
      temperature: 0.2,
    };

    if (useThinking) {
      // Use Pro model with max thinking budget for complex requests
      config.thinkingConfig = { thinkingBudget: 32768 };
      // maxOutputTokens is not set as per user requirement for thinking mode
      delete config.maxOutputTokens;
    }

    const response = await ai.models.generateContent({
      model: useThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
      contents: `You are an expert Security Researcher and Google Dorking specialist.
      Task: Translate the user's natural language request into a precise, advanced Google Dork search query.
      Rules:
      1. Output ONLY the raw dork string. Do not include markdown formatting, backticks, or explanations.
      2. Use advanced operators like site:, inurl:, intitle:, filetype:, etc. efficiently.
      
      User Request: ${prompt}`,
      config
    });

    return response.text?.trim() || '';
  } catch (error) {
    console.error("Error generating dork:", error);
    throw error;
  }
};

/**
 * Uses Flash Lite for ultra-fast suggestion generation.
 */
export const getDorkSuggestions = async (keyword: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `Suggest 5 relevant Google Dork keywords or refinements related to: "${keyword}". Return a simple JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const jsonStr = response.text;
    return jsonStr ? JSON.parse(jsonStr.trim()) : [];
  } catch (error) {
    console.error("Error getting suggestions:", error);
    return [];
  }
};

/**
 * Creates a chat session for the OSINT assistant using Pro for high intelligence.
 */
export const createChatSession = () => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'You are an elite OSINT and Google Dorking assistant. You help security researchers find exposed data responsibly. You provide clever search queries and explain how they work. Be concise, technical, and always mention ethical boundaries.',
    },
  });
};
