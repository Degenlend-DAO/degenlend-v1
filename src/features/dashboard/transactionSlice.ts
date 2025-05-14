// ─────────────────────────────────────────────────────────────
//  transactionSlice.ts  ▸  Centralised async‑tx status tracker
//
//  Pattern: `handleTransaction` thunk wraps any async function that
//  returns a promise (e.g., dispatching an intent thunk) and updates
//  global status so UI can show a spinner / toast regardless of source.
// ─────────────────────────────────────────────────────────────

import { createSlice, createAsyncThunk, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from '../../app/Store';
import { supplyUSDC, borrowUSDC, withdrawUSDC, repayUSDC, approveUSDC } from './USDCMarketSlice';
import { supplyWSX, borrowWSX, withdrawWSX, repayWSX, approveWSX } from './WSXMarketSlice';
import { enterUSDCMarket, enterWSXMarket, exitUSDCMarket, exitWSXMarket } from './AccountSlice';

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
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const txSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTx(state) {
      console.log(`[CONFIRMATION DIALOG] RESETTING TXN VALUES`)
      state.phase = 'idle';
      state.hash  = undefined;
      state.error = undefined;
    }

  },
  extraReducers: builder => {

    builder.addMatcher(
      isAnyOf(
        approveUSDC.rejected, approveWSX.rejected,
        supplyUSDC.rejected, supplyWSX.rejected,
        borrowUSDC.rejected, borrowWSX.rejected,
        withdrawUSDC.rejected, withdrawWSX.rejected,
        repayUSDC.rejected, repayWSX.rejected,
      ),
      (state, action) => {
        console.log(`[CONFIRMATION DIALOG] UPDATING PHASE STATE NOW in pending `)
        state.phase = 'rejected';
      }
    );

    builder.addMatcher(
      isAnyOf(
        approveUSDC.pending, approveWSX.pending,
        supplyUSDC.pending, supplyWSX.pending,
        borrowUSDC.pending, borrowWSX.pending,
        withdrawUSDC.pending, withdrawWSX.pending,
        repayUSDC.pending, repayWSX.pending,
      ),
      (state) => { 
      console.log(`[CONFIRMATION DIALOG] UPDATING PHASE STATE NOW in pending `)
        state.phase = 'pending'; 
      }
    );

    builder.addMatcher(
      isAnyOf(
        approveUSDC.fulfilled, approveWSX.fulfilled,
        supplyUSDC.fulfilled, supplyWSX.fulfilled,
        borrowUSDC.fulfilled, borrowWSX.fulfilled,
        withdrawUSDC.fulfilled, withdrawWSX.fulfilled,
        repayUSDC.fulfilled, repayWSX.fulfilled,
      ),
      (state) => {
        console.log(`[CONFIRMATION DIALOG] UPDATING PHASE STATE NOW in pending `)
        state.phase = 'success'; 
      }
    );

    builder.addMatcher(
      isAnyOf(
        enterUSDCMarket.pending, enterWSXMarket.pending,
        exitUSDCMarket.pending, exitWSXMarket.pending
      ),
      (state) => { state.phase = 'pending' } 
    );

    builder.addMatcher(
      isAnyOf(
        enterUSDCMarket.fulfilled, enterWSXMarket.fulfilled,
        exitUSDCMarket.fulfilled, exitWSXMarket.fulfilled
      ),
      (state) => { state.phase = 'success' } 
    );

    builder.addMatcher(
      isAnyOf(
        enterUSDCMarket.rejected, enterWSXMarket.rejected,
        exitUSDCMarket.rejected, exitWSXMarket.rejected
      ),
      (state) => { state.phase = 'rejected' } 
    );
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
