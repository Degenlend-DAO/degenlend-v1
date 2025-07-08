import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem, Box, useTheme, styled } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const networks = {
  sxTestnet: {
    chainId: '0x287',
    chainName: 'SX Network Testnet',
    rpcUrls: ['https://rpc.toronto.sx.technology/'],
    nativeCurrency: { name: 'SX', symbol: 'SX', decimals: 18 },
    blockExplorerUrls: ['https://explorer.toronto.sx.technology/'],
  },
  sxMainnet: {
    chainId: '0x1A0',
    chainName: 'SX Network',
    rpcUrls: ['https://rpc.sx.technology/'],
    nativeCurrency: { name: 'SX', symbol: 'SX', decimals: 18 },
    blockExplorerUrls: ['https://explorer.sx.technology/'],
  },
};

const NetworkButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '12px',
  padding: '8px 16px',
  marginRight: theme.spacing(2),
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.palette.mode === 'light' 
      ? theme.palette.primary.dark 
      : theme.palette.secondary.dark,
  },
}));

const NetworkMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '12px 16px',
  minWidth: '200px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(25, 118, 210, 0.08)' 
      : 'rgba(255, 255, 255, 0.04)',
  },
  '&.active': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(25, 118, 210, 0.12)' 
      : 'rgba(255, 255, 255, 0.08)',
    fontWeight: 600,
  },
}));

const ActiveIndicator = styled(CircleIcon)(({ theme }) => ({
  fontSize: '8px',
  marginLeft: '8px',
  color: theme.palette.success.main,
}));

const SwitchNetworkButton = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);

  useEffect(() => {
    const checkCurrentNetwork = async () => {
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setCurrentNetwork(
            chainId === networks.sxMainnet.chainId ? 'SX Mainnet' :
            chainId === networks.sxTestnet.chainId ? 'SX Testnet' : null
          );
        } catch (error) {
          console.error('Error detecting network:', error);
        }
      }
    };

    checkCurrentNetwork();

    // Listen for network changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', checkCurrentNetwork);
      return () => window.ethereum.removeListener('chainChanged', checkCurrentNetwork);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchNetwork = async (networkName: keyof typeof networks) => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet found');
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networks[networkName]],
      });
      handleClose();
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  const isActiveNetwork = (networkName: keyof typeof networks) => {
    return currentNetwork === networks[networkName].chainName;
  };

  return (
    <Box>
      <NetworkButton
        aria-controls="network-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: theme.palette.mode === 'light' 
            ? theme.palette.primary.main 
            : theme.palette.secondary.main,
        }}
      >
        {currentNetwork || 'Select Network'}
        {currentNetwork && <ActiveIndicator />}
      </NetworkButton>
      <Menu
        id="network-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: '12px',
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.mode === 'light' 
              ? theme.palette.background.paper 
              : theme.palette.background.default,
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NetworkMenuItem 
          onClick={() => switchNetwork('sxTestnet')}
          className={isActiveNetwork('sxTestnet') ? 'active' : ''}
        >
          SX Network Testnet
          {isActiveNetwork('sxTestnet') && <ActiveIndicator sx={{ marginLeft: 'auto' }} />}
        </NetworkMenuItem>
        <NetworkMenuItem 
          onClick={() => switchNetwork('sxMainnet')}
          className={isActiveNetwork('sxMainnet') ? 'active' : ''}
        >
          SX Network Mainnet
          {isActiveNetwork('sxMainnet') && <ActiveIndicator sx={{ marginLeft: 'auto' }} />}
        </NetworkMenuItem>
      </Menu>
    </Box>
  );
};

export default SwitchNetworkButton;