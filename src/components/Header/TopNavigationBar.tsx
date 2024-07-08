import React from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ToggleColorMode from '../../utils/ToggleColorMode'
import { Link } from 'react-router-dom';

import degenlendLogo from '../../assets/img/degenlend-variation2.png';
import { ColorModeContext } from '../../utils/useMode';
import ConnectWallet from '../../utils/ConnectWallet';

const TopNavigationBar = () => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <AppBar
            position='fixed'
            sx={(theme) => ({
                bgcolor:
                    theme.palette.mode === 'light'
                        ? 'rgba(66, 165, 245)'
                        : 'rgba(0, 0, 0, 1)',
            })}
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
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <MenuItem>
                        <Typography variant="body2" color="text.primary">
                            <Link to="/markets">Markets</Link>
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <Typography variant='body2' color='text.primary'>
                            <Link to="/governance">Governance</Link>
                        </Typography>
                    </MenuItem>
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
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
                    <ToggleColorMode mode={theme.palette.mode} colorMode={colorMode} />
                    <ConnectWallet />
                </Box>
            </Toolbar>
        </AppBar>
    )

}

export default TopNavigationBar