import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onboard, testnet_addresses } from '../../utils/web3';
import { ethers, Contract, formatUnits } from 'ethers'

// ABIs
import {abi} from '../../abis/Comptroller.json'
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

export const updateNetSupplyBalance = createAsyncThunk('netSupplyBalance/update', () => {
    
})

export const updateNetBorrowBalance = createAsyncThunk('netBorrowBalance/update', () => {

})

export const updateBorrowLimit = createAsyncThunk('borrowLimit/update', () => {

})

export const updateNetAPR = createAsyncThunk('netAPR/update', () => {})

// Activities

export const enterMarket = createAsyncThunk('account/enterMarket', async () => {
    const [wallet] = onboard.state.get().wallets;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const signer = await ethersProvider.getSigner();
    const comptroller = new Contract(testnet_addresses.comptroller, abi, signer);

    let marketsToEnter = [testnet_addresses.degenWSX];

    try {
        let txn = await comptroller.enterMarkets(marketsToEnter);
        await txn.wait();
        console.log(txn);
    } catch (error) {
        console.log(`something went wrong: ${error}`)
    }

    console.log("Done: 'enterMarket' ");
})

export const exitMarket = createAsyncThunk('account/exitMarket', async () => {
    const [wallet] = onboard.state.get().wallets;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const signer = await ethersProvider.getSigner();
    const comptroller = new Contract(testnet_addresses.comptroller, abi, signer);

    let marketToExit = testnet_addresses.degenWSX;

    try {
        let txn = await comptroller.exitMarket(marketToExit);
        await txn.wait();
        console.log(txn);
    } catch (error) {
        console.log(`something went wrong: ${error}`)
    }

    console.log("Done: 'exitMarket' ");
})

export const AccountSlice = createSlice({
    name: "Account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Views

        // Activities
        builder.addCase(enterMarket.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(enterMarket.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(enterMarket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        });

        builder.addCase(exitMarket.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(exitMarket.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(exitMarket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        });
    }
});

export default AccountSlice.reducer;