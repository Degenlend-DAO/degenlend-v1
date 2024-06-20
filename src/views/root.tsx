import { Box, IconButton, PaletteMode, Typography } from '@mui/material';
import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Design Library
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TopNavigationBar from '../components/Header/TopNavigationBar';
import Footer from '../components/Footer/Footer';
import { ColorModeContext } from '../utils/useMode';


function Root() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 30,
      }}
    >
      <Typography>Hello World!</Typography>
    </Box>
  );
}

export default Root;