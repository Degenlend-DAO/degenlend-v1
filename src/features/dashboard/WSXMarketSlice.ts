import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onboard, testnet_addresses } from '../../utils/web3';
import { ethers, Contract, formatUnits } from 'ethers'

// ABIs
import ERC20Immutable from '../../abis/Erc20Immutable.json';
import SimplePriceOracle from '../../abis/SimplePriceOracle.json';
import ERC20 from '../../abis/ERC20.json';

interface WSXState {
    loading: boolean;
    error: string;
    status: string,
    balance: number,
    borrowBalance: number,
    borrowRate: number,
    supplyBalance: number,
    supplyRate: number,
    isCollateral: boolean,
    oraclePrice: number,
}

const initialState: WSXState = {
    loading: false,
    error: "",
    status: 'initial',
    borrowRate: 0.00,
    borrowBalance: 0.00,
    balance: 0.00,
    supplyBalance: 0.00,
    supplyRate: 0.00,
    isCollateral: false,
    oraclePrice: 1.0000
}

interface approveWSXParams {
    amount: number,
    addressToApprove: string,
}

interface supplyWSXParams {
    amount: number,
    addressToApprove: string,
}

interface withdrawWSXParams {
    amount: number,
}


// Views



export const updateWSXBalance = createAsyncThunk('wsxBalance/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const WSX = new Contract(testnet_addresses.WSX, ERC20Immutable.abi, ethersProvider);
    const decimals = await WSX.decimals();
    const walletAddress = wallet.accounts[0].address;

    try {

        let wsxBalance = await WSX.balanceOf(walletAddress);
        const balance = formatUnits(wsxBalance, decimals)
        console.log(`[Console] successfully called on thunk 'updateWSXBalance'`);

        return Number(balance);
    } catch (error) {

        console.log(`[Console] an error occured on thunk 'updateWSXBalance': ${error}`)
        return 0;
    }

});

export const updateSupplyBalance = createAsyncThunk('wsxSupplyBalance/update', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);

    const walletAddress = wallet.accounts[0].address;
    // This code is currently incomplete
    try {
        console.log(`[Console] successfully called on thunk 'updateSupplyBalance -- but nothing was executed!'`)
        return 0;
    } catch(error) {
        console.log(`[Console] an error occured on thunk 'updateSupplyBalance': ${error}`)
        return 0;
    }
    });

export const updateBorrowBalance = createAsyncThunk('wsxBorrowBalance/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);
    const walletAddress = wallet.accounts[0].address;

    try {
        const borrowBalanceMantissa = await degenWSX.borrowBalanceCurrent(walletAddress);
        const decimals = await degenWSX.decimals();
        const borrowBalance = formatUnits(borrowBalanceMantissa, decimals);

        console.log(`[Console] successfully called on thunk 'updateBorrowBalance'`);
        // return borrowBalance;

        return 0;

    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateBorrowBalance': ${error}`)
        return 0;
    }

});

export const updateWSXSupplyRate = createAsyncThunk('wsxSupplyRate/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);

    try {
        const  supplyRateMantissa = await degenWSX.supplyRatePerBlock();
        const decimals = await degenWSX.decimals()
        const supplyRate = formatUnits(supplyRateMantissa, decimals);
        console.log(`[Console] successfully called on thunk 'updateSupplyRate'`);

        return Number(supplyRate);
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateSupplyRate': ${error}`)
        return 0;
    }

});

export const updateWSXBorrowRate = createAsyncThunk('wsxBorrowRate/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);

    try {
        const  borrowRateMantissa = await degenWSX.borrowRatePerBlock();
        const decimals = await degenWSX.decimals();
        const borrowRate = formatUnits(borrowRateMantissa, decimals);
        console.log(`[Console] successfully called on thunk 'updateBorrowRate'`);

        return Number(borrowRate);
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateBorrowRate': ${error}`)
        return 0;
    }

});

export const updateWSXOraclePrice = createAsyncThunk('wsxOraclePrice/update', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }
    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const priceOracle = new Contract( testnet_addresses.price_oracle, SimplePriceOracle.abi, signer)
    
    try {
     let wsxPrice = await priceOracle.getUnderlyingPrice(testnet_addresses.degenWSX);
     console.log(`[Console] successfully got the oracle price from 'updatePriceOracle': ${wsxPrice} `);
     return wsxPrice as number;
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updatePriceOracle': ${error} `)
        return 0;
    }
    
})

// Activities

///////////  Approve WSX Thunks
export const approveWSX = createAsyncThunk('wsx/approve', async () => {
   
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'approveWSX' ...`);

   
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const WSXContract = new Contract( testnet_addresses.degenWSX,ERC20.abi, signer );

    try {
        WSXContract.approve();
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'approveWSX' : ${error}`)
    }

})

///////////  Supply Market Thunks
export const supplyWSX = createAsyncThunk('wsx/supply', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, signer);
    const supplyAmount = 1 * 1e18;

    console.log(`[Console] initiating thunk, 'supplyWSX' ...`);


    try {
        const tx = await degenWSX.mint(supplyAmount);
        tx.wait();
        console.log(`[Console] successfully called on thunk 'supplyWSX'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'supplyWSX': ${error} `)

    }
})

export const withdrawWSX = createAsyncThunk('wsx/withdraw', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }
    console.log(`[Console] initiating thunk, 'withdrawWSX' ...`);

    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
})

///////////  Borrow Market Thunks
export const repayWSX = createAsyncThunk('wsx/repay', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'repayWSX' ...`);

    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
})

export const borrowWSX = createAsyncThunk('wsx/borrow', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'borrowWSX' ...`);


    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();

    
})




/// Exporting the Slice
export const WSXSlice = createSlice({
    name: "WSX",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        ///////////  Views

        //  Price Oracle
        builder.addCase(updateWSXOraclePrice.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateWSXOraclePrice.rejected, (state, action) => {
            state.status = "failed";
            state.oraclePrice = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateWSXOraclePrice.fulfilled, (state, action) => {
            state.status = "completed";
            state.oraclePrice = action.payload;
        })

        // Borrow Rate

        builder.addCase(updateWSXBorrowRate.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateWSXBorrowRate.rejected, (state, action) => {
            state.status = "failed";
            state.borrowRate = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateWSXBorrowRate.fulfilled, (state, action) => {
            state.status = "completed";
            state.borrowRate = action.payload;
        })

        // Supply Rate

        builder.addCase(updateWSXSupplyRate.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateWSXSupplyRate.rejected, (state, action) => {
            state.status = "failed";
            state.supplyRate = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateWSXSupplyRate.fulfilled, (state, action) => {
            state.status = "completed";
            state.supplyRate = action.payload;
        })

        // WSX Balance

        builder.addCase(updateWSXBalance.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateWSXBalance.rejected, (state, action) => {
            state.status = "failed";
            state.balance = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateWSXBalance.fulfilled, (state, action) => {
            state.status = "completed";
            state.balance = action.payload;
        })

        // Borrow Balance

        builder.addCase(updateBorrowBalance.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateBorrowBalance.rejected, (state, action) => {
            state.status = "failed";
            state.borrowBalance = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateBorrowBalance.fulfilled, (state, action) => {
            state.status = "completed";
            state.borrowBalance = action.payload;
        })

        // Supply Balance
        
        builder.addCase(updateSupplyBalance.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateSupplyBalance.rejected, (state, action) => {
            state.status = "failed";
            state.supplyBalance = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateSupplyBalance.fulfilled, (state, action) => {
            state.status = "completed";
            state.supplyBalance = action.payload;
        })
        
        
        ///////////  Activities

        // Borrow Wrapped SX

        builder.addCase(borrowWSX.pending, (state, action) => {});

        builder.addCase(borrowWSX.rejected, (state, action) => {});

        builder.addCase(borrowWSX.fulfilled, (state, action) => {});

        // Repay Wrapped SX

        builder.addCase(repayWSX.pending, (state, action) => {});

        builder.addCase(repayWSX.rejected, (state, action) => {});

        builder.addCase(repayWSX.fulfilled, (state, action) => {});

        // Supply Wrapped SX

        builder.addCase(supplyWSX.pending, (state, action) => {});

        builder.addCase(supplyWSX.rejected, (state, action) => {});

        builder.addCase(supplyWSX.fulfilled, (state, action) => {});

        // Withdraw Wrapped SX

        builder.addCase(withdrawWSX.pending, (state, action) => {});

        builder.addCase(withdrawWSX.rejected, (state, action) => {});

        builder.addCase(withdrawWSX.fulfilled, (state, action) => {});

        // Approve Wrapped SX

        builder.addCase(approveWSX.pending, (state, action) => {});

        builder.addCase(approveWSX.rejected, (state, action) => {});

        builder.addCase(approveWSX.fulfilled, (state, action) => {});
    }
});



export default WSXSlice.reducer;

// Note for devs: Please don't forget to implement supply & borrow balances