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



export const AccountSlice = createSlice({
    name: "Account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});

export default AccountSlice.reducer;