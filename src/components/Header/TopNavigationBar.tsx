import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../../utils/ToggleColorMode';
import ConnectWallet from '../../utils/ConnectWallet';
import degenlendLogo from '../../assets/img/degenlend-variation2.png';
import { ColorModeContext } from '../../utils/useMode';
import SwitchNetworkButton from '../../features/network/SwitchNetworkButton';

const TopNavigationBar = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar
            position='fixed'
            sx={{
                bgcolor: theme.palette.mode === 'light' 
                    ? 'rgba(66, 165, 245, 0.9)' 
                    : 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(8px)',
                boxShadow: theme.shadows[4],
                transition: 'all 0.3s ease',
                borderBottom: theme.palette.mode === 'light' 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 64,
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.2s',
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 40,
                            width: 40,
                            mr: 1,
                        }}
                        alt="Degenlend Logo"
                        src={degenlendLogo}
                    />
                    {!isSmallScreen && (
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700,
                                color: theme.palette.mode === 'light' ? 'common.white' : 'primary.main',
                            }}
                        >
                            DegenLend
                        </Typography>
                    )}
                </Box>

                {isSmallScreen ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SwitchNetworkButton />
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerToggle}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: theme.palette.mode === 'light' 
                                            ? 'rgba(255, 255, 255, 0.1)' 
                                            : 'rgba(255, 255, 255, 0.05)',
                                    },
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={handleDrawerToggle}
                            PaperProps={{
                                sx: {
                                    bgcolor: theme.palette.background.default,
                                    width: 240,
                                }
                            }}
                        >
                            <Box
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    py: 2,
                                }}
                                role="presentation"
                            >
                                <List>
                                    <ListItem 
                                        button 
                                        component={Link} 
                                        to="/markets"
                                        onClick={handleDrawerToggle}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover,
                                            },
                                        }}
                                    >
                                        <ListItemText 
                                            primary="Markets" 
                                            primaryTypographyProps={{
                                                color: theme.palette.text.primary,
                                                fontWeight: 500,
                                            }}
                                        />
                                    </ListItem>
                                    <ListItem 
                                        button 
                                        component={Link} 
                                        to="/faq"
                                        onClick={handleDrawerToggle}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover,
                                            },
                                        }}
                                    >
                                        <ListItemText 
                                            primary="FAQ" 
                                            primaryTypographyProps={{
                                                color: theme.palette.text.primary,
                                                fontWeight: 500,
                                            }}
                                        />
                                    </ListItem>
                                </List>
                                <Box sx={{ mt: 'auto', p: 2 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <ToggleColorMode mode={theme.palette.mode} colorMode={colorMode} />
                                    </Box>
                                    <ConnectWallet />
                                </Box>
                            </Box>
                        </Drawer>
                    </>
                ) : (
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            mx: 2,
                            '& .MuiMenuItem-root': {
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: theme.palette.mode === 'light' 
                                        ? 'rgba(255, 255, 255, 0.2)' 
                                        : 'rgba(255, 255, 255, 0.05)',
                                },
                            },
                        }}>
                            <MenuItem component={Link} to="/markets">
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.mode === 'light' ? 'common.white' : 'text.primary',
                                    }}
                                >
                                    Markets
                                </Typography>
                            </MenuItem>
                            <MenuItem component={Link} to="/faq">
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: theme.palette.mode === 'light' ? 'common.white' : 'text.primary',
                                    }}
                                >
                                    FAQ
                                </Typography>
                            </MenuItem>
                        </Box>
                        
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 2,
                            ml: 2,
                        }}>
                            <SwitchNetworkButton />
                            <ToggleColorMode mode={theme.palette.mode} colorMode={colorMode} />
                            <ConnectWallet />
                        </Box>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default TopNavigationBar;