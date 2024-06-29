

// This file is a collection of Web3 objects for the UI -- Starting with the wallet
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';



// Wallet utils

const injected = injectedModule();
export const onboard = Onboard({
    wallets: [injected],
    chains: [
        {
            id: '647',
            token: 'SX',
            label: 'SX Testnet',
            rpcUrl: 'https://rpc.toronto.sx.technology/'
          },
          {
            id: '416',
            token: 'SX',
            label: 'SX Network',
            rpcUrl: 'https://rpc.sx.technology/'
          },
          {
            id: '1',
            token: 'ETH',
            label: 'Ethereum',
            rpcUrl: 'https://cloudflare-eth.com'
          },
    ]
});
