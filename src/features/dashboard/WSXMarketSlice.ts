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
    walletBalance: number,
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
    walletBalance: 0.00,
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
const [wallet] = onboard.state.get().wallets;



export const updateWSXBalance = createAsyncThunk('wsxBalance/update', async () => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const WSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);
    const decimals = await WSX.decimals();
    const walletAddress = wallet.accounts[0].address;

    try {

        let balance = await WSX.balanceOf(walletAddress);
        const wsxBalance = formatUnits(balance, decimals)
        console.log(`[Console] successfully called on thunk 'updateWSXBalance'`);

        return wsxBalance;
    } catch (error) {

        console.log(`[Console] an error occured on thunk 'updateWSXBalance': ${error}`)
        return 0;
    }

});

export const updateSupplyBalance = createAsyncThunk('wsxSupplyBalance/update', async () => {
    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const degenUSDC = new Contract(testnet_addresses.degenUSDC, ERC20Immutable.abi, ethersProvider);

    const walletAddress = wallet.accounts[0].address;
    // This code is currently incomplete
    try {
        console.log(`[Console] successfully called on thunk 'updateSupplyBalance -- but nothing was executed!'`);
    } catch(error) {
        console.log(`[Console] an error occured on thunk 'updateSupplyBalance': ${error}`)
        return 0;
    }
    });

export const updateBorrowBalance = createAsyncThunk('wsxBorrowBalance/update', async () => {

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);
    const walletAddress = wallet.accounts[0].address;

    try {
        const borrowBalanceMantissa = await degenWSX.borrowBalanceCurrent(walletAddress);
        const decimals = await degenWSX.decimals();
        const borrowBalance = formatUnits(borrowBalanceMantissa, decimals);

        console.log(`[Console] successfully called on thunk 'updateBorrowBalance'`);
        return borrowBalance;

    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateBorrowBalance': ${error}`)
        return 0;
    }

});

export const updateSupplyRate = createAsyncThunk('wsxSupplyRate/update', async () => {

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);

    try {
        const  supplyRateMantissa = await degenWSX.supplyRatePerBlock();
        const decimals = await degenWSX.decimals()
        const supplyRate = formatUnits(supplyRateMantissa, decimals);
        console.log(`[Console] successfully called on thunk 'updateSupplyRate'`);

        return supplyRate;
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateSupplyRate': ${error}`)
        return 0;
    }

});

export const updateBorrowRate = createAsyncThunk('wsxBorrowRate/update', async () => {

    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, ethersProvider);

    try {
        const  borrowRateMantissa = await degenWSX.borrowRatePerBlock();
        const decimals = await degenWSX.decimals();
        const borrowRate = formatUnits(borrowRateMantissa, decimals);
        console.log(`[Console] successfully called on thunk 'updateBorrowRate'`);

        return borrowRate;
    } catch (error) {
        console.log(`[Console] an error occured on thunk 'updateBorrowRate': ${error}`)
        return 0;
    }

});


// Activities

///////////  Approve WSX Thunks
export const approveWSX = createAsyncThunk('wsx/approve', async () => {
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
export const supplyWSX = createAsyncThunk('wsx/supply', async ({ amount }: supplyWSXParams) => {
    
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const degenWSX = new Contract(testnet_addresses.degenWSX, ERC20Immutable.abi, signer);
    const supplyAmount = amount * 1e18;
    try {
        const tx = await degenWSX.mint(supplyAmount);
        tx.wait();
        console.log(`[Console] successfully called on thunk 'supplyWSX'`);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'supplyWSX': ${error} `)

    }
})

export const withdrawWSX = createAsyncThunk('wsx/withdraw', async () => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
})

///////////  Borrow Market Thunks
export const repayWSX = createAsyncThunk('wsx/repay', async () => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
})

export const borrowWSX = createAsyncThunk('wsx/borrow', async () => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();

    
})


///////////  Oracle Price Thunks
export const updateOraclePrice = createAsyncThunk('wsxOraclePrice/update', async () => {
    let ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    const signer = await ethersProvider.getSigner();
    const priceOracle = new Contract( testnet_addresses.price_oracle, SimplePriceOracle.abi, signer)
    
    try {
     let wsxPrice = await priceOracle.getUnderlyingPrice(testnet_addresses.degenWSX);
     console.log(`[Console] successfully got the oracle price from 'updatePriceOracle': ${wsxPrice} `);
    } catch (error) {
        console.log(`[Console] an error occurred on thunk 'updatePriceOracle': ${error} `)
        return null;
    }
    
})



/// Exporting the Slice
export const WSXSlice = createSlice({
    name: "WSX",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Views
    }
});



export default WSXSlice.reducer;