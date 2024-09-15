import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onboard, testnet_addresses } from '../../utils/web3';
import { ethers, Contract, formatUnits } from 'ethers'

// ABIs
import ERC20Immutable from '../../abis/Erc20Immutable.json'
import Comptroller from '../../abis/Comptroller.json'
import SimplePriceOracle from '../../abis/SimplePriceOracle.json';
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";
interface AccountState {
    loading: boolean;
    error: string;
    status: string,
    transactionHash: string,
    amount: number,
    liquidity: number,
    borrowLimit: number,
    borrowLimitUsed: number,
    netAPY: number,
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
    netAPY: 0,
    netBorrowBalance: 0,
    netSupplyBalance: 0
}

// Views

export const updateNetSupplyBalance = createAsyncThunk('netSupplyBalance/update', async () => {
    const [wallet] = onboard.state.get().wallets; 

    if (wallet === undefined ) {
        return 0;
    }
    // How this works -> 1) Each money market has a supply balance, the net supply balance is : (amount in market * price in USD) + (amount in market * price in USD)

    console.log(`[Console] Invoking net supply balance... `)
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    let signer = await ethersProvider.getSigner();
    const priceOracle = new Contract( testnet_addresses.price_oracle, SimplePriceOracle.abi, signer)
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);

    const wsxPrice = await priceOracle.getUnderlyingPrice(testnet_addresses.degenWSX);
    const usdcPrice = await priceOracle.getUnderlyingPrice(testnet_addresses.degenUSDC);

    const walletAddress = wallet.accounts[0].address;

    try {
        let wsxBalance = await degenWSX.balanceOf(walletAddress);
        let wsxDecimals = await degenWSX.decimals();
        const wsxSupplyBalance: any = formatUnits(wsxBalance, wsxDecimals);
    

        let usdcBalance = await degenUSDC.balanceOf(walletAddress);
        let usdcDecimals = await degenUSDC.decimals();
        const usdcSupplyBalance: any = formatUnits(usdcBalance, usdcDecimals);
    
        console.log(`[Console] updateNetSupplyBalance values: ${typeof(wsxSupplyBalance)} wsxSupplyBalance: ${wsxSupplyBalance} & ${typeof(usdcSupplyBalance)} usdcSupplyBalance: ${usdcSupplyBalance}`)
        const netBalance = (Number(wsxSupplyBalance) * Number(wsxPrice)) + (Number(usdcSupplyBalance) * Number(usdcPrice));
        console.log(`[Console] updateNetSupplyBalance net balance: ${netBalance}`)
        return Number(netBalance);
    } catch (error) {
        console.log(`[Console] an error occured with updateNetSupplyBalance.  View here: \n\n ${error}`)
        return Number(-1);
    }

})

export const updateNetBorrowBalance = createAsyncThunk('netBorrowBalance/update', async () => {
    const [wallet] = onboard.state.get().wallets;
    if (wallet === undefined ) {
        return false;
    }

    const wsxBorrowBalance = useSelector(
        (state: RootState ) => state.wsx.borrowBalance
    );

    const usdcBorrowBalance = useSelector(
        (state: RootState ) => state.usdc.borrowBalance
    );

    const netBalance = wsxBorrowBalance + usdcBorrowBalance;

    return netBalance;
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

export const updateNetAPY = createAsyncThunk('netAPY/update', async () => {
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
            state.netSupplyBalance = action.payload;
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

