import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Button } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum: any;
  }
}

// The SX network details
const SX_CHAIN_ID = '0x287';  // Replace with SX network's chain ID in hex
const SX_NETWORK_NAME = 'SX Network Testnet';  // Update with actual network name
const SX_RPC_URL = 'https://rpc.sx.network';  // RPC URL for SX Network
const SX_CURRENCY_SYMBOL = 'SX';  // Native token symbol, if any

const SwitchNetworkSnackbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        const provider = new Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        
        // Check if the user is connected to the SX network
        if (chainId !== parseInt(SX_CHAIN_ID, 16)) {
          setOpen(true);
        }
      } else {
        console.error('MetaMask not found.');
      }
    };

    checkNetwork();

    // Listen for network changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', () => window.location.reload());
      }
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const switchToSXNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SX_CHAIN_ID }],
        });
        handleClose();
      } catch (switchError: any) {
        // Handle the error for a network that is not added yet
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: SX_CHAIN_ID,
                  chainName: SX_NETWORK_NAME,
                  rpcUrls: [SX_RPC_URL],
                  nativeCurrency: {
                    name: SX_NETWORK_NAME,
                    symbol: SX_CURRENCY_SYMBOL, // Symbol, like 'SX'
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://explorer.sx.network/'],  // Update if applicable
                },
              ],
            });
            handleClose();
          } catch (addError) {
            console.error('Failed to add the SX network:', addError);
          }
        } else {
          console.error('Failed to switch network:', switchError);
        }
      }
    } else {
      console.error('MetaMask is not installed.');
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={null} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="warning"
        action={
          <Button color="inherit" size="small" onClick={switchToSXNetwork}>
            SWITCH NETWORK
          </Button>
        }
      >
        You are on the wrong network. Please switch to SX Network Testnet!
      </Alert>
    </Snackbar>
  );
};

export default SwitchNetworkSnackbar;
