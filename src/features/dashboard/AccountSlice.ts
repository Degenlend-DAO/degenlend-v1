import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface AccountState {
    loading: boolean;
    error: string;
    status: string,
    borrowLimit: number,
    netAPR: number,
    netBorrowBalance: number,
    netSupplyBalance: number,
}

const initialState: AccountState = {
    loading: false,
    error: "",
    status: "initial",
    borrowLimit: 0,
    netAPR: 0,
    netBorrowBalance: 0,
    netSupplyBalance: 0
}

// Views

export const updateNetSupplyBalance = createAsyncThunk('netSupplyBalance/update', () => {})

export const updateNetBorrowBalance = createAsyncThunk('netBorrowBalance/update', () => {})

export const updateBorrowLimit = createAsyncThunk('borrowLimit/update', () => {})

export const updateNetAPR = createAsyncThunk('netAPR/update', () => {})

// Activities



export const AccountSlice = createSlice({
    name: "Account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});

export default AccountSlice.reducer;