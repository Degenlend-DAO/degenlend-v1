import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers, Contract, formatUnits } from 'ethers';
import { onboard, testnet_addresses } from '../../utils/web3';

import ERC20Immutable from '../../abis/Erc20Immutable.json'

interface USDCState {
    loading: boolean;
    error: string;
    status: string,
    walletBalance: number,
    borrowBalance: number,
    borrowRate: number,
    supplyBalance: number,
    supplyRate: number,
    isCollateral: boolean,
    oraclePrice: number,
}

const initialState: USDCState = {
    loading: false,
    error: "",
    status: 'initial',
    borrowRate: 0.00,
    borrowBalance: 0.00,
    walletBalance: 0.00,
    supplyBalance: 0.00,
    supplyRate: 0.00,
    isCollateral: false,
    oraclePrice: 1.000,
}

// Views
const [wallet] = onboard.state.get().wallets;

export const updateUSDCBalance = createAsyncThunk('usdcBalance/update', async () => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const WSX = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);
    const decimals = await WSX.decimals();
    const walletAddress = wallet.accounts[0].address;

    try {
        let balance = WSX.balanceOf(walletAddress);
        formatUnits(await balance, decimals)
        return balance;
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateWSXBalance': ${error}`)
        return 0;
    }});

export const updateOraclePrice = createAsyncThunk('usdcOraclePrice/update', async () => {
    return 1.00;
})

export const updateSupplyBalance = createAsyncThunk('usdcSupplyBalance/update', async () => {
    return 1000;
});

export const updateBorrowBalance = createAsyncThunk('usdcBorrowBalance/update', async () => {
    return 14002;
});

export const updateSupplyRate = createAsyncThunk('usdcSupplyRate/update', async () => {
    return 0o413;
});

export const updateBorrowRate = createAsyncThunk('usdcBorrowRate/update', async () => {
    return 0o213;
});

// Activities

///////////  Supply Market Thunks
export const approveUSDC = createAsyncThunk('usdc/Approve', async () => {})

///////////  Supply Market Thunks

export const supplyUSDC = createAsyncThunk('usdc/Supply', async () => {})

export const withdrawUSDC = createAsyncThunk('uscd/withdraw', async () => {})

///////////  Borrow Market Thunks

export const borrowUSDC = createAsyncThunk('usdc/borrow', async () => {})

export const repayUSDC = createAsyncThunk('usdc/repay', async () => {})

/// Exporting the Slice
export const USDCSlice = createSlice({
    name: "USDC",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Views

        // Activities
    }
});

export default USDCSlice.reducer;