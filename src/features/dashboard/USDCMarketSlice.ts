import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers, Contract, formatUnits } from 'ethers';
import { onboard, testnet_addresses } from '../../utils/web3';


import Comptroller from '../../abis/Comptroller.json';
import ERC20Immutable from '../../abis/Erc20Immutable.json'
import ERC20 from '../../abis/ERC20.json'

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
    oraclePrice: number,
}


interface approveUSDCParams {
    amount: number,
    addressToApprove: string,
}

interface supplyUSDCParams {
    amount: number,
    addressToApprove: string,
}

interface withdrawUSDCParams {
    amount: number,
}

interface borrowUSDCParams {
    borrowAddress: string,
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
    oraclePrice: 1.000,
}

// Views

export const isUSDCListedAsCollateral = createAsyncThunk('usdcCollateral/view', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined ) {
        return false;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');

    const theComptroller = new Contract(testnet_addresses.comptroller, Comptroller.abi, ethersProvider);

    try {
        const walletAddress = wallet.accounts[0].address;
        const collateralMarkets = await theComptroller.getAssetsIn(walletAddress);
        let isCollateral = false;
        console.log(`\n\n Collateral Markets: ${collateralMarkets} \n\n`);
        if (collateralMarkets.includes(testnet_addresses.degenUSDC))
        {
            isCollateral = true;
        }
        return isCollateral;
    } catch (error) {
        console.log(`[Console] unable to confirm USDC is listed as this wallet's collateral! \n ${error}`);
    return false;
    }

})

export const updateUSDCBalance = createAsyncThunk('usdcBalance/update', async () => {
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'updateUSDCBalance' ...`);

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const USDC = new Contract(testnet_addresses.USDC, ERC20Immutable.abi, ethersProvider);
    const decimals = await USDC.decimals();
    const walletAddress = wallet.accounts[0].address;

    // const walletAddress = "0x00000000000000"
    console.log(`[Console] listing thunk values... USDC Address: ${testnet_addresses.USDC} Wallet Address: ${walletAddress}...`);

    try {
        let balance = await USDC.balanceOf(walletAddress);
        const usdcBalance = formatUnits(balance, decimals);

        console.log(`[Console] successfully called on thunk 'updateUSDCBalance' for wallet address: ${walletAddress}, with balance : ${usdcBalance}`);

        return Number(usdcBalance);
    } catch (error) {

        console.log(`[Console] an error occured on thunk 'updateUSDCBalance': ${error}`)
        return 0;

    }
});

export const updateUSDCOraclePrice = createAsyncThunk('usdcOraclePrice/update', async () => {
    return 1.00;
})

export const updateSupplyBalance = createAsyncThunk('usdcSupplyBalance/update', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);

    const walletAddress = wallet.accounts[0].address;
    // This code is currently incomplete
    try {
        console.log(`[Console] successfully called on thunk 'updateSupplyBalance -- but nothing was executed!'`);
        const supplyBalance = "0";
        return Number(supplyBalance);
    } catch(error) {
        console.log(`[Console] an error occured on thunk 'updateSupplyBalance': ${error}`)
        return 0;
    }
    });

export const updateBorrowBalance = createAsyncThunk('usdcBorrowBalance/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);
    const walletAddress = wallet.accounts[0].address;

    try {
        const borrowBalanceMantissa = await degenUSDC.borrowBalanceCurrent(walletAddress);
        const decimals = await degenUSDC.decimals();
        const borrowBalance = formatUnits(borrowBalanceMantissa, decimals);

        console.log(`[Console] successfully called on thunk 'updateBorrowBalance'`);
        return Number(borrowBalance);

    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateBorrowBalance': ${error}`)
        return 0;
    }

});

export const updateUSDCSupplyRate = createAsyncThunk('usdcSupplyRate/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);

    try {
        const  supplyRateMantissa = await degenUSDC.supplyRatePerBlock();
        const decimals = await degenUSDC.decimals()
        const supplyRate = formatUnits(supplyRateMantissa, decimals);
        console.log(`[Console] successfully called on thunk 'updateSupplyRate'`);

        return Number(supplyRate);
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateSupplyRate': ${error}`)
        return 0;
    }

});

export const updateUSDCBorrowRate = createAsyncThunk('usdcBorrowRate/update', async () => {

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);

    try {
        const  borrowRateMantissa = await degenUSDC.borrowRatePerBlock();
        const decimals = await degenUSDC.decimals()
        const borrowRate = formatUnits(borrowRateMantissa, decimals);
        console.log(`[Console] successfully called on thunk 'updateBorrowRate'`);

        return Number(borrowRate);
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateBorrowRate': ${error}`)
        return 0;
    }
});

// Activities

///////////  Misc Market Thunks
export const approveUSDC = createAsyncThunk('usdc/Approve', async ({ amount, addressToApprove }: { amount: number, addressToApprove: string }) => {
    
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
        let tx = await USDC.approve(spender, amount);
        await tx.wait();
        console.log(`[Console] successfully called on thunk 'approveUSDC'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'approveUSDC': ${error} `)
    }

})

///////////  Supply Market Thunks

export const supplyUSDC = createAsyncThunk('usdc/Supply', async () => {
    console.log(`[Console] initiating thunk, 'supplyUSDC' ...`);

    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'supplyUSDC' ...`);

    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();

    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, signer);
    const supplyAmount = 1 * 1e18;

    try {
        const tx = await degenUSDC.mint(supplyAmount);
        tx.wait();
        console.log(`[Console] successfully called on thunk 'supplyUSDC'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'supplyUSDC': ${error} `)

    }
})

export const withdrawUSDC = createAsyncThunk('usdc/withdraw', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }
    
    console.log(`[Console] initiating thunk, 'withdrawUSDC' ...`);


    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20.abi, signer);

    try {

        degenUSDC.redeemUnderlying(1)
        console.log(`[Console] successfully called on thunk 'withdrawUSDC'`);
    
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'withdrawUSDC': ${error} `)

    }
})

///////////  Borrow Market Thunks

export const borrowUSDC = createAsyncThunk('usdc/borrow', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'borrowUSDC' ...`);

    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20.abi, signer);

    try {
        console.log(`[Console] successfully called on thunk 'borrowUSDC'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'borrowUSDC': ${error} `)

    }
})

export const repayUSDC = createAsyncThunk('usdc/repay', async () => {
    
    const [wallet] = onboard.state.get().wallets;

    if (wallet === undefined) {
        return 0;
    }

    console.log(`[Console] initiating thunk, 'repayUSDC' ...`);

    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20.abi, signer);

    try {
        console.log(`[Console] successfully called on thunk 'repayUSDC'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'repayUSDC': ${error} `)

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

        // WSX Balance

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
        
        
        ///////////  Activities

        // Borrow Wrapped USDC

        builder.addCase(borrowUSDC.pending, (state, action) => {});

        builder.addCase(borrowUSDC.rejected, (state, action) => {});

        builder.addCase(borrowUSDC.fulfilled, (state, action) => {});

        // Repay Wrapped USDC

        builder.addCase(repayUSDC.pending, (state, action) => {});

        builder.addCase(repayUSDC.rejected, (state, action) => {});

        builder.addCase(repayUSDC.fulfilled, (state, action) => {});

        // Supply Wrapped USDC

        builder.addCase(supplyUSDC.pending, (state, action) => {});

        builder.addCase(supplyUSDC.rejected, (state, action) => {});

        builder.addCase(supplyUSDC.fulfilled, (state, action) => {});

        // Withdraw Wrapped USDC

        builder.addCase(withdrawUSDC.pending, (state, action) => {});

        builder.addCase(withdrawUSDC.rejected, (state, action) => {});

        builder.addCase(withdrawUSDC.fulfilled, (state, action) => {});

        // Approve USDC

        builder.addCase(approveUSDC.pending, (state, action) => {});

        builder.addCase(approveUSDC.rejected, (state, action) => {});

        builder.addCase(approveUSDC.fulfilled, (state, action) => {});

    }
});

export default USDCSlice.reducer;