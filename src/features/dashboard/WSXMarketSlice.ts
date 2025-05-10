import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onboard, testnet_addresses } from '../../utils/web3';
import { ethers, Contract, formatUnits, parseUnits } from 'ethers';
import { API_URL } from "../../../src/utils/constant";

// ABIs
import Comptroller from '../../abis/Comptroller.json';
import ERC20Immutable from '../../abis/Erc20Immutable.json';
import SimplePriceOracle from '../../abis/SimplePriceOracle.json';
import ERC20 from '../../abis/ERC20.json';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/Store';


interface WSXState {
    loading: boolean;
    error: string;
    status: string,
    balance: number,
    borrowBalance: number,
    borrowRate: number,
    supplyBalance: number,
    supplyRate: number,
    isEnabled: boolean,
    isCollateral: boolean,
    oraclePrice: number,
    liquidityInUSD: number,
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
    isEnabled: false,
    isCollateral: false,
    oraclePrice: 1.0000,
    liquidityInUSD: 0.00,
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

export const isWSXListedAsCollateral = createAsyncThunk('wsxCollateral/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined ) {
        return false;
    }

    const accountAddress = wallet.accounts[0].address;

    try { 

        const getCollateral = await fetch(`${API_URL}/api/markets/wsx/isCollateral/${accountAddress}`).then((response) => {return response.json()});
        console.log(`[Console] successfully called on thunk 'isWSXListedAsCollateral' `)
        return getCollateral.isCollateral;
    } catch (error) {
        console.log(`[Console] unable to confirm WSX is listed as this wallet's collateral! \n ${error}`);
        return false;
    }
});

export const isWSXEnabled = createAsyncThunk('wsxCollateral/enabled', async () => {
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return false;
    }

    let accountAddress = wallet.accounts[0].address;

    try {
        const allowance = await fetch(`${API_URL}/api/markets/wsx/isEnabled/${accountAddress}`).then((res) => {return res.json()});
        console.log(`[Console] successfully called on thunk 'isWSXEnabled' `)
        return allowance.isEnabled;
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'isWSXEnabled': ${error}`);
        return false;
    }
})


export const updateWSXBalance = createAsyncThunk('wsxBalance/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    const accountAddress = wallet.accounts[0].address;

    try {

        let wsxBalance = await fetch(`${API_URL}/api/markets/wsx/balance/${accountAddress}`).then((res) => {return res.json()})
        console.log(`[Console] successfully called on thunk 'updateWSXBalance'`);

        return wsxBalance.balance;
    } catch (error) {

        console.log(`[Console] an error occured on thunk 'updateWSXBalance': ${error}`)
        return 0;
    }

});

export const updateWSXSupplyBalance = createAsyncThunk('wsxSupplyBalance/update', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    const accountAddress = wallet.accounts[0].address;
    try {

        const degenWSXBalance = await fetch(`${API_URL}/api/markets/wsx/supplyBalance/${accountAddress}`).then((res) => {return res.json()});

        console.log(`[Console] successfully called on thunk 'updateWSXSupplyBalance'`)
        return degenWSXBalance.supplyBalance;
    } catch(error) {
        console.log(`[Console] an error occured on thunk 'updateWSXSupplyBalance': ${error}`)
        return 0;
    }
});

export const updateWSXBorrowBalance = createAsyncThunk('wsxBorrowBalance/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    const accountAddress = wallet.accounts[0].address;

    try {
        const borrowBalance = await fetch(`${API_URL}/api/markets/wsx/borrowBalance/${accountAddress}`).then((res)=> { return res.json()});

        console.log(`[Console] successfully called on thunk 'updateWSXBorrowBalance'`);
        // return borrowBalance;

        return borrowBalance.borrowBalance;

    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateWSXBorrowBalance': ${error}`)
        return 0;
    }

});

export const updateWSXSupplyRate = createAsyncThunk('wsxSupplyRate/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (!wallet) {
        return 0;
    }

    try {

        const supplyRate: any = await fetch(`${API_URL}/api/markets/wsx/supplyAPY`).then((res) => {res.json()});

        // Return the APY as a percentage
        return Number(supplyRate.apy); // Convert to percentage
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updateSupplyRate': ${error}`);
        return 0;
    }

});

export const updateWSXBorrowRate = createAsyncThunk('wsxBorrowRate/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (!wallet) {
        return 0;
    }

    try {
        console.log(`[Console] successfully called on thunk 'updateBorrowRate'`);

        const borrowRate = await fetch(`${API_URL}/api/markets/wsx/borrowAPY`).then((res) => { return res.json()});
        // Return the APY as a percentage
        return Number(borrowRate.apy); // Convert to percentage
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updateBorrowRate': ${error}`);
        return 0;
    }

});

export const updateWSXLiquidityInUSD = createAsyncThunk('wsxLiquidity/update', async () => {
    
        const [wallet] = onboard.state.get().wallets;
    
        if (!wallet) {
            return 0;
        }
    
        try {
            const getLiquidity = await fetch(`${API_URL}/api/markets/wsx/marketLiquidity`).then((res) => {return res.json()})
            
            console.log(`[Console] successfully called on thunk 'updateLiquidityInUSD' ${getLiquidity.wsxLiquidityInUSD}`);
    
            return getLiquidity.wsxLiquidityInUSD;
        } catch (error) {
            console.log(`[Console] an error occurred on thunk 'updateLiquidityInUSD': ${error}`);
            return 0;
        }
})


export const updateWSXOraclePrice = createAsyncThunk('wsxOraclePrice/update', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }
    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const priceOracle = new Contract( testnet_addresses.price_oracle, SimplePriceOracle.abi, signer)
    const WSX = new Contract(testnet_addresses.WSX, ERC20Immutable.abi, ethersProvider);

    try {
     let WSXPriceMantissa = await priceOracle.getUnderlyingPrice(testnet_addresses.degenWSX);
     const decimals = await WSX.decimals();
     console.log(`[Console] successfully got the oracle price from 'updatePriceOracle': ${WSXPriceMantissa} `);
     const wsxPrice = formatUnits(WSXPriceMantissa, decimals);
     return Number(wsxPrice);
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


    try {
           
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const WSXContract = new Contract(testnet_addresses.WSX,ERC20.abi, signer );
    const spender = testnet_addresses.degenWSX;

    console.log(`[Console] approve details loaded, attempting to execute now`);
        const txn = await WSXContract.approve(spender, parseUnits("100000"));
        console.log(`[Console] calling txn: ${txn}`);
        await txn.wait();
        console.log(`[Console] successfully called on thunk 'approveWSX'`);

    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'approveWSX' : ${error}`)
    }

})

///////////  Supply Market Thunks
export const supplyWSX = createAsyncThunk('wsx/supply', async (supplyAmount: number) => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }
    console.log(`[Console] initiating thunk, 'supplyWSX' ...`);

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    console.log(`[Console] signer & provider setup properly`);

    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, signer);
    const amount = parseUnits(`${supplyAmount}`);
    console.log(`[Console] attempting to mint now...`);


    try {
        const tx = await degenWSX.mint(amount);
        await tx.wait();
        console.log(`[Console] successfully called on thunk 'supplyWSX'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'supplyWSX': ${error} `)

    }
})

export const withdrawWSX = createAsyncThunk('wsx/withdraw', async (withdrawAmount: number) => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }
    console.log(`[Console] initiating thunk, 'withdrawWSX' ...`);

    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, signer);
    const amount = parseUnits(`${withdrawAmount}`);
    console.log(`[Console] attempting to withdraw now...`);

    try {
        const tx = await degenWSX.redeemUnderlying(amount);
        await tx.wait();
        console.log(`[Console] successfully called on thunk 'withdrawWSX'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'withdrawWSX': ${error} `)

    }

})

///////////  Borrow Market Thunks
export const repayWSX = createAsyncThunk('wsx/repay', async (repayAmount: number) => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'repayWSX' ...`);

    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, signer);
    const amount = parseUnits(`${repayAmount}`);
    console.log(`[Console] attempting to repay borrow now...`);

    try {
        const tx = await degenWSX.repayBorrow(amount);
        await tx.wait();
        console.log(`[Console] successfully called on thunk 'repayWSX'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'repayWSX': ${error} `)
    }

})

export const borrowWSX = createAsyncThunk('wsx/borrow', async (borrowAmount: number) => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();

    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, signer);

    const amount = parseUnits(`${borrowAmount}`);

    try {
        const tx = await degenWSX.borrow(amount);
        await tx.wait();
        console.log(`[Console] successfully called on thunk 'borrowWSX'`);
    } catch (error: any) {
        if (error?.reason) {
            console.error(`[Console] Borrow failed with reason: ${error.reason}`);
        } else if (error?.data) {
            console.error(`[Console] Borrow failed with data: ${JSON.stringify(error.data)}`);
        } else {
            console.error(`[Console] Borrow failed with unknown error: ${error.message}`);
        }
    }    
    
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

        builder.addCase(updateWSXBorrowBalance.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateWSXBorrowBalance.rejected, (state, action) => {
            state.status = "failed";
            state.borrowBalance = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateWSXBorrowBalance.fulfilled, (state, action) => {
            state.status = "completed";
            state.borrowBalance = action.payload;
        })

        // Supply Balance
        
        builder.addCase(updateWSXSupplyBalance.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateWSXSupplyBalance.rejected, (state, action) => {
            state.status = "failed";
            state.supplyBalance = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateWSXSupplyBalance.fulfilled, (state, action) => {
            state.status = "completed";
            state.supplyBalance = action.payload;
        })


        builder.addCase(isWSXListedAsCollateral.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        })

        builder.addCase(isWSXListedAsCollateral.rejected, (state, action) => {
            state.status = "failed";
            state.error = `${action.error}`;
        })

        builder.addCase(isWSXListedAsCollateral.fulfilled, (state, action) => {
            state.status = "completed";
            state.isCollateral = action.payload;
        })

        builder.addCase(isWSXEnabled.pending, (state, action) => {
            state.status = "loading";
            state.isEnabled = false;
        })
        builder.addCase(isWSXEnabled.rejected, (state, action) => {
            state.status = "loading";
            state.isEnabled = false;
        })
        builder.addCase(isWSXEnabled.fulfilled, (state, action) => {
            state.status = "loading";
            state.isEnabled = action.payload;
        })

        builder.addCase(updateWSXLiquidityInUSD.fulfilled, (state, action) => {
            state.status = "completed"
            state.liquidityInUSD = action.payload;
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

        builder.addCase(approveWSX.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(approveWSX.rejected, (state, action) => {
            state.loading = false;
            state.isEnabled = false;
        });

        builder.addCase(approveWSX.fulfilled, (state, action) => {
            state.loading = false;
            state.isEnabled = true;
        });
    }
});

export default WSXSlice.reducer;