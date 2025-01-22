import { GoogleGenerativeAI } from "@google/generative-ai";
import { CohereClient } from "cohere-ai";
import * as fs from 'fs/promises';
import path from 'path';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

interface EmbeddingData {
  id: number;
  text: string;
  embed: number[];
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Initialize clients once
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

// Load embeddings once
let embeddings: EmbeddingData[] | null = null;
const loadEmbeddings = async () => {
  if (!embeddings) {
    const embeddingsPath = path.join(process.cwd(), 'pythontest', 'embeddings.json');
    const embeddingsFile = await fs.readFile(embeddingsPath, 'utf-8');
    embeddings = JSON.parse(embeddingsFile);
  }
  return embeddings;
};

export async function POST(request: Request) {
  try {
    const { messages, userMessage }: { messages: ChatMessage[]; userMessage: string } = await request.json();
    
    // Get embedding for user message
    const userEmbedding = await cohere.embed({
      texts: [userMessage],
      model: "embed-english-v3.0",
      inputType: "classification",
    }) as { embeddings: number[][] };

    // Get cached embeddings
    const embeddingsData = await loadEmbeddings();
    if (!embeddingsData) {
      throw new Error("Failed to load embeddings data");
    }

    // Calculate similarities and get top 5
    const similarities = embeddingsData.map(embed => ({
      ...embed,
      similarity: cosineSimilarity(userEmbedding.embeddings[0], embed.embed)
    }));
    
    const top5 = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);
    // Combine relevant context
    const context = top5.map(item => item.text).join('\n');
    console.log("most similar:"+context)
    const promptWithContext = `Context:\n${context}\n\nQuestion: ${userMessage}`;

    // Filter out the initial greeting message and only send user-assistant pairs
    const chatHistory = messages.slice(1).map((msg: ChatMessage) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(promptWithContext);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return Response.json({ text });
  } catch (error) {
    console.error('Chat error:', error);
    return Response.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}