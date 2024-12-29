import './App.css';
import React, { useState } from 'react';
import Container from './components/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from './components/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ThemeContextProps {
  darkThemeActive?: boolean;
  toggleTheme?: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({});
const ThemeContextProvider = ThemeContext.Provider;

const App: React.FC = () => {
  const [darkThemeActive, setDarkThemeActive] = useState(useMediaQuery('(prefers-color-scheme: dark)') ? true : false);

  const toggleTheme = () => {
    setDarkThemeActive(!darkThemeActive);
  };

  const theme = createTheme({
    palette: {
      mode: darkThemeActive ? 'dark' : 'light',
      primary: {
        main: '#7c3aed',
      },
      secondary: {
        main: '#d53f8c',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeContextProvider value={{ darkThemeActive, toggleTheme }}>
        <div className="App flex flex-col">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center grow">
            <Container />
          </div>
          <Footer />
        </div>
      </ThemeContextProvider>
    </ThemeProvider>
  );
}

export default App;
