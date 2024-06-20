import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import RoutesComponent from './components/routes/routes';
import { ThemeProvider, useTheme } from '@emotion/react';
import { ColorModeContext, useMode } from './utils/useMode';
import { CssBaseline } from '@mui/material';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
