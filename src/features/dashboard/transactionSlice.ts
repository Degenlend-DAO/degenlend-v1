// ─────────────────────────────────────────────────────────────
//  transactionSlice.ts  ▸  Centralised async‑tx status tracker
//
//  Pattern: `handleTransaction` thunk wraps any async function that
//  returns a promise (e.g., dispatching an intent thunk) and updates
//  global status so UI can show a spinner / toast regardless of source.
// ─────────────────────────────────────────────────────────────

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/Store';

export type TxPhase = 'idle' | 'pending' | 'success' | 'error' | 'rejected';

interface TxState {
  phase: TxPhase;
  hash?: string;
  error?: string;
}

const initialState: TxState = {
  phase: 'idle'
};

/* -------------------------------------------------------------------------- */
/*                          Generic transaction wrapper                       */
/* -------------------------------------------------------------------------- */

/**
 * Wrap any async function (e.g. borrowIntent thunk) to update tx status.
 * @example dispatch(handleTransaction(() => dispatch(borrowIntent(args))))
 */
export const handleTransaction = createAsyncThunk<
  string | void,
  () => Promise<{ txHash?: string } | void>
>('tx/handle', async (fn, { dispatch, rejectWithValue }) => {
  try {
    const result: any = await fn();
    // If the wrapped fn returns a txHash, pass it through
    return result?.txHash ?? '';
  } catch (err: any) {
    return rejectWithValue(err.message || 'Transaction failed');
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const txSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTx(state) {
      state.phase = 'idle';
      state.hash  = undefined;
      state.error = undefined;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(handleTransaction.pending,  state => {
        state.phase = 'pending';
        state.error = undefined;
        state.hash  = undefined;
      })
      .addCase(handleTransaction.fulfilled,(state, action: PayloadAction<string|void>) => {
        state.phase = 'success';
        if (action.payload) state.hash = action.payload;
      })
      .addCase(handleTransaction.rejected, (state, action) => {
        state.phase = 'error';
        state.error = String(action.payload || action.error.message);
      });
  }
});

export const { resetTx } = txSlice.actions;
export default txSlice.reducer;

/* -------------------------------------------------------------------------- */
/*                                Selectors                                   */
/* -------------------------------------------------------------------------- */

export const selectTxPhase = (s: RootState) => s.transactions.phase;
export const selectTxHash  = (s: RootState) => s.transactions.hash;
export const selectTxError = (s: RootState) => s.transactions.error;
