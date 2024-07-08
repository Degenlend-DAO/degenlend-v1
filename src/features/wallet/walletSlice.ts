import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onboard } from '../../utils/web3'
import { EMPTY_ADDRESS } from "../../utils/constant";

interface WalletState {
    address: string;
    loading: boolean;
    error: string;
    isConnected: boolean;
}

const initialState: WalletState = {
    address: EMPTY_ADDRESS,
    loading: false,
    error: "",
    isConnected: false,
}

export const connectWallet = createAsyncThunk('wallet/connect', async () => {
    const wallets = await onboard.connectWallet();
    console.log(`Connected wallets: $wallets & main address: ${wallets[0].accounts[0].address}`)

    return wallets[0].accounts[0].address;
});

export const disconnectWallet = createAsyncThunk('wallet/disconnect', async () => {

    const [wallet] = onboard.state.get().wallets
    await onboard.disconnectWallet({ label: wallet.label }) // JSON error occurs, but the wallet still disconnects.

    return EMPTY_ADDRESS;
});

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(connectWallet.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        })
        builder.addCase(connectWallet.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(connectWallet.fulfilled, (state, action) => {
            state.address = action.payload;
            state.isConnected = true;
            state.loading = false;
            state.error = '';
        })
        builder.addCase(disconnectWallet.rejected, (state, action) => {
            state.address = EMPTY_ADDRESS;
            state.isConnected = false;
            state.loading = false;
            state.error = action.error.message!;
        })
        builder.addCase(disconnectWallet.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(disconnectWallet.fulfilled, (state, action) => {
            state.loading = false;
            state.isConnected = false;
            state.address = EMPTY_ADDRESS;
        })
    }
});

export default walletSlice.reducer;