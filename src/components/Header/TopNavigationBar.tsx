import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../../utils/ToggleColorMode';
import ConnectWallet from '../../utils/ConnectWallet';
import degenlendLogo from '../../assets/img/degenlend-variation2.png';
import { ColorModeContext } from '../../utils/useMode';

const TopNavigationBar = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <AppBar
                position='fixed'
                sx={{
                    bgcolor:
                        theme.palette.mode === 'light'
                            ? 'rgba(66, 165, 245, 1)'
                            : 'rgba(0, 0, 0, 1)',
                }}
            >
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
                        component="img"
                        sx={{
                            height: 40,
                            width: 40,
                        }}
                        alt="Degenlend Logo"
                        src={degenlendLogo}
                    />
                    {isSmallScreen ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                onClose={handleDrawerToggle}
                            >
                                <Box
                                    sx={{ width: 250 }}
                                    role="presentation"
                                    onClick={handleDrawerToggle}
                                    onKeyDown={handleDrawerToggle}
                                >
                                    <List>
                                        <ListItem component={Link} to="/markets">
                                            <ListItemText primary="Markets" />
                                        </ListItem>
                                        <ListItem component={Link} to="/faq">
                                            <ListItemText primary="FAQ" />
                                        </ListItem>
                                        <ListItem>
                                            <ConnectWallet />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Drawer>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <MenuItem>
                                <Typography variant="body2" color="text.primary">
                                    <Link to="/markets" style={{ textDecoration: "none" }}>Markets</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography variant="body2" color="text.primary">
                                    <Link to="/faq" style={{ textDecoration: "none" }}>FAQ</Link>
                                </Typography>
                            </MenuItem>
                        </Box>
                    )}
                    <Box sx={{ display: isSmallScreen ? 'none' : 'flex', flexDirection: 'row', alignItems: 'end' }}>
                        <ToggleColorMode mode={theme.palette.mode} colorMode={colorMode} />
                        <ConnectWallet />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default TopNavigationBar;