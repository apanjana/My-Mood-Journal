import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Use GOOGLE_API_KEY as a standard fallback for the SDK
const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY; 
if (!apiKey) {
    throw new Error("❌ No AI API key set in environment (.env). Add AI_API_KEY, GEMINI_API_KEY, or GOOGLE_API_KEY.");
}

// 1. Initialize the client
const ai = new GoogleGenAI({ apiKey });
const modelName = "gemini-2.5-flash"; 

/**
 * Calls Gemini and returns a short poem (funny or roasting) based on the input text.
 * @param {string} text - The journal entry text.
 * @returns {Promise<{mood: string, suggestion: string}>} Returns the AI output wrapped in a basic mood/suggestion structure.
 */
export async function analyzeMood(text) {
    
    // --- Define the prompt instruction here ---
    const userPrompt = `You are a brutally honest, sarcastic, and dark-humoured comedian. Your task is to read the user's journal entry: "${text}". Deliver a single, short (2-3 sentence maximum) and merciless roast that targets the core theme or triviality of the entry. Be funny. Be savage. Do not use any filler phrases or self-reference.`;
    // ------------------------------------------

    try {
        // Since we are now asking for a poem (plain text), we will remove the JSON schema constraint
        // and rely on the model to return raw text.

        const response = await ai.models.generateContent({ 
            model: modelName, 
            contents: [
                {
                    role: "user",
                    parts: [{
                        text: userPrompt,
                    }],
                },
            ],
            // Removed 'config' block to allow raw text/poem output
        });

        // The response property is likely 'text' (not a function)
        const poemText = response.text; 
        
        // Since the rest of your backend expects { mood, suggestion }, we need to wrap the poem 
        // in that DTO structure so your JournalController doesn't crash on JSON parsing.
        return {
            mood: "Roasted",
            suggestion: poemText 
        };

    } catch (err) {
        // Log the full error for debugging
        console.error("Gemini API error:", err);
        return { mood: "Error", suggestion: "Could not reach AI service." };
    }
}