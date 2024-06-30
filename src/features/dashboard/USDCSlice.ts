import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface USDCState {
    status: string,
    walletBalance: number,
    borrowBalance: number,
    borrowRate: number,
    supplyBalance: number,
    supplyRate: number,
    collateral: boolean,
}

const initialState: USDCState = {
    status: 'initial',
    borrowRate: 0.00,
    borrowBalance: 0.00,
    walletBalance: 0.00,
    supplyBalance: 0.00,
    supplyRate: 0.00,
    collateral: false
}

// Views


// Activities


///////////  Supply Market Thunks


///////////  Borrow Market Thunks


/// Exporting the Slice
export const USDCSlice = createSlice({
    name: "USDC",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    }
});

export default USDCSlice.reducer;