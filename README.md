# DegenLend-v1

DegenLend is a decentralized lending and borrowing protocol built on the SX Network Testnet. It allows users to lend and borrow assets like **Wrapped SX (WSX)** and **USDC**, leveraging their supplied assets as collateral. DegenLend is designed to enable decentralized finance (DeFi) enthusiasts to earn interest on their deposits and take out loans while managing risk via collateralization.

## Overview

The **DegenLend Markets Page** provides users with an intuitive interface to interact with the lending protocol, enabling the following functionalities:
- **Supply and Borrow**: Users can supply their assets (WSX and USDC) and earn interest or borrow against their collateral.
- **Collateral Management**: Users can toggle supplied assets to be used as collateral.
- **Net APY and Borrow Limit**: The interface calculates and displays the user's net APY, borrow limit, and other key financial metrics.

The project is currently hosted on **IPFS** and deployed on the **SX Network Testnet**.

## Key Contracts and Addresses

### Deployed Contracts:
| Contract                  | Address                                      |
|---------------------------|----------------------------------------------|
| **Unitroller**             | `0xB078459124e55Eb9F2937c86c0Ec893ff4FF082b` |
| **USDC Interest Rate Model**| `0xeE1bFEE55C42048735c04A9bE7133EB62417F131`|
| **WSX Interest Rate Model**| `0x353e7839870604Edf9D766bEFb7929c95c215e00`|
| **Comptroller**            | `0x937C076C8D9F85291F5cd22E95b1212C0138A609`|
| **Degen WSX (CErc20Immutable)** | `0xf547a2FE994E2207d4d7F13e69B0b2C0aC24cc2f`|
| **Degen USDC (CErc20Immutable)** | `0xc3eAff959EB22aea6581D7bf52d4d44BdbbDCcD1`|

## Features

1. **Supply Markets**:
   - Users can supply **WSX** or **USDC** and earn interest based on the respective **interest rate model**.
   - The UI shows the available markets, supply rates (APY), and the user’s balance in each market.

2. **Borrow Markets**:
   - Users can borrow **WSX** or **USDC** using their supplied assets as collateral.
   - The UI provides key metrics such as the borrow limit, borrow balance, and interest rates.

3. **Collateral Management**:
   - Users can toggle assets supplied as collateral, affecting their borrow limit.
   - Integration with the **Comptroller** contract via `enterMarkets()` and `exitMarket()`.

4. **Net APY and Borrow Limit**:
   - The system dynamically calculates the user's **Net APY** and **Borrow Limit** based on their supplied and borrowed amounts.
