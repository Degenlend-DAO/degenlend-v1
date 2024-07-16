import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers, Contract, formatUnits } from 'ethers';
import { onboard, testnet_addresses } from '../../utils/web3';

import ERC20Immutable from '../../abis/Erc20Immutable.json'
import ERC20 from '../../abis/ERC20.json'

interface USDCState {
    loading: boolean;
    error: string;
    status: string,
    walletBalance: number,
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
    walletBalance: 0.00,
    supplyBalance: 0.00,
    supplyRate: 0.00,
    isCollateral: false,
    oraclePrice: 1.000,
}

// Views
const [wallet] = onboard.state.get().wallets;


export const updateUSDCBalance = createAsyncThunk('usdcBalance/update', async () => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const USDC = new Contract(testnet_addresses.USDC, ERC20Immutable.abi, ethersProvider);
    const decimals = await USDC.decimals();
    const walletAddress = wallet.accounts[0].address;

    try {

        let balance = await USDC.balanceOf(walletAddress);
        const usdcBalance = formatUnits(balance, decimals)
        console.log(`[Console] successfully called on thunk 'updateUSDCBalance'`);

        return usdcBalance;
    } catch (error) {

        console.log(`[Console] an error occured on thunk 'updateWSXBalance': ${error}`)
        return 0;

    }
});

export const updateOraclePrice = createAsyncThunk('usdcOraclePrice/update', async () => {
    return 1.00;
})

export const updateSupplyBalance = createAsyncThunk('usdcSupplyBalance/update', async () => {
    
    return 1000;
});

export const updateBorrowBalance = createAsyncThunk('usdcBorrowBalance/update', async ({ borrowAddress }: borrowUSDCParams) => {

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);
    const walletAddress = wallet.accounts[0].address;

    try {
        const borrowBalanceMantissa = await degenUSDC.borrowBalanceCurrent(walletAddress);
        const decimals = await degenUSDC.decimals();
        const borrowBalance = formatUnits(borrowBalanceMantissa, decimals);

        console.log(`[Console] successfully called on thunk 'updateBorrowBalance'`);
        return borrowBalance;

    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateBorrowBalance': ${error}`)
        return 0;
    }

});

export const updateSupplyRate = createAsyncThunk('usdcSupplyRate/update', async () => {

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);

    try {
        const  supplyRateMantissa = await degenUSDC.supplyRatePerBlock();
        const decimals = await degenUSDC.decimals()
        const supplyRate = formatUnits(supplyRateMantissa, decimals);
        console.log(`[Console] successfully called on thunk 'updateSupplyRate'`);

        return supplyRate;
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateSupplyRate': ${error}`)
        return 0;
    }

});

export const updateBorrowRate = createAsyncThunk('usdcBorrowRate/update', async () => {

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);

    try {
        const  borrowRateMantissa = await degenUSDC.borrowRatePerBlock();
        const decimals = await degenUSDC.decimals()
        const borrowRate = formatUnits(borrowRateMantissa, decimals);
        console.log(`[Console] successfully called on thunk 'updateSupplyRate'`);

        return borrowRate;
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateSupplyRate': ${error}`)
        return 0;
    }
});

// Activities

///////////  Supply Market Thunks
export const approveUSDC = createAsyncThunk('usdc/Approve', async ({ amount, addressToApprove }: { amount: number, addressToApprove: string }) => {
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

export const supplyUSDC = createAsyncThunk('usdc/Supply', async ({ amount, addressToApprove } : supplyUSDCParams) => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, signer);
    const supplyAmount = amount * 1e18;

    try {
        const tx = await degenUSDC.mint(supplyAmount);
        tx.wait();
        console.log(`[Console] successfully called on thunk 'supplyUSDC'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'supplyUSDC': ${error} `)

    }
})

export const withdrawUSDC = createAsyncThunk('uscd/withdraw', async ({ amount }: withdrawUSDCParams) => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20.abi, signer);

    try {

        degenUSDC.redeemUnderlying(amount)
        console.log(`[Console] successfully called on thunk 'withdrawUSDC'`);
    
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'withdrawUSDC': ${error} `)

    }
})

///////////  Borrow Market Thunks

export const borrowUSDC = createAsyncThunk('usdc/borrow', async () => {
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
        // Views

        // Activities
    }
});

export default USDCSlice.reducer;