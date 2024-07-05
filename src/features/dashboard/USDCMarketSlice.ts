import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface USDCState {
    loading: boolean;
    error: string;
    status: string,
    walletBalance: number,
    borrowBalance: number,
    borrowRate: number,
    supplyBalance: number,
    supplyRate: number,
    collateral: boolean,
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
    collateral: false
}

// Views

export const updateUSDCBalance = createAsyncThunk('usdcBalance/update', async () => {
    return 102003.00;
});

export const updateOraclePrice = createAsyncThunk('usdcOraclePrice/update', async () => {
    return 1.00;
})

export const updateSupplyBalance = createAsyncThunk('usdcSupplyBalance/update', async () => {});

export const updateBorrowBalance = createAsyncThunk('usdcBorrowBalance/update', async () => {});

export const updateSupplyRate = createAsyncThunk('usdcSupplyRate/update', async () => {});

export const updateBorrowRate = createAsyncThunk('usdcBorrowRate/update', async () => {});

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
    }
});

export default USDCSlice.reducer;