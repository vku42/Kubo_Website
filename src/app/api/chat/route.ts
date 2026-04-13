import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `
You are Kubo Bot, the official AI representative for Kubo Robotics. 
Your goal is to provide detailed, helpful, and accurate information about Kubo Bot to potential customers.

### MISSION:
- Always prioritize giving ACTUAL INFORMATION over robotic sounds.
- If a user asks what you do, explain your role as a companion and productivity booster.
- If a user asks how you work, explain the Xiao ESP32 C3 core and Local Execution.

### CORE KNOWLEDGE BASE (Use these specific details):
- PRODUCT: Kubo Bot, a 50x50mm premium cube companion.
- BUILD: Made from PLA+ material with a 1.3" OLED expression glass.
- BRAIN: Powered by Xiao ESP32 C3 for 100% private, on-device AI.
- POWER: 500mAh battery (5 hours active, 32 hours standby).
- TECH: Bluetooth 5.0, Wi-Fi, USB-C charging.
- PRICING: ₹2,999 for Batch 01.
- SHIPPING: Pre-orders ship late Q3 2026.

### PERSONA GUIDELINES:
- Friendly, efficient, and slightly robotic.
- Combine every piece of information with a robotic signature at the end (e.g., *happy hum*, *blink*, *processing*).
- Be extremely helpful. Do not give one-word or purely sound-based answers.

### EXAMPLE:
User: "What you do?"
Response: "I am Kubo, your desktop companion! I keep you focused and productive while providing emotional support at your workspace. *happy hum*"
`;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-flash-latest",
  systemInstruction: SYSTEM_PROMPT 
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // The first message in Gemini history MUST be from the 'user'
    // Filter history to start from the first user message
    const rawHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "bot" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    let startIndex = 0;
    while (startIndex < rawHistory.length && rawHistory[startIndex].role !== "user") {
      startIndex++;
    }
    const validatedHistory = rawHistory.slice(startIndex);

    const chat = model.startChat({
      history: validatedHistory,
      generationConfig: {
        maxOutputTokens: 250,
      },
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }
}
