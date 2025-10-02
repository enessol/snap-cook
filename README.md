# SnapCook - AI Recipe Assistant 🥘

A modern React TypeScript application that analyzes photos of food ingredients using AI and suggests personalized recipes.

## Features

- **🖼️ Image Upload**: Drag & drop or click to upload ingredient photos
- **🤖 AI Analysis**: Uses OpenAI's GPT-4 Vision model to identify ingredients
- **💬 Interactive Chat**: Ask questions about recipes, cooking times, alternatives
- **📱 Responsive Design**: Built with Material UI for all screen sizes
- **⚡ Real-time Suggestions**: Get instant recipe recommendations

## How It Works

1. **Upload Image**: Take a photo of your ingredients or upload an existing image
2. **AI Analysis**: GPT-4 Vision analyzes the image and identifies ingredients
3. **Recipe Suggestions**: Get 2-3 simple, tasty recipe recommendations
4. **Interactive Chat**: Ask follow-up questions:
   - "I don't like this recipe, suggest alternatives"
   - "How long does this recipe take?"
   - "What ingredients am I missing?"
   - "Can you make it vegetarian?"
   - "Show me detailed cooking steps"

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material UI (MUI)
- **Build Tool**: Vite
- **AI Integration**: OpenAI GPT-4 Vision & GPT-4
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd snap-cook
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── SnapCookApp.tsx      # Main app component
│   ├── ImageUpload.tsx      # Image upload interface
│   └── ChatInterface.tsx    # Chat UI component
├── services/
│   └── openaiService.ts     # OpenAI API integration
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # App wrapper with theme
└── main.tsx               # React app entry point
```

## Configuration

The OpenAI API key is currently included in the code for demo purposes. In production, you should:

1. Move the API key to environment variables
2. Create a backend API to securely handle OpenAI requests
3. Never expose your API key in frontend code

## Features in Detail

### Image Upload Component

- Drag & drop support
- File validation (size, type)
- Image preview
- Error handling

### Chat Interface

- Real-time messaging
- Message history
- Loading indicators
- Suggested quick questions
- Responsive design

### AI Integration

- GPT-4 Vision for image analysis
- GPT-4 for conversational chat
- Context-aware responses
- Cooking-focused prompts

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding Features

1. **New Components**: Add to `src/components/`
2. **API Services**: Add to `src/services/`
3. **Types**: Define in `src/types/`
4. **Styling**: Use Material UI components and sx prop

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- OpenAI for GPT-4 Vision capabilities
- Material UI for the component library
- React team for the framework
