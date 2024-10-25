import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const networks: { [key: string]: {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
}} = {
  sxTestnet: {
    chainId: '0x287', // 647 in hexadecimal
    chainName: 'SX Network Testnet',
    rpcUrls: ['https://rpc.toronto.sx.technology/'],
    nativeCurrency: {
      name: 'SX',
      symbol: 'SX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.toronto.sx.technology/'],
  },
  sxMainnet: {
    chainId: '0x1A0', // 416 in hexadecimal
    chainName: 'SX Network',
    rpcUrls: ['https://rpc.sx.technology/'],
    nativeCurrency: {
      name: 'SX',
      symbol: 'SX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.sx.technology/'],
  },
};

const SwitchNetworkButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const switchNetwork = async (networkName: string) => {
      try {
        const network = networks[networkName];
        if (!window.ethereum) throw new Error('No crypto wallet found');
  
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [network],
        });
  
        handleClose();
      } catch (error) {
        console.error('Failed to switch network:', error);
      }
    };
  
    return (
      <>
        <Button
          aria-controls="network-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          sx={{
            backgroundColor: '#1976D2', // Custom background color
            '&:hover': {
              backgroundColor: '#1565C0', // Darker hover effect
            },
            fontWeight: 'bold',
            marginRight: '10px', // Space out the button from the others
          }}
        >
          Switch Network
        </Button>
        <Menu
          id="network-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => switchNetwork('sxTestnet')}>SX Testnet</MenuItem>
          <MenuItem onClick={() => switchNetwork('sxMainnet')}>SX Mainnet</MenuItem>
        </Menu>
      </>
    );
  };
  
  export default SwitchNetworkButton;