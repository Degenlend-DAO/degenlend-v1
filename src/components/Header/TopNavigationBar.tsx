import React, { useState } from 'react';
import { PaletteMode } from '@mui/material';
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

    const logoStyle = {
        width: '140px',
        height: 'auto',
        cursor: 'pointer',
    }

    interface AppBarProps {
        mode: PaletteMode;
        toggleColorMode: () => void;
    }

function TopNavigationBar({mode, toggleColorMode}: AppBarProps) {

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
                    ml: '-18px',
                    px: 0,
                    }}
                    >
                        <img src='../../assets/img/degenlend-variation2.png' style={logoStyle} alt='Degenlend logo'/>

                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                {/* Supplying & Borrowing Activities on The market */}
                                <MenuItem
                                onClick={() => scrollToSection('Markets')}
                                sx={{ py: '6px', px: '12px' }}
                                >
                                <Typography variant="body2" color="text.primary">
                                    Markets
                                </Typography>
                                </MenuItem>

                                {/* Turn your WSX into liquistake WSX */}
                                <MenuItem>
                                    <Typography variant='body2' color='text.primary'>
                                        Stake WSX
                                    </Typography>
                                </MenuItem>

                                {/* FAQ for how DegenLend works, and what to expect */}
                                <MenuItem>
                                    <Typography variant="body2" color="text.primary">
                                        FAQ
                                    </Typography>
                                </MenuItem>
                            </Box>   
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', flexGrow: 1 }}>
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                            </Box>                         
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )

}

export default TopNavigationBar