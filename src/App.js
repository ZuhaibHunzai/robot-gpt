import "./App.css";

import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import LandingPage from "./pages/landing";
import {
  useCheckWalletConnection,
  useInitializePackages,
  useOnProviderChange,
} from "./hooks";
function App() {
  useInitializePackages();
  useOnProviderChange();
  useCheckWalletConnection();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
