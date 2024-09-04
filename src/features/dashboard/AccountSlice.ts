import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onboard, testnet_addresses } from '../../utils/web3';
import { ethers, Contract, formatUnits } from 'ethers'

// ABIs
import ERC20Immutable from '../../abis/Erc20Immutable.json'
import Comptroller from '../../abis/Comptroller.json'
interface AccountState {
    loading: boolean;
    error: string;
    status: string,
    transactionHash: string,
    amount: number,
    liquidity: number,
    borrowLimit: number,
    borrowLimitUsed: number,
    netAPR: number,
    netBorrowBalance: number,
    netSupplyBalance: number,
}

const initialState: AccountState = {
    loading: false,
    error: "",
    status: "initial",
    transactionHash: "0x00000000000000000000000000000000000000000",
    amount: 0,
    liquidity: 0e18,
    borrowLimit: 0,
    borrowLimitUsed: 0,
    netAPR: 0,
    netBorrowBalance: 0,
    netSupplyBalance: 0
}

// Views

export const updateNetSupplyBalance = createAsyncThunk('netSupplyBalance/update', async () => {
    const [wallet] = onboard.state.get().wallets;  
})

export const updateNetBorrowBalance = createAsyncThunk('netBorrowBalance/update', async () => {
    const [wallet] = onboard.state.get().wallets;
})

export const updateAccountLiquidity = createAsyncThunk('liquidity/update', async () => {
    /** Local instance of the wallet 
     * @author user2745
    */
    const [wallet] = onboard.state.get().wallets;
    const walletAddress = wallet.accounts[0].address;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const comptroller = new Contract(testnet_addresses.comptroller, Comptroller.abi, ethersProvider);
    try {
        const liquidity = await comptroller.getAccountLiquidity(walletAddress);
        console.log(`[Console] successfully called on thunk 'updateAccountLiquidity'`);
        const formattedLiquidity = liquidity / 1e18;
        return formattedLiquidity;
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updateAccountLiquidity': ${error} `)
        return 0e18;
    }
})


export const updateAmount = createAsyncThunk('account/updateAmount', async (amountToUpdate: number) =>{
    return amountToUpdate;
});

/**
 * Updates the available borrow limit & borrow limit used from the smart contract.
 * @remarks
 * this function does not take in params
 */
export const updateBorrowLimit = createAsyncThunk('borrowLimit/update', async () => {
    const [wallet] = onboard.state.get().wallets;
})

export const updateNetAPR = createAsyncThunk('netAPR/update', async () => {
    const [wallet] = onboard.state.get().wallets;
})

// Activities

/**
 * Enters the wallet into a particular money market
 */
export const enterWSXMarket = createAsyncThunk('account/enterWSXMarket', async (_, { rejectWithValue }) => {
    const [wallet] = onboard.state.get().wallets;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const signer = await ethersProvider.getSigner();
    const comptroller = new Contract(testnet_addresses.comptroller, Comptroller.abi, signer);

    let marketsToEnter = [testnet_addresses.degenWSX];

    try {
        let txn = await comptroller.enterMarkets(marketsToEnter);
        await txn.wait();
        console.log(`[Console] Successfully entered the account into the WSX Market. txn hash: ${txn}`);
        return txn.hash
    } catch (error) {
        console.log(`something went wrong: ${error}`)
        return rejectWithValue(error);
    }
})

/**
 * Enters the wallet into a particular money market
 */
export const enterUSDCMarket = createAsyncThunk('account/enterUSDCMarket', async (_, { rejectWithValue }) => {
    const [wallet] = onboard.state.get().wallets;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const signer = await ethersProvider.getSigner();
    const comptroller = new Contract(testnet_addresses.comptroller, Comptroller.abi, signer);

    let marketsToEnter = [testnet_addresses.degenUSDC];

    try {
        let txn = await comptroller.enterMarkets(marketsToEnter);
        await txn.wait();
        console.log(`[Console] Successfully entered the account into the USDC Market. txn hash: ${txn.hash}, txn deails: \n \n ${txn}`);
        return txn.hash
    } catch (error) {
        console.log(`something went wrong: ${error}`)
        return rejectWithValue(error);
    }
})

/**
 * Exits the wallet from the WSX money market 
 * @remarks this function does not take in params
 */
export const exitWSXMarket = createAsyncThunk('account/exitWSXMarket', async () => {
    const [wallet] = onboard.state.get().wallets;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const signer = await ethersProvider.getSigner();
    const comptroller = new Contract(testnet_addresses.comptroller, Comptroller.abi, signer);

    let marketToExit = testnet_addresses.degenWSX;

    try {
        let txn = await comptroller.exitMarket(marketToExit);
        await txn.wait();
        console.log(`[Console] Successfully exited the WSX Market with account.  txn hash: ${txn}.  txn details: \n\n ${txn}`)
        return txn.hash
    } catch (error) {
        console.log(`something went wrong: ${error}`)
    }

    console.log("Done: 'exitMarket' ");
})

/**
 * Exists the wallet from the USDC money Market
 * @remarks this function does not take in params
 */
export const exitUSDCMarket = createAsyncThunk('account/exitUSDCMarket', async () => {

    const [wallet] = onboard.state.get().wallets;
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');

    const signer = await ethersProvider.getSigner();
    const comptroller = new Contract(testnet_addresses.comptroller, Comptroller.abi, signer);

    let marketToExit = testnet_addresses.degenUSDC;

    try {
        let txn = await comptroller.exitMarket(marketToExit);
        await txn.wait();
        console.log(`[Console] Successfully exited the USDC Market with account.  txn hash: ${txn}.  txn details: \n\n ${txn}`)
        return txn.hash
    } catch (error) {
        console.log(`[Console] Something went wrong! \n ${error}`);
    }
})

export const AccountSlice = createSlice({
    name: "Account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
///////////  Views

        builder.addCase(updateNetSupplyBalance.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateNetSupplyBalance.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateNetSupplyBalance.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        });


        // Activities

        // Update the amount placeholder

        builder.addCase(updateAmount.fulfilled, (state, action) => {
            state.amount = action.payload;
        })

        //  Enter a Wrapped SX market

        builder.addCase(enterWSXMarket.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(enterWSXMarket.fulfilled, (state, action) => {
            state.loading = false;
            state.transactionHash = action.payload;
        });
        builder.addCase(enterWSXMarket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        });

        //  Enter a Wrapped SX market

        builder.addCase(enterUSDCMarket.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(enterUSDCMarket.fulfilled, (state, action) => {
            state.loading = false;
            state.transactionHash = action.payload;
        });
        builder.addCase(enterUSDCMarket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        });

        // Exit a Wrapped SX Market

        builder.addCase(exitWSXMarket.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(exitWSXMarket.fulfilled, (state, action) => {
            state.loading = false;
            state.transactionHash = action.payload;
        });
        builder.addCase(exitWSXMarket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        });

        // Exit a USDC Market

        builder.addCase(exitUSDCMarket.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(exitUSDCMarket.fulfilled, (state, action) => {
            state.loading = false;
            state.transactionHash = action.payload;
        });
        builder.addCase(exitUSDCMarket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        });
    }
});

export default AccountSlice.reducer;

