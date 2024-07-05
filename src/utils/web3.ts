

// This file is a collection of Web3 objects for the UI -- Starting with the wallet
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';



// Wallet utils

const injected = injectedModule();
export const onboard = Onboard({
    wallets: [injected],
    chains: [
        {
            id: '0x287', // 647 in hex
            token: 'SX',
            label: 'SX Testnet',
            rpcUrl: 'https://rpc.toronto.sx.technology/'
          },
          {
            id: '0x1A0', // 416 in hex
            token: 'SX',
            label: 'SX Network',
            rpcUrl: 'https://rpc.sx.technology/'
          },
    ]
});


// USDC, WSX, and Comptroller addresses
export const testnet_addresses = {
  "comptroller": '',
  "degenUSDC": '',
  "degenWSX": '',
}

export const mainnet_addresses = {
  "comptroller": '',
  "degenUSDC": '',
  "degenWSX": ''
}

