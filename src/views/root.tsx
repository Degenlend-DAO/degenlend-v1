import { Box, PaletteMode } from '@mui/material';
import React from 'react'

// Design Library
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TopNavigationBar from '../components/Header/TopNavigationBar';
import Markets from '../components/Dashboard/markets'
import Footer from '../components/Footer/Footer';


function Root() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev: string) => (prev === 'dark' ? 'light' : 'dark'));
      };

    const connectWallet = () => {
      alert('Hello!');
    }

      return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <TopNavigationBar mode={mode} toggleColorMode={toggleColorMode} connectWallet={connectWallet} />
                <Box sx={{ bgcolor: 'background.default' }}>
                    {/* Account Balance */}
                    {/* Account Details */}
                    {/* Dashboard */}
                    <Markets />
                    <Footer />
                </Box>
        </ThemeProvider>
      );
}

export default Root;