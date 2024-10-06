// transactionsSlice.ts
import { createSlice, createAsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";

interface TransactionState {
    status: string,
    error: any,
}

const initialState: TransactionState = {
    status: "idle", // "idle" | "pending" | "success" | "failed"
    error: null,
  }

// A reusable function for handling asynchronous blockchain transactions
export const handleTransaction = createAsyncThunk(
    "transactions/handleTransaction",
    async (transactionFn: () => AsyncThunkAction<any, any, any>, { dispatch }) => {
      try {
        dispatch(setTransactionStatus("pending"));
        console.log("Pending transaction started.");
  
        // Dispatch the thunk and await the action itself to resolve
        const result = await dispatch(transactionFn());
  
        // Ensure result is handled correctly
        if (result.meta.requestStatus === 'fulfilled') {
          console.log("Transaction successful:", result);
          dispatch(setTransactionStatus("success"));
        } else if (result.meta.requestStatus === 'rejected') {
          throw result.meta.rejectedWithValue || new Error("Transaction rejected or failed");
        }
      } catch (error: any) {
        console.error("Caught transaction failure. Error:", error);
  
        if (error?.code === 4001) {  // Handle MetaMask user rejection
          dispatch(setTransactionStatus("rejected"));
        } else {
          dispatch(setTransactionStatus("failed"));
        }
      }
    }
  );
  
  

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactionStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add extra reducers for specific transaction actions if needed
  },
});

export const { setTransactionStatus } = transactionsSlice.actions;
export default transactionsSlice.reducer;
