import React, { useState } from "react";
import { Box, Paper, Grid } from "@mui/material";
import { Message } from "../types";
import {
  analyzeImageWithOpenAI,
  chatWithOpenAI,
} from "../services/openaiService";
import ChatInterface from "./ChatInterface";
import ImageUpload from "./ImageUpload";

const SnapCookApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageAnalysis = (imageFile: File) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content:
        "Please analyze this image and suggest recipes with these ingredients.",
      imageFile,
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);

    analyzeImageAndGetRecipes(imageFile);
  };

  const analyzeImageAndGetRecipes = async (imageFile: File) => {
    try {
      const base64Image = await convertToBase64(imageFile);

      const response = await analyzeImageWithOpenAI(
        base64Image,
        "Please analyze the ingredients in this image and suggest 2-3 simple and tasty recipes using these ingredients. Be friendly and conversational in your response."
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev: Message[]) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error analyzing image:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I had trouble analyzing your image. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);

    try {
      const response = await chatWithOpenAI(content, messages);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev: Message[]) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "Sorry, I had trouble processing your message. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "500px" }}>
            <ImageUpload onImageSelect={handleImageAnalysis} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "500px" }}>
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SnapCookApp;
