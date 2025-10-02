// Note: This is a mock implementation for frontend development.
// In production, these API calls should be made from a secure backend server
// to protect your OpenAI API key.

const OPENAI_API_KEY = "YOU API KEY";

export interface OpenAIMessage {
  role: "user" | "assistant" | "system";
  content:
    | string
    | Array<{
        type: "text" | "image_url";
        text?: string;
        image_url?: {
          url: string;
        };
      }>;
}

export const analyzeImageWithOpenAI = async (
  base64Image: string,
  userMessage: string
): Promise<string> => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a helpful cooking assistant. You analyze images of food ingredients and suggest simple, tasty recipes. Be friendly, conversational, and enthusiastic about cooking. When suggesting recipes:

1. First identify the ingredients you can see in the image
2. Suggest 2-3 simple recipes using those ingredients
3. Keep recipes practical and not too complicated
4. Include brief cooking times and difficulty levels
5. Be encouraging and positive
6. Use emojis to make responses more engaging

If you can't clearly identify ingredients, ask the user to describe what ingredients they have.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: userMessage,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content ||
      "Sorry, I could not analyze your image. Please try again."
    );
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error(
      "Failed to analyze image. Please check your connection and try again."
    );
  }
};

export const chatWithOpenAI = async (
  message: string,
  conversationHistory: any[]
): Promise<string> => {
  try {
    const messages: OpenAIMessage[] = [
      {
        role: "system",
        content: `You are a helpful cooking assistant and recipe expert. You help users with:

1. Recipe suggestions and alternatives
2. Cooking techniques and tips
3. Ingredient substitutions
4. Cooking times and temperatures
5. Dietary modifications (vegetarian, vegan, gluten-free, etc.)
6. Kitchen tips and tricks

Be friendly, conversational, and enthusiastic about cooking. Keep responses helpful but concise. Use emojis to make responses engaging.

If a user asks for alternatives to a recipe, suggest different recipes using similar ingredients.
If they ask about cooking steps, provide clear, numbered instructions.
If they ask about timing, give realistic estimates.
Always be encouraging and positive about their cooking journey!`,
      },
    ];

    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach((msg) => {
      if (msg.type === "user") {
        messages.push({
          role: "user",
          content: msg.content,
        });
      } else if (msg.type === "bot") {
        messages.push({
          role: "assistant",
          content: msg.content,
        });
      }
    });

    messages.push({
      role: "user",
      content: message,
    });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content ||
      "Sorry, I could not process your message. Please try again."
    );
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error(
      "Failed to process your message. Please check your connection and try again."
    );
  }
};
