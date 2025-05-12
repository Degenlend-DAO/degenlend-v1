// ─────────────────────────────────────────────────────────────
//  IntentSlice.ts  ▸  Redux Toolkit slice for relayer "intents"
//                   (mint / redeem / borrow / repay) targeting the
//                   WSX and USDC markets.
//
//  Expectation:   Backend exposes
//                   POST /intent/<action>
//                 with body { user, cToken, amount, deadline, signature? }
// ─────────────────────────────────────────────────────────────

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/Store';
import { API_URL } from '../../utils/constant';
import { onboard } from '../../utils/web3';
import { parseUnits } from 'viem';

/* -------------------------------------------------------------------------- */
/*                             Market constants                               */
/* -------------------------------------------------------------------------- */

export const MARKETS = {
  wsx: {
    symbol: 'WSX',
    decimals: 18,
    cToken: process.env.NEXT_PUBLIC_WSX_CTOKEN as string, // e.g. "0x..."
  },
  usdc: {
    symbol: 'USDC',
    decimals: 6,
    cToken: process.env.NEXT_PUBLIC_USDC_CTOKEN as string,
  },
} as const;

export type SupportedToken = keyof typeof MARKETS; // "wsx" | "usdc"

/* -------------------------------------------------------------------------- */
/*                              Helper Types                                  */
/* -------------------------------------------------------------------------- */

interface IntentBody {
  user: string;
  cToken: string;
  amount: string;   // raw wei string
  deadline: number; // unix timestamp seconds
  signature?: string; // if client‑side signing is implemented
}

interface IntentResponse {
  txHash: string;
  nonce: number;
}

interface BasePayload { token: SupportedToken; amount: string; }

/* -------------------------------------------------------------------------- */
/*                         Thunk factory generator                            */
/* -------------------------------------------------------------------------- */

function buildIntentThunk(
  action: 'mint' | 'redeem' | 'borrow' | 'repay'
) {
  return createAsyncThunk<IntentResponse, BasePayload>(
    `intent/${action}`,
    async ({ token, amount }, { rejectWithValue }) => {
      const wallet = onboard.state.get().wallets?.[0];
      if (!wallet) return rejectWithValue('Wallet not connected');

      const market = MARKETS[token];
      if (!market) return rejectWithValue('Unsupported token');

      const body: IntentBody = {
        user: wallet.accounts[0].address,
        cToken: market.cToken,
        amount,
        deadline: Math.floor(Date.now() / 1000) + 300, // 5‑minute ttl
      };

      const res = await fetch(`${API_URL}/intent/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) return rejectWithValue(await res.text());
      return (await res.json()) as IntentResponse;
    }
  );
}

export const mintIntent   = buildIntentThunk('mint');
export const redeemIntent = buildIntentThunk('redeem');
export const borrowIntent = buildIntentThunk('borrow');
export const repayIntent  = buildIntentThunk('repay');

/* -------------------------------------------------------------------------- */
/*                               Slice state                                  */
/* -------------------------------------------------------------------------- */

type Status = 'idle' | 'loading' | 'success' | 'error';

interface IntentState {
  status: Record<SupportedToken, Record<string, Status>>; // token → action → status
  error:  Record<SupportedToken, Record<string, string>>;  // token → action → message
  lastTx: Record<SupportedToken, string | undefined>;      // last txHash per token
}

const initStatus = { mint: 'idle', redeem: 'idle', borrow: 'idle', repay: 'idle' } as const;
const initError  = { mint: '', redeem: '', borrow: '', repay: '' } as const;

const initialState: IntentState = {
  status: {
    wsx: { ...initStatus },
    usdc: { ...initStatus },
  },
  error: {
    wsx: { ...initError },
    usdc: { ...initError },
  },
  lastTx: { wsx: undefined, usdc: undefined },
};

/* -------------------------------------------------------------------------- */
/*                                Utilities                                   */
/* -------------------------------------------------------------------------- */

const setPending = (state: IntentState, t: SupportedToken, a: string) => {
  state.status[t][a] = 'loading';
  state.error[t][a] = '';
};
const setFulfilled = (state: IntentState, t: SupportedToken, a: string, txHash: string) => {
  state.status[t][a] = 'success';
  state.lastTx[t] = txHash;
};
const setRejected = (state: IntentState, t: SupportedToken, a: string, err: string) => {
  state.status[t][a] = 'error';
  state.error[t][a] = err;
};

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const IntentSlice = createSlice({
  name: 'intent',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Mint
    builder
      .addCase(mintIntent.pending,   (s,a) => setPending  (s, a.meta.arg.token, 'mint'))
      .addCase(mintIntent.fulfilled, (s,a) => setFulfilled(s, a.meta.arg.token, 'mint', a.payload.txHash))
      .addCase(mintIntent.rejected,  (s,a) => setRejected (s, a.meta.arg.token, 'mint', String(a.payload || a.error.message)))

    // Redeem
      .addCase(redeemIntent.pending,   (s,a) => setPending  (s, a.meta.arg.token, 'redeem'))
      .addCase(redeemIntent.fulfilled, (s,a) => setFulfilled(s, a.meta.arg.token, 'redeem', a.payload.txHash))
      .addCase(redeemIntent.rejected,  (s,a) => setRejected (s, a.meta.arg.token, 'redeem', String(a.payload || a.error.message)))

    // Borrow
      .addCase(borrowIntent.pending,   (s,a) => setPending  (s, a.meta.arg.token, 'borrow'))
      .addCase(borrowIntent.fulfilled, (s,a) => setFulfilled(s, a.meta.arg.token, 'borrow', a.payload.txHash))
      .addCase(borrowIntent.rejected,  (s,a) => setRejected (s, a.meta.arg.token, 'borrow', String(a.payload || a.error.message)))

    // Repay
      .addCase(repayIntent.pending,   (s,a) => setPending  (s, a.meta.arg.token, 'repay'))
      .addCase(repayIntent.fulfilled, (s,a) => setFulfilled(s, a.meta.arg.token, 'repay', a.payload.txHash))
      .addCase(repayIntent.rejected,  (s,a) => setRejected (s, a.meta.arg.token, 'repay', String(a.payload || a.error.message)));
  }
});

export default IntentSlice.reducer;

/* -------------------------------------------------------------------------- */
/*                            Public selectors                                */
/* -------------------------------------------------------------------------- */

export const selectIntentStatus = (t: SupportedToken, action: keyof typeof initStatus) =>
  (state: RootState) => state.intent.status[t][action];

export const selectIntentError = (t: SupportedToken, action: keyof typeof initError) =>
  (state: RootState) => state.intent.error[t][action];

export const selectLastTxHash = (t: SupportedToken) => (state: RootState) => state.intent.lastTx[t];
