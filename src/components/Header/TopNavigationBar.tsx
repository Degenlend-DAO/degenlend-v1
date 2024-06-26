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
import ConnectWallet from '../../utils/ConnectWallet';

const TopNavigationBar = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position='fixed'
            sx={(theme) => ({
                bgcolor:
                    theme.palette.mode === 'light'
                        ? 'rgba(66, 165, 245)'
                        : 'rgba(0, 0, 0, 0.4)',
            })}
        >
            <Container maxWidth='lg'>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        maxHeight: 40,
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            ml: '5px',
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
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', flexGrow: 1 }}>
                            <ToggleColorMode mode={theme.palette.mode} colorMode={colorMode} />
                            <ConnectWallet address={'0x0000000000000000000'} connectWallet={() => alert('Wallet Connected!')} />
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )

}

export default TopNavigationBar