

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
  "comptroller": '0x8D1230e6Ae4C1Bc573697D93103349C3FDefC944',
  "price_oracle": '',
  "degenUSDC": '0xC863E82CD46296F1F81C63cDEB3708505B5b0d97',
  "degenWSX": '0x5cB7786A478eEc37Da5F6EA2e946cD860E784743',
}

export const mainnet_addresses = {
  "comptroller": '',
  "price_oracle": '',
  "degenUSDC": '',
  "degenWSX": ''
}

