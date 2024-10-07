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

// Helper to get contract instances
const getContract = (address: string, abi: any, signer: any) => {
    return new ethers.Contract(address, abi, signer);
};

// Views

export const updateNetSupplyBalance = createAsyncThunk('netSupplyBalance/update', async () => {
    const [wallet] = onboard.state.get().wallets;

    if (!wallet) {
        return 0;
    }

    const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();

    const wsxAddress = testnet_addresses.degenWSX;
    const usdcAddress = testnet_addresses.degenUSDC;
    const oracleAddress = testnet_addresses.price_oracle;

    if (!wsxAddress || !usdcAddress || !oracleAddress) {
        throw new Error("Missing contract addresses. Check testnet_addresses.");
    }

    const priceOracle = getContract(oracleAddress, SimplePriceOracle.abi, signer);
    const degenWSX = getContract(wsxAddress, ERC20Immutable.abi, signer);
    const degenUSDC = getContract(usdcAddress, ERC20Immutable.abi, signer);

    try {
        const [wsxDecimals, usdcDecimals, wsxPrice, usdcPrice, wsxBalance, usdcBalance, wsxExchangeRateMantissa, usdcExchangeRateMantissa ] = await Promise.all([
            degenWSX.decimals(),
            degenUSDC.decimals(),
            priceOracle.getUnderlyingPrice(wsxAddress),
            priceOracle.getUnderlyingPrice(usdcAddress),
            degenWSX.balanceOf(wallet.accounts[0].address),
            degenUSDC.balanceOf(wallet.accounts[0].address),
            degenWSX.exchangeRateStored(),
            degenUSDC.exchangeRateStored(),
        ]);

        const rawDegenWSXBalance = formatUnits(wsxBalance, wsxDecimals);
        const rawDegenUSDCBalance = formatUnits(usdcBalance, usdcDecimals);
        const formattedWSXExchangeRate = formatUnits(wsxExchangeRateMantissa, wsxDecimals);
        const formattedUSDCExchangeRate = formatUnits(usdcExchangeRateMantissa, usdcDecimals);
        const formattedWSXPrice = formatUnits(wsxPrice, wsxDecimals);
        const formattedUSDCPrice = formatUnits(usdcPrice, usdcDecimals);
        const DegenWSXBalance = Number(rawDegenWSXBalance) * Number(formattedWSXExchangeRate);
        const DegenUSDCBalance = Number(rawDegenUSDCBalance) * Number(formattedUSDCExchangeRate);   
        // Proper formatting and calculation of net supply balance

        const usdDegenUSDCBalance = Number(formattedUSDCPrice) * Number(DegenUSDCBalance);
        const usdDegenWSXBalance = Number(formattedWSXPrice) * Number(DegenWSXBalance);
        const netSupplyBalance = usdDegenUSDCBalance + usdDegenWSXBalance;

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

    const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();

    const wsxContract = getContract(testnet_addresses.degenWSX, ERC20Immutable.abi, signer);
    const usdcContract = getContract(testnet_addresses.degenUSDC, ERC20Immutable.abi, signer);

    try {
        const [wsxBorrowBalance, usdcBorrowBalance] = await Promise.all([
            wsxContract.borrowBalanceStored(wallet.accounts[0].address),
            usdcContract.borrowBalanceStored(wallet.accounts[0].address),
        ]);

        // Convert borrow balances to readable format
        const totalBorrowBalance = parseFloat(formatUnits(wsxBorrowBalance, 18)) + parseFloat(formatUnits(usdcBorrowBalance, 6)); // USDC is 6 decimals

        return totalBorrowBalance;
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

    const walletAddress = wallet.accounts[0].address;
    const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const comptroller = new Contract(testnet_addresses.comptroller, Comptroller.abi, ethersProvider);

    try {
        const [liquidity] = await comptroller.getAccountLiquidity(walletAddress);  // Get the liquidity (first item in the response array)

        const formattedLiquidity = parseFloat(formatUnits(liquidity, 18));  // Format liquidity from 1e18
        console.log(`[Console] successfully called on thunk 'updateAccountLiquidity'`);

        return formattedLiquidity;
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

    if (!wallet) {
        return 0;
    }

    const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();

    const wsxContract = getContract(testnet_addresses.degenWSX, ERC20Immutable.abi, signer);
    const usdcContract = getContract(testnet_addresses.degenUSDC, ERC20Immutable.abi, signer);

    try {
        // Fetch supply and borrow balances for WSX and USDC
        const [wsxSupplyRate, wsxBorrowRate, usdcSupplyRate, usdcBorrowRate] = await Promise.all([
            wsxContract.supplyRatePerBlock(),
            wsxContract.borrowRatePerBlock(),
            usdcContract.supplyRatePerBlock(),
            usdcContract.borrowRatePerBlock(),
        ]);

        const [wsxSuppliedAmount, usdcSuppliedAmount] = await Promise.all([
            wsxContract.balanceOf(wallet.accounts[0].address),
            usdcContract.balanceOf(wallet.accounts[0].address)
        ]);

        const [wsxBorrowedAmount, usdcBorrowedAmount] = await Promise.all([
            wsxContract.borrowBalanceStored(wallet.accounts[0].address),
            usdcContract.borrowBalanceStored(wallet.accounts[0].address)
        ]);

        const wsxSupplyRateDecimal = parseFloat(formatUnits(wsxSupplyRate, 18));
        const wsxBorrowRateDecimal = parseFloat(formatUnits(wsxBorrowRate, 18));
        const usdcSupplyRateDecimal = parseFloat(formatUnits(usdcSupplyRate, 18));
        const usdcBorrowRateDecimal = parseFloat(formatUnits(usdcBorrowRate, 18));

        const wsxSupplied = parseFloat(formatUnits(wsxSuppliedAmount, 18));
        const usdcSupplied = parseFloat(formatUnits(usdcSuppliedAmount, 6));
        const wsxBorrowed = parseFloat(formatUnits(wsxBorrowedAmount, 18));
        const usdcBorrowed = parseFloat(formatUnits(usdcBorrowedAmount, 6));

        // Dummy values for testing
            // const wsxSupplyRateDecimal = 0.00001; // Dummy supply rate for WSX (0.001%)
            // const wsxBorrowRateDecimal = 0.00002; // Dummy borrow rate for WSX (0.002%)
            // const usdcSupplyRateDecimal = 0.00003; // Dummy supply rate for USDC (0.003%)
            // const usdcBorrowRateDecimal = 0.00004; // Dummy borrow rate for USDC (0.004%)

            // const wsxSupplied = 1000; // Dummy supply amount (1000 WSX)
            // const usdcSupplied = 500;  // Dummy supply amount (500 USDC)
            // const wsxBorrowed = 300;   // Dummy borrow amount (300 WSX)
            // const usdcBorrowed = 200;  // Dummy borrow amount (200 USDC)


        // Calculate the total supply contribution (supplyAPY * suppliedAmount)
        const totalSupplyContribution = (wsxSupplyRateDecimal * wsxSupplied) + (usdcSupplyRateDecimal * usdcSupplied);

        // Calculate the total borrow contribution (borrowAPY * borrowedAmount)
        const totalBorrowContribution = (wsxBorrowRateDecimal * wsxBorrowed) + (usdcBorrowRateDecimal * usdcBorrowed);

        // Calculate net APY
        const netContribution = totalSupplyContribution - totalBorrowContribution;

        // Get total supplied and borrowed values
        const totalSuppliedValue = wsxSupplied + usdcSupplied;
        const totalBorrowedValue = wsxBorrowed + usdcBorrowed;

        let netAPY = 0;
        if (netContribution > 0 && totalSuppliedValue > 0) {
            netAPY = (netContribution / totalSuppliedValue) * 100;
        } else if (netContribution < 0 && totalBorrowedValue > 0) {
            netAPY = (netContribution / totalBorrowedValue) * 100;
        }

        console.log(`[Console] Net APY: ${netAPY}`);
        return netAPY * 100;
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

