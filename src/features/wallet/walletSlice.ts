import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onboard } from '../../utils/web3'
import { EMPTY_ADDRESS } from "../../utils/constant";
import { ethers } from "ethers";

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

export const connectWallet = createAsyncThunk('wallet/connect', async (_, { rejectWithValue }) => {
    try {
        const wallets = await onboard.connectWallet()
        return wallets[0].accounts[0].address
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const disconnectWallet = createAsyncThunk('wallet/disconnect', async (_, { rejectWithValue }) => {
    try {
        const [wallet] = onboard.state.get().wallets
        await onboard.disconnectWallet({ label: wallet.label })
        return EMPTY_ADDRESS
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const signTransaction = createAsyncThunk('wallet/sign', async (_, { rejectWithValue }) => {
    try {
        const [wallet] = onboard.state.get().wallets;
        const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
        const signer = await ethersProvider.getSigner();
        // send a transaction with the ethers provider
        const txn = await signer.sendTransaction({
            to: '0x',
            value: 100000000000000
        })

        const receipt = await txn.wait()
        console.log(receipt)
    } catch (error) {
        return rejectWithValue(error)
    }
})

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