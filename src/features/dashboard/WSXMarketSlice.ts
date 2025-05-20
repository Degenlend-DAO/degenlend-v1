import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onboard, testnet_addresses } from '../../utils/web3';
import { ethers, Contract, formatUnits, parseUnits } from 'ethers';
import { API_URL, ORACLE_URL } from "../../../src/utils/constant";

// ABIs
import ERC20 from '../../abis/ERC20.json';
import { getCurrentNonce, signBorrowIntent, signMintIntent, signRedeemIntent, signRepayIntent } from '../../utils/Intents';

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

// Helpers
export const toWei = (value: string|number, decimals = 18) =>
    parseUnits(value.toString(), decimals);

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
        
        console.log(`[Console] successfully called on thunk 'updateWSXSupplyBalance'.  value: ${degenWSXBalance.supplyBalance}`)
        return Number(degenWSXBalance.supplyBalance);
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
        const supplyRate = await fetch(`${API_URL}/api/markets/wsx/supplyAPY`).then((res) => {return res.json()});
        console.log(`[Console] successfully called on thunk 'updateWSXSupplyRate`)
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

    try {

     const req = await fetch(`${ORACLE_URL}/api/prices`)
     const wsxPrice = await req.json();
     console.log(`[Console] successfully called on thunk 'updateUSDCOraclePrice' with values ${wsxPrice}`)
     return Number(wsxPrice.prices.SX);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updatePriceOracle': ${error} `)
        return 0;
    }
    
})

// Activities

///////////  Approve WSX Thunks
export const approveWSX = createAsyncThunk('wsx/approve', async (_, { rejectWithValue }) => {
   
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'approveWSX' ...`);


    try {
           
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const WSXContract = new Contract(testnet_addresses.WSX,ERC20.abi, signer );
    const spender = testnet_addresses.degenlendRelayer;

    console.log(`[Console] approve details loaded, attempting to execute now`);
        const txn = await WSXContract.approve(spender, parseUnits("100000"));
        console.log(`[Console] calling txn: ${txn}`);
        await txn.wait();
        console.log(`[Console] successfully called on thunk 'approveWSX'`);

    } catch (error: any) {
        console.log(`[Console] an error occurred on thunk 'approveWSX' : ${error}`)
        return rejectWithValue(error.message);
    }

})

///////////  Supply Market Thunks
export const supplyWSX = createAsyncThunk('wsx/supply', async (supplyAmount: number, { rejectWithValue }) => {
    
    const chainId = 647;
    const relayerAddress = testnet_addresses.degenlendRelayer;

    const [wallet] = onboard.state.get().wallets;
    const signer = await new ethers.BrowserProvider(wallet.provider).getSigner();
    const user = wallet.accounts[0].address;
    const cToken = testnet_addresses.degenWSX;
    const amount = toWei(supplyAmount, 8);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const nonce = await getCurrentNonce(user);
    console.log(`all intent data, in order: ${user}, ${cToken}, ${amount}, ${nonce}, ${deadline}`)
    const intentData = { user, cToken, amount, nonce, deadline };


    try {
        const signature = await signMintIntent(signer, chainId, relayerAddress, intentData);
        const body = JSON.stringify({
            user: wallet.accounts[0].address,   // EIP‑712 signer
            cToken: cToken,
            amount: Number(amount),
            deadline: deadline,
            signature: signature
          });
      
          const res = await fetch(`${API_URL}/api/intent/mint`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
          });

          let tx = await res.json();
        console.log(`[Console] successfully called on thunk 'supplyWSX' hash: ${tx.hash}`);
    } catch (error: any) {
        if (error?.reason) {
            console.error(`[Console] Borrow failed with reason: ${error.reason}`);
            return rejectWithValue(error.message);
        } else if (error?.data) {
            console.error(`[Console] Borrow failed with data: ${JSON.stringify(error.data)}`);
            return rejectWithValue(error.message);
        } else {
            console.error(`[Console] Borrow failed with unknown error: ${error.message}`);
            return rejectWithValue(error.message);
        }
    }
})

export const withdrawWSX = createAsyncThunk('wsx/withdraw', async (withdrawAmount: number, { rejectWithValue }) => {
    
    const chainId = 647;
    const relayerAddress = testnet_addresses.degenlendRelayer;

    const [wallet] = onboard.state.get().wallets;
    const signer = await new ethers.BrowserProvider(wallet.provider).getSigner();
    const user = wallet.accounts[0].address;
    const cToken = testnet_addresses.degenWSX;
    const amount = toWei(withdrawAmount, 8);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const nonce = await getCurrentNonce(user);
    const intentData = { user, cToken, amount, nonce, deadline };

    try {
        const signature = await signRedeemIntent(signer, chainId, relayerAddress, intentData);
        const body = JSON.stringify({
            user: wallet.accounts[0].address,   // EIP‑712 signer
            cToken: cToken,
            amount: Number(amount),
            deadline: deadline,
            signature: signature
          });
      
          const res = await fetch(`${API_URL}/api/intent/redeem`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
          });

          let tx = await res.json();
        console.log(`[Console] successfully called on thunk 'withdrawWSX' ${tx.txHash}`);
    } catch (error: any) {
        if (error?.reason) {
            console.error(`[Console] Borrow failed with reason: ${error.reason}`);
            return rejectWithValue(error.message);
        } else if (error?.data) {
            console.error(`[Console] Borrow failed with data: ${JSON.stringify(error.data)}`);
            return rejectWithValue(error.message);
        } else {
            console.error(`[Console] Borrow failed with unknown error: ${error.message}`);
            return rejectWithValue(error.message);
        }

    }

})

///////////  Borrow Market Thunks
export const repayWSX = createAsyncThunk('wsx/repay', async (repayAmount: number, { rejectWithValue }) => {
    
    const chainId = 647;
    const relayerAddress = testnet_addresses.degenlendRelayer;

    const [wallet] = onboard.state.get().wallets;
    const signer = await new ethers.BrowserProvider(wallet.provider).getSigner();
    const user = wallet.accounts[0].address;
    const cToken = testnet_addresses.degenWSX;
    const amount = toWei(repayAmount, 8);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const nonce = await getCurrentNonce(user);
    const intentData = { user, cToken, amount, nonce, deadline };

    try {
        const signature = await signRepayIntent(signer, chainId, relayerAddress, intentData);
        const body = JSON.stringify({
            user: wallet.accounts[0].address,   // EIP‑712 signer
            cToken: cToken,
            amount: Number(amount),
            deadline: deadline,
            signature: signature
          });
      
          const res = await fetch(`${API_URL}/api/intent/repay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
          });

          let tx = await res.json();
        console.log(`[Console] successfully called on thunk 'repayWSX' ${tx.txHash}`);
    } catch (error: any) {
        if (error?.reason) {
            console.error(`[Console] Borrow failed with reason: ${error.reason}`);
            return rejectWithValue(error.message);
        } else if (error?.data) {
            console.error(`[Console] Borrow failed with data: ${JSON.stringify(error.data)}`);
            return rejectWithValue(error.message);
        } else {
            console.error(`[Console] Borrow failed with unknown error: ${error.message}`);
            return rejectWithValue(error.message);
        }

    }

})

export const borrowWSX = createAsyncThunk('wsx/borrow', async (borrowAmount: number, { rejectWithValue }) => {
    
    const chainId = 647;
    const relayerAddress = testnet_addresses.degenlendRelayer;

    const [wallet] = onboard.state.get().wallets;
    const signer = await new ethers.BrowserProvider(wallet.provider).getSigner();
    const user = wallet.accounts[0].address;
    const cToken = testnet_addresses.degenWSX;
    const amount = toWei(borrowAmount, 8);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const nonce = await getCurrentNonce(user);
    const intentData = { user, cToken, amount, nonce, deadline };

    try {
        const signature = await signBorrowIntent(signer, chainId, relayerAddress, intentData);
        const body = JSON.stringify({
            user: wallet.accounts[0].address,   // EIP‑712 signer
            cToken: cToken,
            amount: Number(amount),
            deadline: deadline,
            signature: signature
          });
      
          const res = await fetch(`${API_URL}/api/intent/borrow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
          });

          let tx = await res.json();
        console.log(`[Console] successfully called on thunk 'borrowWSX' ${tx.txHash}`);
    } catch (error: any) {
        if (error?.reason) {
            console.error(`[Console] Borrow failed with reason: ${error.reason}`);
            return rejectWithValue(error.message);
        } else if (error?.data) {
            console.error(`[Console] Borrow failed with data: ${JSON.stringify(error.data)}`);
            return rejectWithValue(error.message);
        } else {
            console.error(`[Console] Borrow failed with unknown error: ${error.message}`);
            return rejectWithValue(error.message);
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

        builder.addCase(borrowWSX.pending, (state, action) => {
            state.loading = true;

        });

        builder.addCase(borrowWSX.rejected, (state, action) => {});

        builder.addCase(borrowWSX.fulfilled, (state, action) => {});

        // Repay Wrapped SX

        builder.addCase(repayWSX.pending, (state, action) => {
            state.loading = true;

        });

        builder.addCase(repayWSX.rejected, (state, action) => {});

        builder.addCase(repayWSX.fulfilled, (state, action) => {});

        // Supply Wrapped SX

        builder.addCase(supplyWSX.pending, (state, action) => {
            state.loading = true;

        });

        builder.addCase(supplyWSX.rejected, (state, action) => {});

        builder.addCase(supplyWSX.fulfilled, (state, action) => {});

        // Withdraw Wrapped SX

        builder.addCase(withdrawWSX.pending, (state, action) => {
            state.loading = true;

        });

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