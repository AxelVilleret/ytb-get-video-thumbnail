import './App.css';
import Button from '@mui/material/Button';
import Container from './components/Container/index.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7c3aed',
    },
    secondary: {
      main: '#d53f8c',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
        <Container />
      </div>
    </ThemeProvider>
  );
}

export default App;
