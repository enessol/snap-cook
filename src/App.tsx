import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Box, Typography } from "@mui/material";
import SnapCookApp from "./components/SnapCookApp";
// @ts-ignore
import iconImage from "./assets/icon.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6b35",
    },
    secondary: {
      main: "#4ecdc4",
    },
    background: {
      default: "transparent",
      paper: "rgba(255, 255, 255, 0.95)",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Nunito", "Comic Neue", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: "#2c3e50",
      fontFamily: '"Fredoka One", "Poppins", cursive',
    },
    h2: {
      fontWeight: 600,
      fontFamily: '"Fredoka One", "Poppins", cursive',
    },
    h5: {
      fontWeight: 500,
      fontFamily: '"Poppins", "Nunito", sans-serif',
    },
    body1: {
      fontFamily: '"Nunito", "Poppins", sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Nunito", "Poppins", sans-serif',
      fontWeight: 400,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />{" "}
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          background:
            "linear-gradient(135deg, #ff9a8b 0%, #fecfef 25%, #fecfef 50%, #ffd1dc 75%, #ffb347 100%)",
          // Alternative food gradients:
          // Warm sunset: "linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ffd23f 50%, #ff9068 75%, #ff6b35 100%)"
          // Fruit colors: "linear-gradient(135deg, #ff9a8b 0%, #a8e6cf 25%, #ffd3a5 50%, #fd9853 75%, #ff6b35 100%)"
        }}
      >
        {" "}
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            width: "100%",
          }}
        >
          <Box textAlign="center" mb={4}>
            <Box sx={{ mb: 2 }}>
              <img
                src={iconImage}
                alt="SnapCook Logo"
                style={{
                  height: "200px",
                  width: "auto",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                }}
              />
            </Box>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              AI-Powered Recipe Assistant
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Upload a photo of your ingredients and get personalized recipe
              suggestions!
            </Typography>
          </Box>
          <SnapCookApp />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
