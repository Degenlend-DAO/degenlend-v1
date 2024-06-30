import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface WSXState {
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

const initialState: WSXState = {
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

export const updateWSXBalance = createAsyncThunk('wsxBalance/update', async () => {
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


///////////  Supply Market Thunks


///////////  Borrow Market Thunks


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