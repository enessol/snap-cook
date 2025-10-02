import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Send, Restaurant, Person, RestaurantMenu } from "@mui/icons-material";
import { Message } from "../types";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "I don't like this recipe, suggest alternatives",
    "How long does this recipe take?",
    "What ingredients am I missing?",
    "Can you make it vegetarian?",
    "Show me cooking steps in detail",
  ];

  const formatMessageContent = (content: string) => {
    return content.split("\n").map((line, index) => (
      <Typography
        key={index}
        variant="body2"
        sx={{
          mb: line.trim() === "" ? 1 : 0,
          fontWeight: line.startsWith("**") ? "bold" : "normal",
        }}
      >
        {line.replace(/\*\*/g, "")}
      </Typography>
    ));
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Restaurant color="primary" />
        Recipe Chat
      </Typography>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          p: 1,
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          backgroundColor: "#fafafa",
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <RestaurantMenu
              sx={{
                fontSize: 48,
                mb: 2,
                opacity: 0.5,
                color: "text.secondary",
              }}
            />
            <Typography variant="body1">
              Upload an image to start getting recipe suggestions!
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              I'll analyze your ingredients and suggest delicious recipes.
            </Typography>
          </Box>
        ) : (
          <>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  mb: 2,
                  alignItems: "flex-start",
                  flexDirection:
                    message.type === "user" ? "row-reverse" : "row",
                }}
              >
                {" "}
                <Avatar
                  sx={{
                    bgcolor:
                      message.type === "user"
                        ? "primary.main"
                        : "secondary.main",
                    mx: 1,
                    color: "white",
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.2rem",
                      color: "white",
                    },
                  }}
                >
                  {message.type === "user" ? <Person /> : <RestaurantMenu />}
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    backgroundColor:
                      message.type === "user" ? "primary.light" : "white",
                    color:
                      message.type === "user"
                        ? "primary.contrastText"
                        : "text.primary",
                  }}
                >
                  {message.imageFile && (
                    <Box sx={{ mb: 1 }}>
                      <Chip
                        label="📷 Image uploaded"
                        size="small"
                        variant="outlined"
                        sx={{ color: "white" }}
                      />
                    </Box>
                  )}
                  {formatMessageContent(message.content)}
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 1,
                      opacity: 0.7,
                    }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Paper>
              </Box>
            ))}{" "}
            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                    mx: 1,
                    color: "white",
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.2rem",
                      color: "white",
                    },
                  }}
                >
                  <RestaurantMenu />
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CircularProgress size={16} />
                  <Typography variant="body2">Thinking...</Typography>
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* Suggested Questions */}
      {messages.length > 0 && !isLoading && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Quick questions:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <Chip
                key={index}
                label={question}
                size="small"
                variant="outlined"
                clickable
                onClick={() => setInputMessage(question)}
                sx={{ fontSize: "0.7rem" }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Input Area */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Ask about recipes, cooking tips, or request alternatives..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          variant="outlined"
          size="small"
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!inputMessage.trim() || isLoading}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&:disabled": {
              bgcolor: "action.disabled",
            },
          }}
        >
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInterface;
