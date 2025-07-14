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

  sxNetworkRollup: {
    chainId: '0x1042',
    chainName: 'SX Network Rollup',
    rpcUrls: ['https://rpc.sx-rollup.gelato.digital/', 'https://rpc-rollup.sx.technology'],
    nativeCurrency: { name: 'SX', symbol: 'SX', decimals: 18 },
    blockExplorerUrls: ['https://explorerl2.sx.technology/'],
  },
};

const NetworkButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '12px',
  padding: '8px 16px',
  boxShadow: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.dark,
  },
}));

const NetworkMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '12px 16px',
  minWidth: '200px',
  borderRadius: '8px',
  margin: '4px',
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    fontWeight: 600,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
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
            chainId === networks.sxNetworkRollup.chainId ? 'SX Rollup' :
            chainId === networks.sxTestnet.chainId ? 'SX Testnet' : null
          );
        } catch (error) {
          console.error('Error detecting network:', error);
        }
      }
    };

    checkCurrentNetwork();

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
        color="primary"
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
            padding: '8px',
            mt: 1,
            border: `1px solid ${theme.palette.divider}`,
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
          onClick={() => switchNetwork('sxNetworkRollup')}
          className={isActiveNetwork('sxNetworkRollup') ? 'active' : ''}
        >
          SX Network Rollup
          {isActiveNetwork('sxNetworkRollup') && <ActiveIndicator sx={{ marginLeft: 'auto' }} />}
        </NetworkMenuItem>
      </Menu>
    </Box>
  );
};

export default SwitchNetworkButton;