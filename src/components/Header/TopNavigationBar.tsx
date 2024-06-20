import React, { useState } from 'react';
import { PaletteMode, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../../utils/ToggleColorMode'
import { Link } from 'react-router-dom';

import degenlendLogo from '../../assets/img/degenlend-variation2.png'; // interesting that this fixes the rendering issue
import { ColorModeContext } from '../../utils/useMode';

function TopNavigationBar() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position='fixed'
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth='lg'>
                    <Toolbar
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '5px',
                                px: 0,
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    height: 40,
                                    width: 40,
                                }}
                                alt="Degenlend Logo"
                                src={degenlendLogo}
                            />

                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {/* Supplying & Borrowing Activities on The market */}
                                <MenuItem
                                    onClick={() => scrollToSection('Markets')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        <Link to="/markets">Markets</Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography variant='body2' color='text.primary'>
                                        <Link to="/governance">Governance</Link>
                                    </Typography>
                                </MenuItem>

                                {/* Turn your WSX into liquistake WSX */}
                                <MenuItem>
                                    <Typography variant='body2' color='text.primary'>
                                        <Link to="/stake">Stake WSX</Link>
                                    </Typography>
                                </MenuItem>

                                {/* FAQ for how DegenLend works, and what to expect */}
                                <MenuItem>
                                    <Typography variant="body2" color="text.primary">
                                        <Link to="/faq">FAQ</Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography variant='body2' color='text.primary'>
                                        <Link to="/vote">Vote</Link>
                                    </Typography>
                                </MenuItem>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1 }}>
                                <ToggleColorMode mode={theme.palette.mode} colorMode={colorMode} />
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )

}

export default TopNavigationBar