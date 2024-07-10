import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onboard, testnet_addresses } from '../../utils/web3';
import { ethers, Contract } from 'ethers'

// ABIs
import { abi } from '../../abis/Erc20Immutable.json'

interface WSXState {
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

const initialState: WSXState = {
    loading: false,
    error: "",
    status: 'initial',
    borrowRate: 0.00,
    borrowBalance: 0.00,
    walletBalance: 0.00,
    supplyBalance: 0.00,
    supplyRate: 0.00,
    isCollateral: false,
    oraclePrice: 1.0000
}

// Views

export const updateWSXBalance = createAsyncThunk('wsxBalance/update', async () => {

    const [wallet] = onboard.state.get().wallets;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const signer = await ethersProvider.getSigner();
    const WSX = new Contract(testnet_addresses.comptroller, abi, signer);



    return 20003202;
});

export const updateOraclePrice = createAsyncThunk('wsxOraclePrice/update', async () => {
    return 0o0100;
})

export const updateSupplyBalance = createAsyncThunk('wsxSupplyBalance/update', async () => {});

export const updateBorrowBalance = createAsyncThunk('wsxBorrowBalance/update', async () => {});

export const updateSupplyRate = createAsyncThunk('wsxSupplyRate/update', async () => {});

export const updateBorrowRate = createAsyncThunk('wsxBorrowRate/update', async () => {});


// Activities

///////////  Approve WSX Thunks
export const approveWSX = createAsyncThunk('wsx/approve', async () => {

    const [wallet] = onboard.state.get().wallets;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const signer = await ethersProvider.getSigner();
})

///////////  Supply Market Thunks
export const supplyWSX = createAsyncThunk('wsx/supply', async () => {})

export const withdrawWSX = createAsyncThunk('wsx/withdraw', async () => {})

///////////  Borrow Market Thunks
export const repayWSX = createAsyncThunk('wsx/repay', async () => {})

export const borrowWSX = createAsyncThunk('wsx/borrow', async () => {})




/// Exporting the Slice
export const WSXSlice = createSlice({
    name: "WSX",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Views
    }
});



export default WSXSlice.reducer;