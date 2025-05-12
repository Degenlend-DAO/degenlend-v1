// Libraries
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// Reducers
import walletReducer from '../features/wallet/walletSlice'
import usdcReducer from '../features/dashboard/USDCMarketSlice'
import wsxReducer from '../features/dashboard/WSXMarketSlice'
import accountReducer from '../features/dashboard/AccountSlice'
import transactionsReducer from '../features/dashboard/transactionSlice'
import intentsReducer from '../features/dashboard/IntentSlice'

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
        account: accountReducer,
        intent: intentsReducer,
        wallet: walletReducer,
        usdc: usdcReducer,
        wsx: wsxReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>