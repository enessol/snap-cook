import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  IconButton,
  Alert,
} from "@mui/material";
import { CloudUpload, PhotoCamera, Delete } from "@mui/icons-material";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const validateAndSetImage = (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      onImageSelect(selectedImage);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <PhotoCamera color="primary" />
        Upload Ingredients Photo
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: "none" }}
      />

      {!selectedImage ? (
        <Box
          sx={{
            flexGrow: 1,
            border: "2px dashed #ccc",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            cursor: "pointer",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleButtonClick}
        >
          <CloudUpload sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drop your image here or click to browse
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Upload a photo of your ingredients and I'll suggest delicious
            recipes!
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Supports JPG, PNG, GIF up to 10MB
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Card sx={{ position: "relative", mb: 2 }}>
            <CardMedia
              component="img"
              sx={{
                height: 350,
                objectFit: "cover",
              }}
              image={imagePreview || ""}
              alt="Selected ingredients"
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
              onClick={handleRemoveImage}
            >
              <Delete />
            </IconButton>
          </Card>

          <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleAnalyze}
              sx={{ flexGrow: 1 }}
            >
              Analyze & Get Recipes 🔍
            </Button>
            <Button variant="outlined" onClick={handleButtonClick}>
              Change Image
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
