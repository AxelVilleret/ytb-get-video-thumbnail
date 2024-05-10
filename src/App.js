import './App.css';
import React from 'react';
import Container from './components/Container/index.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { ThemeContext } from './components/ThemeContext';
import Footer from './components/Footer';

function App() {

  const [darkMode, setDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)') ? true : false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
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
      <ThemeContext.Provider value={toggleTheme}>
        <div className="App flex flex-col">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center grow">
            <Container />
          </div>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
