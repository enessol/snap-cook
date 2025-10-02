<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# SnapCook - AI Recipe Assistant

This is a React TypeScript application that uses Material UI and OpenAI's GPT-4 Vision model to analyze food ingredient photos and suggest recipes.

## Key Features

- Image upload with drag & drop support
- OpenAI GPT-4 Vision integration for ingredient analysis
- Chat interface for recipe questions and alternatives
- Material UI components for modern, responsive design
- TypeScript for type safety

## Architecture

- `src/components/`: React components (SnapCookApp, ImageUpload, ChatInterface)
- `src/services/`: OpenAI API integration
- `src/types/`: TypeScript type definitions

## Development Guidelines

- Use functional components with React hooks
- Follow Material UI design patterns
- Maintain proper TypeScript typing
- Keep components modular and reusable
- Handle loading states and errors gracefully
