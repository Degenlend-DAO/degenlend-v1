import { Box, PaletteMode } from '@mui/material';
import React from 'react'

// Design Library
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TopNavigationBar from '../components/Header/TopNavigationBar';
import Footer from '../components/Footer/Footer';
import { ColorModeContext } from '../utils/useMode';


function Root() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ bgcolor: 'background.default' }}>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Root;