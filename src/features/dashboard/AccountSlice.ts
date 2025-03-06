import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onboard, testnet_addresses } from '../../utils/web3';
import { API_URL } from '../../utils/constant';
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
    if (!wallet) {
        return 0;
    }

    try {

        const usdcDegenUSDCBalance = await fetch(`${API_URL}/api/account/supplyBalance/${wallet.accounts[0].address}`).then((response) => { return response.json()});

        const netSupplyBalance = usdcDegenUSDCBalance.data.supplyBalance;
        console.log(`[Console] successfully called on thunk 'updateNetSupplyBalance'.  Values: usdcDegenUSDCBalance: ${usdcDegenUSDCBalance}, netSupplyBalance: ${netSupplyBalance}`);
        return Number(netSupplyBalance);
    } catch (error) {
        console.error("Error fetching net supply balance:", error);
        throw new Error('Failed to update net supply balance');
    }
});


export const updateNetBorrowBalance = createAsyncThunk('netBorrowBalance/update', async () => {
    const [wallet] = onboard.state.get().wallets;

    if (!wallet) {
        return 0;
    }
    try {
        const usdcDegenUSDCBalance = await fetch(`${API_URL}/api/account/borrowBalance/${wallet.accounts[0].address}`).then((response) => {return response.json()});
        const netBorrowBalance = usdcDegenUSDCBalance.data.borrowBalance;
        console.log(`[Console] successfully called on thunk 'updateNetBorrowBalance'.  Values: usdcDegenUSDCBalance: ${usdcDegenUSDCBalance}, netBorrowBalance: ${netBorrowBalance}`);
        return netBorrowBalance;
    } catch (error) {
        console.error("Error fetching borrow balances:", error);
        throw new Error('Failed to update net borrow balance');
    }
});


export const updateAccountLiquidity = createAsyncThunk('liquidity/update', async () => {
    const [wallet] = onboard.state.get().wallets;

    if (!wallet) {
        return 0;
    }

    try {

        const formattedLiquidityInUSD = await fetch(`${API_URL}/api/account/liquidity/${wallet.accounts[0].address}`).then((response) => { return response.json() });   
        console.log(`[Console] successfully called on thunk 'updateAccountLiquidity'`);

        return formattedLiquidityInUSD.data.liquidity;
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updateAccountLiquidity': ${error}`);
        return 0;
    }
});



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

    if (!wallet) {
        return {
            liquidity: 0,
            borrowBalanceInUSD: 0,
            borrowLimitUsed: 0
        }
    }

    const walletAddress = wallet.accounts[0].address;
    const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const comptroller = new Contract(testnet_addresses.comptroller, Comptroller.abi, ethersProvider);
    const wsxContract = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);
    const priceOracle = new Contract(testnet_addresses.price_oracle, SimplePriceOracle.abi, ethersProvider);

    try {
        // Fetch liquidity and shortfall
        const [error, liquidity, shortfall] = await comptroller.getAccountLiquidity(walletAddress);

        if (error !== 0 || !shortfall.isZero()) {
            console.error("Comptroller.getAccountLiquidity failed:", error);
            return { liquidity: 0, shortfall: 0, borrowLimitUsed: 0 };
        }

        // Fetch current borrow balance in WSX
        const borrowBalanceMantissa = await wsxContract.borrowBalanceStored(walletAddress);
        const formattedBorrowBalance = parseFloat(formatUnits(borrowBalanceMantissa, 18));

        // Fetch WSX price from the price oracle
        const wsxPriceMantissa = await priceOracle.getUnderlyingPrice(testnet_addresses.degenWSX);
        const wsxPrice = parseFloat(formatUnits(wsxPriceMantissa, 18));

        // Calculate borrow balance in USD
        const borrowBalanceInUSD = formattedBorrowBalance * wsxPrice;

        // Format liquidity in USD
        const formattedLiquidityInUSD = parseFloat(formatUnits(liquidity, 18));

        // Calculate Borrow Limit Usage as a percentage
        const borrowLimitUsed = (borrowBalanceInUSD / formattedLiquidityInUSD) * 100;

        console.log(`[Console] Borrow Limit Used: ${borrowLimitUsed}%`);

        return {
            liquidity: formattedLiquidityInUSD,
            borrowBalanceInUSD,
            borrowLimitUsed: Number(borrowLimitUsed.toFixed(2)) // return as a percentage with 2 decimal places
        };

    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updateBorrowLimit': ${error}`);
        return {
            liquidity: 0,
            borrowBalanceInUSD: 0,
            borrowLimitUsed: 0
        };
    }
});



export const updateNetAPY = createAsyncThunk('netAPY/update', async () => {
    const [wallet] = onboard.state.get().wallets;

    // if (!wallet) {
    //     return 0;
    // }

    try {
        const apy = await fetch(`${API_URL}/api/account/apy/${wallet.accounts[0].address}`).then((response) => { return response.json() });
        const netAPY = apy.data.netApy;
        console.log(`[Console] successfully called on thunk 'updateNetAPY'.  Values: apy: ${apy}, netAPY: ${netAPY}`);
        return netAPY;
    } catch (error) {
        console.error("Error fetching APY rates:", error);
        throw new Error('Failed to update net APY');
    }
});



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

        //  Net Supply Balance
        builder.addCase(updateNetSupplyBalance.pending, (state) => {
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

            // Net Borrow Balance
    builder.addCase(updateNetBorrowBalance.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(updateNetBorrowBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.netBorrowBalance = action.payload;
    });
    builder.addCase(updateNetBorrowBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
    });

    // Net APY
    builder.addCase(updateNetAPY.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(updateNetAPY.fulfilled, (state, action) => {
        state.loading = false;
        state.netAPY = action.payload;
    });
    builder.addCase(updateNetAPY.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
    });

    // Borrow Limit
    builder.addCase(updateBorrowLimit.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(updateBorrowLimit.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowLimit = action.payload.borrowLimitUsed;
    });
    builder.addCase(updateBorrowLimit.rejected, (state, action) => {
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

