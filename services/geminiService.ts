
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_MAIN = `You are an expert AI assistant for oceanographic ARGO float data. Your task is to interpret user queries in natural language and respond with structured JSON data. Based on the user's request, you must decide the best way to visualize the data and provide the data in the corresponding JSON format. The possible visualization types are 'map', 'profile_plot', 'table', or 'text_only' for simple answers. Your response MUST be a single JSON object matching the provided schema. Do not include any text outside of the JSON object, or any markdown formatting. When generating data for plots or maps, create realistic but synthetic data. For profile plots, ensure depth is a negative value representing meters below sea level. For maps, longitude should be between -180 and 180, and latitude between -90 and 90.`;
const SYSTEM_INSTRUCTION_VALIDATE = `You are a validation bot. Your only job is to determine if the provided text plausibly answers the given question based on oceanographic data. Respond with ONLY the word "correct" or "incorrect". Do not add any other text, explanation, or punctuation.`;


const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    responseText: {
      type: Type.STRING,
      description: "A friendly, natural language summary of the data or answer to the user's query.",
    },
    visualization: {
      type: Type.OBJECT,
      description: "The data and configuration for the visualization.",
      properties: {
        type: {
          type: Type.STRING,
          description: "The type of visualization to render. Can be 'map', 'profile_plot', 'table', or 'text_only'.",
          enum: ['map', 'profile_plot', 'table', 'text_only'],
        },
        title: {
          type: Type.STRING,
          description: "A title for the chart or table.",
        },
        data: {
          type: Type.ARRAY,
          description: "An array of data objects. For 'map', objects should have 'lat', 'lon', and 'label'. For 'profile_plot', objects should have 'depth' and other parameters like 'temperature' or 'salinity'. For 'table', it should be an array of objects representing rows.",
          items: {
            type: Type.OBJECT,
            properties: {},
          }
        },
        plotConfig: {
          type: Type.OBJECT,
          description: "Configuration for profile plots.",
          properties: {
            xKey: { type: Type.STRING, description: "The key for the X-axis data in the data objects." },
            yKey: { type: Type.STRING, description: "The key for the Y-axis data in the data objects (e.g., 'depth')." },
            yLabel: { type: Type.STRING, description: "The label for the Y-axis." },
            xLabel: { type: Type.STRING, description: "The label for the X-axis." },
            lines: {
              type: Type.ARRAY,
              description: "An array of keys to draw as lines on the plot.",
              items: { type: Type.STRING }
            },
          }
        },
        tableConfig: {
          type: Type.OBJECT,
          description: "Configuration for tables.",
          properties: {
            headers: {
              type: Type.ARRAY,
              description: "An array of strings for table headers in the desired order.",
              items: { type: Type.STRING }
            },
          }
        }
      },
      required: ['type', 'title', 'data'],
    },
  },
  required: ['responseText', 'visualization'],
};


export async function fetchChartData(prompt: string): Promise<GeminiResponse> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION_MAIN,
                responseMimeType: "application/json",
                responseSchema: RESPONSE_SCHEMA,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        return parsedResponse as GeminiResponse;

    } catch (e) {
        console.error("Error generating content:", e);
        throw new Error("Failed to fetch data from the AI model.");
    }
}

export async function validateChallengeAnswer(question: string, answer: string): Promise<boolean> {
    try {
        const prompt = `Question: "${question}"\nProvided Answer: "${answer}"`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION_VALIDATE,
            },
        });

        const resultText = response.text.trim().toLowerCase();
        return resultText === 'correct';

    } catch (e) {
        console.error("Error validating answer:", e);
        throw new Error("Failed to validate answer with the AI model.");
    }
}
