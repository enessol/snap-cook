export interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  imageFile?: File;
  timestamp: Date;
}

export interface OpenAIResponse {
  response: string;
  error?: string;
}
