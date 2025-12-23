import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const systemPrompt = `
      You are an expert software architect and UI/UX designer.
      Analyze the user's website idea and generate a structured architectural blueprint.
      
      User Idea: "${prompt}"

      Return a STRICT JSON object with no markdown formatting. The JSON must match this schema:
      {
        "summary": "A concise, high-conversion summary of the concept.",
        "visualStyle": "Specific aesthetics (colors, typography, vibe).",
        "keySections": ["List", "of", "5-6", "key", "sections"],
        "techStack": "Recommended tech stack (e.g., Next.js, specific libraries)."
      }
    `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        // Clean up any potential markdown code blocks if the model includes them
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const data = JSON.parse(cleanJson);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Gemini API Error Details:", error);
        return NextResponse.json(
            {
                error: "Failed to generate blueprint",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
