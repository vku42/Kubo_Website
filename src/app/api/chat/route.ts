import { GoogleGenerativeAI } from "@google/generative-ai";
import { KUBO_SYSTEM_PROMPT } from "@/lib/kubo-knowledge";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || ""
);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: KUBO_SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.75,
        maxOutputTokens: 500,
      },
    });

    // Build validated chat history (all except the last user message)
    const rawHistory = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "bot" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Gemini requires history to start with a 'user' turn
    let startIndex = 0;
    while (startIndex < rawHistory.length && rawHistory[startIndex].role !== "user") {
      startIndex++;
    }
    const validatedHistory = rawHistory.slice(startIndex);

    const lastMessage = messages[messages.length - 1];
    const chat = model.startChat({ history: validatedHistory });

    // Stream the response
    const result = await chat.sendMessageStream(lastMessage.content);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
