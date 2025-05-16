import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers, Contract, formatUnits, parseUnits } from 'ethers';
import { API_URL, ORACLE_URL } from '../../../src/utils/constant';
import { onboard, testnet_addresses } from '../../utils/web3';

// ABIs

import ERC20 from '../../abis/ERC20.json'
import { getCurrentNonce, signBorrowIntent, signMintIntent, signRedeemIntent, signRepayIntent } from '../../utils/Intents';

interface USDCState {
    loading: boolean;
    error: string;
    status: string,
    balance: number,
    borrowBalance: number,
    borrowRate: number,
    supplyBalance: number,
    supplyRate: number,
    isCollateral: boolean,
    isEnabled: boolean,
    oraclePrice: number,
    liquidityInUSD: number,
}


const initialState: USDCState = {
    loading: false,
    error: "",
    status: 'initial',
    borrowRate: 0.00,
    borrowBalance: 0.00,
    balance: 0.00,
    supplyBalance: 0.00,
    supplyRate: 0.00,
    isCollateral: false,
    isEnabled: false,
    oraclePrice: 1.000,
    liquidityInUSD: 0.00,
}

// Helpers

export const toWei = (value: string|number, decimals = 18) =>
    parseUnits(value.toString(), decimals);

// Views

export const isUSDCListedAsCollateral = createAsyncThunk('usdcCollateral/view', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined ) {
        return false;
    }

    const accountAddress = wallet.accounts[0].address;

    try {

        const getCollateral = await fetch(`${API_URL}/api/markets/usdc/isCollateral/${accountAddress}`).then((response) => {return response.json()});
        return getCollateral.isCollateral;
    } catch (error) {
        console.log(`[Console] unable to confirm USDC is listed as this wallet's collateral! \n ${error}`);
        return false;
    }

})

export const isUSDCEnabled = createAsyncThunk('usdcCollateral/enabled', async () => {
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return false;
    }

    let accountAddress = wallet.accounts[0].address;

    try {
        const allowance = await fetch(`${API_URL}/api/markets/usdc/isEnabled/${accountAddress}`).then((res) => {return res.json()});
        return allowance.isEnabled
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'isUSDCEnabled': ${error}`);
        return false;
    }
})


export const updateUSDCBalance = createAsyncThunk('usdcBalance/update', async () => {
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    const accountAddress = wallet.accounts[0].address;

    console.log(`[Console] listing thunk values... USDC Address: ${testnet_addresses.USDC} Wallet Address: ${accountAddress}...`);

    try {

        let usdcBalance = await fetch(`${API_URL}/api/markets/usdc/balance/${accountAddress}`).then((res) => {return res.json()})
        console.log(`[Console] successfully called on thunk 'updateUSDCBalance' for wallet address: ${accountAddress}, with balance : ${usdcBalance}`);

        return usdcBalance.balance;
    } catch (error) {

        console.log(`[Console] an error occured on thunk 'updateUSDCBalance': ${error}`)
        return 0;

    }
});


export const updateUSDCSupplyBalance = createAsyncThunk('usdcSupplyBalance/update', async () => {
    
        const [wallet] = onboard.state.get().wallets;

        if (wallet === undefined) {
            return 0;
        }

        let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');

        const accountAddress = wallet.accounts[0].address;
        try {
            let balance = await fetch(`${API_URL}/api/markets/usdc/supplyBalance/${accountAddress}`).then((res) => { return res.json()});
            console.log(`[Console] successfully called on thunk 'updateUSDCSupplyBalance'`);
            return balance.supplyBalance;
        } catch(error) {
            console.log(`[Console] an error occured on thunk 'updateUSDCSupplyBalance': ${error}`)
            return 0;
        }
    });

export const updateUSDCBorrowBalance = createAsyncThunk('usdcBorrowBalance/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const accountAddress = wallet.accounts[0].address;

    try {
        let balance = await fetch(`${API_URL}/api/markets/usdc/borrowBalance/${accountAddress}`).then((res) => res.json());
        console.log(`[Console] successfully called on thunk 'updateUSDCBorrowBalance'`);
        return balance.borrowBalance;

    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateUSDCBorrowBalance': ${error}`)
        return 0;
    }

});

export const updateUSDCSupplyRate = createAsyncThunk('usdcSupplyRate/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (!wallet) {
        return Number(0.00);
    }

    try {
        // Fetch the supply rate per block (always in 1e18 scale)

        const supplyRate = await fetch(`${API_URL}/api/markets/usdc/supplyAPY`).then((res) => {return res.json()})
        console.log(`[Console] successfully called on thunk 'updateUSDCSupplyRate`)
        // Return the APY as a percentage
        return Number(supplyRate.apy);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updateSupplyRate': ${error}`);
        return 0;
    }
});

export const updateUSDCBorrowRate = createAsyncThunk('usdcBorrowRate/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (!wallet) {
        return 0;
    }

    try {
        console.log(`[Console] successfully called on thunk 'updateBorrowRate'`);

        const borrowRate = await fetch(`${API_URL}/api/markets/usdc/borrowAPY`).then((res) => { return res.json()});
        // Return the APY as a percentage
        return Number(borrowRate.apy); // Convert to percentage
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updateBorrowRate': ${error}`);
        return 0;
    }
});

export const updateUSDCLiquidityInUSD = createAsyncThunk('usdcLiquidity/update', async () => { 
    
    const [wallet] = onboard.state.get().wallets;
    
    if (!wallet) {
        return 0;
    }    

    try {
        const getLiquidity = await fetch(`${API_URL}/api/markets/usdc/marketLiquidity`).then((res) => {return res.json()})
            
        console.log(`[Console] successfully called on thunk 'updateLiquidityInUSD' ${getLiquidity.usdLiquidityInUSD}`);

        return getLiquidity.usdLiquidityInUSD;
    }
    catch (error) { 
        console.log(`[Console] an error occurred on thunk 'updateUSDCLiquidityInUSD': ${error}`);
        return 0;
    }

})


export const updateUSDCOraclePrice = createAsyncThunk('usdcOraclePrice/update', async () => {
    const [wallet] = onboard.state.get().wallets
    
    // Get the oracle price

    if ( wallet === undefined ) {
        return 0;
    }

    try {

     const req = await fetch(`${ORACLE_URL}/api/prices`)
     const usdcPrice = await req.json();
     console.log(`[Console] successfully called on thunk 'updateUSDCOraclePrice' with values ${usdcPrice}`)
     return Number(usdcPrice.prices.USDC);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updatePriceOracle': ${error} `)
        return 0;
    }
})

// Activities

///////////  Misc Market Thunks
export const approveUSDC = createAsyncThunk('usdc/Approve', async (_, { rejectWithValue }) => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'approveUSDC' ...`);

    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const USDC = new Contract(testnet_addresses.USDC, ERC20.abi, signer);
    const spender = testnet_addresses.degenUSDC;
    try {
        let tx = await USDC.approve(spender, parseUnits(`100000`));
        await tx.wait();
        console.log(`[Console] successfully called on thunk 'approveUSDC'`);
    } catch (error: any) {
        console.log(`[Console] an error occurred on thunk 'approveUSDC': ${error} `)
        return rejectWithValue(error.message);
    }

})


///////////  Supply Market Thunks

export const supplyUSDC = createAsyncThunk('usdc/Supply', async (supplyAmount: number, { rejectWithValue }) => {
    console.log(`[Console] initiating thunk, 'supplyUSDCIntent' ...`);

    const chainId = 647;
    const relayerAddress = testnet_addresses.degenlendRelayer;

    const [wallet] = onboard.state.get().wallets;
    const signer = await new ethers.BrowserProvider(wallet.provider).getSigner();
    const user = wallet.accounts[0].address;
    const cToken = testnet_addresses.degenUSDC;
    const amount = toWei(supplyAmount, 6);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const nonce = await getCurrentNonce(user);
    const intentData = { user, cToken, amount, nonce, deadline };

    try {
        const signature = signMintIntent(signer, chainId, relayerAddress, intentData);
        const body = JSON.stringify({
            user: wallet.accounts[0].address,   // EIP‑712 signer
            cToken: cToken,
            amount: Number(amount),
            deadline: deadline,
            signature: signature
          });
      
          const res = await fetch(`${API_URL}/api/intent/mint`, {
            method: 'POST',
            headers: { 'Content‑Type': 'application/json' },
            body
          });

          let tx = await res.json();
          return tx.txHash;
        console.log(`[Console] successfully called on thunk 'supplyUSDC' hash: ${tx.txHash}`);
    } catch (error: any) {
        console.log(`[Console] an error occurred on thunk 'supplyUSDC': ${error} `)
        return rejectWithValue(error.message);
    }
})

export const withdrawUSDC = createAsyncThunk('usdc/withdraw', async (withdrawAmount: number, { rejectWithValue }) => {
    console.log(`[Console] initiating thunk, 'withdrawUSDCIntent' ...`);

    const chainId = 647;
    const relayerAddress = testnet_addresses.degenlendRelayer;

    const [wallet] = onboard.state.get().wallets;
    const signer = await new ethers.BrowserProvider(wallet.provider).getSigner();
    const user = wallet.accounts[0].address;
    const cToken = testnet_addresses.degenUSDC;
    const amount = toWei(withdrawAmount, 6);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const nonce = await getCurrentNonce(user);
    const intentData = { user, cToken, amount, nonce, deadline };

    try {
        const signature = signRedeemIntent(signer, chainId, relayerAddress, intentData);
        const body = JSON.stringify({
            user: wallet.accounts[0].address,   // EIP‑712 signer
            cToken: cToken,
            amount: Number(amount),
            deadline: deadline,
            signature: signature
          });
      
          const res = await fetch(`${API_URL}/api/intent/withdraw`, {
            method: 'POST',
            headers: { 'Content‑Type': 'application/json' },
            body
          });

          let tx = await res.json();

        console.log(`[Console] successfully called on thunk 'supplyUSDC' hash: ${tx.txHash}`);
    } catch (error: any) {
        console.log(`[Console] an error occurred on thunk 'supplyUSDC': ${error} `)
        return rejectWithValue(error.message);
    }
})

///////////  Borrow Market Thunks

export const borrowUSDC = createAsyncThunk('usdc/borrow', async (borrowAmount: number, { rejectWithValue }) => {
    console.log(`[Console] initiating thunk, 'borrowUSDCIntent' ...`);

    const chainId = 647;
    const relayerAddress = testnet_addresses.degenlendRelayer;

    const [wallet] = onboard.state.get().wallets;
    const signer = await new ethers.BrowserProvider(wallet.provider).getSigner();
    const user = wallet.accounts[0].address;
    const cToken = testnet_addresses.degenUSDC;
    const amount = toWei(borrowAmount, 6);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const nonce = await getCurrentNonce(user);
    const intentData = { user, cToken, amount, nonce, deadline };
    try {
        const signature = signBorrowIntent(signer, chainId, relayerAddress, intentData);
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

        console.log(`[Console] successfully called on thunk 'supplyUSDC' hash: ${tx.txHash}`);
    } catch (error: any) {
        console.log(`[Console] an error occurred on thunk 'supplyUSDC': ${error} `)
        return rejectWithValue(error.message);
    }
})

export const repayUSDC = createAsyncThunk('usdc/repay', async (repayAmount: number, { rejectWithValue }) => {
    console.log(`[Console] initiating thunk, 'repayUSDCIntent' ...`);

    const chainId = 647;
    const relayerAddress = testnet_addresses.degenlendRelayer;

    const [wallet] = onboard.state.get().wallets;
    const signer = await new ethers.BrowserProvider(wallet.provider).getSigner();
    const user = wallet.accounts[0].address;
    const cToken = testnet_addresses.degenUSDC;
    const amount = toWei(repayAmount, 6);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const nonce = await getCurrentNonce(user);
    const intentData = { user, cToken, amount, nonce, deadline };

    try {
        const signature = signRepayIntent(signer, chainId, relayerAddress, intentData);
        const body = JSON.stringify({
            user: wallet.accounts[0].address,   // EIP‑712 signer
            cToken: cToken,
            amount: Number(amount),
            deadline: deadline,
            signature: signature
          });
      
          const res = await fetch(`${API_URL}/api/intent/repay`, {
            method: 'POST',
            headers: { 'Content‑Type': 'application/json' },
            body
          });

          let tx = await res.json();

        console.log(`[Console] successfully called on thunk 'supplyUSDC' hash: ${tx.txHash}`);
    } catch (error: any) {
        console.log(`[Console] an error occurred on thunk 'supplyUSDC': ${error} `)
        return rejectWithValue(error.message);
    }
})


/// Exporting the Slice
export const USDCSlice = createSlice({
    name: "USDC",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
///////////  Views

        //  Price Oracle
        builder.addCase(updateUSDCOraclePrice.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateUSDCOraclePrice.rejected, (state, action) => {
            state.status = "failed";
            state.oraclePrice = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateUSDCOraclePrice.fulfilled, (state, action) => {
            state.status = "completed";
            state.oraclePrice = action.payload;
        })

        // Borrow Rate

        builder.addCase(updateUSDCBorrowRate.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateUSDCBorrowRate.rejected, (state, action) => {
            state.status = "failed";
            state.borrowRate = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateUSDCBorrowRate.fulfilled, (state, action) => {
            state.status = "completed";
            state.borrowRate = action.payload;
        })

        // Supply Rate

        builder.addCase(updateUSDCSupplyRate.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateUSDCSupplyRate.rejected, (state, action) => {
            state.status = "failed";
            state.supplyRate = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateUSDCSupplyRate.fulfilled, (state, action) => {
            state.status = "completed";
            state.supplyRate = action.payload;
        })

        // USDC Balance

        builder.addCase(updateUSDCBalance.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateUSDCBalance.rejected, (state, action) => {
            state.status = "failed";
            state.balance = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateUSDCBalance.fulfilled, (state, action) => {
            state.status = "completed";
            state.balance = action.payload;
        })

        // Borrow Balance

        builder.addCase(updateUSDCBorrowBalance.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateUSDCBorrowBalance.rejected, (state, action) => {
            state.status = "failed";
            state.borrowBalance = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateUSDCBorrowBalance.fulfilled, (state, action) => {
            state.status = "completed";
            state.borrowBalance = action.payload;
        })

        // Supply Balance
        
        builder.addCase(updateUSDCSupplyBalance.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        });

        builder.addCase(updateUSDCSupplyBalance.rejected, (state, action) => {
            state.status = "failed";
            state.supplyBalance = 0;
            state.error = `${action.error}`;
        })

        builder.addCase(updateUSDCSupplyBalance.fulfilled, (state, action) => {
            state.status = "completed";
            state.supplyBalance = action.payload;
        })

        builder.addCase(isUSDCListedAsCollateral.pending, (state, action) => {
            state.status = "loading";
            state.loading = true;
        })

        builder.addCase(isUSDCListedAsCollateral.rejected, (state, action) => {
            state.status = "failed";
            state.error = `${action.error}`;
        })

        builder.addCase(isUSDCListedAsCollateral.fulfilled, (state, action) => {
            state.status = "completed";
            state.isCollateral = action.payload;
        })


        builder.addCase(isUSDCEnabled.pending, (state, action) => {
            state.status = "loading";
            state.isEnabled = false;
        })
        builder.addCase(isUSDCEnabled.rejected, (state, action) => {
            state.status = "loading";
            state.isEnabled = false;
        })
        builder.addCase(isUSDCEnabled.fulfilled, (state, action) => {
            state.status = "loading";
            state.isEnabled = action.payload;
        })

        builder.addCase(updateUSDCLiquidityInUSD.fulfilled, (state, action) => {
            state.status = "completed"
            state.liquidityInUSD = action.payload;
        })
        
        
        ///////////  Activities

        // Borrow Wrapped USDC

        builder.addCase(borrowUSDC.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(borrowUSDC.rejected, (state, action) => {});

        builder.addCase(borrowUSDC.fulfilled, (state, action) => {});

        // Repay Wrapped USDC

        builder.addCase(repayUSDC.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(repayUSDC.rejected, (state, action) => {});

        builder.addCase(repayUSDC.fulfilled, (state, action) => {});

        // Supply Wrapped USDC

        builder.addCase(supplyUSDC.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(supplyUSDC.rejected, (state, action) => {});

        builder.addCase(supplyUSDC.fulfilled, (state, action) => {});

        // Withdraw Wrapped USDC

        builder.addCase(withdrawUSDC.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(withdrawUSDC.rejected, (state, action) => {});

        builder.addCase(withdrawUSDC.fulfilled, (state, action) => {});

        // Approve USDC

        builder.addCase(approveUSDC.pending, (state, action) => {
            state.loading = true
        });

        builder.addCase(approveUSDC.rejected, (state, action) => {
            state.loading = false;
            state.isEnabled = false;
        });

        builder.addCase(approveUSDC.fulfilled, (state, action) => {
            state.loading = false;
            state.isEnabled = true;
        });



    }
});

export default USDCSlice.reducer;