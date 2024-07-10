import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import degenlendLogo from '../assets/img/degenlend-variation2.png'

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
  ],
  appMetadata: {
    name: 'DegenLend Protocol',
    icon: degenlendLogo,
    logo: degenlendLogo,
    description: 'Swap tokens for other tokens',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  },
});


// USDC, WSX, and Comptroller addresses
export const testnet_addresses = {
  "comptroller": '0x8D1230e6Ae4C1Bc573697D93103349C3FDefC944',
  "price_oracle": '0x6ca684b4773aF95AB5AE8d0aB7bA078237536DDF',
  "degenUSDC": '0xC863E82CD46296F1F81C63cDEB3708505B5b0d97',
  "degenWSX": '0x5cB7786A478eEc37Da5F6EA2e946cD860E784743',
}

export const mainnet_addresses = {
  "comptroller": '',
  "price_oracle": '',
  "degenUSDC": '',
  "degenWSX": ''
}

