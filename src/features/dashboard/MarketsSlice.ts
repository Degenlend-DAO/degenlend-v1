// features/dashboard/MarketSlice.ts
// ---------------------------------------------------------------------------
// Centralised asset‑metadata slice (no per‑wallet data here!)
// Holds oracle price, collateral factor & decimals for every cToken that the
// app cares about.  Pure data → any component / selector can derive risk
// metrics without touching network or wallet state.
// ---------------------------------------------------------------------------

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/Store";

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

export interface MarketMeta {
  /** Address of the cToken / cErc20 contract */
  cToken: string;
  /** Last known oracle price in USD */
  priceUsd: number;
  /** Collateral factor (0‑1) as returned by the Comptroller */
  collateralFactor: number;
  /** ERC‑20 decimals of the *underlying* asset (USDC=6, WSX=18, …) */
  decimals: number;
}

export type MarketState = Record<string, MarketMeta>; // keyed by cToken address

/* -------------------------------------------------------------------------- */
/*                              Initial state                                 */
/* -------------------------------------------------------------------------- */

// ⚠️  Replace the placeholder addresses with the real ones used on‑chain.
const initialState: MarketState = {
  "WSX": {
    cToken: "0x000000000000000000000000000000000000WSX",
    priceUsd: 0, // will be updated by oracle feed
    collateralFactor: 0.75,
    decimals: 8,
  },
  "USDC": {
    cToken: "0x000000000000000000000000000000000000USDC",
    priceUsd: 0,
    collateralFactor: 0.85,
    decimals: 6,
  },
};

/* -------------------------------------------------------------------------- */
/*                                  Slice                                     */
/* -------------------------------------------------------------------------- */

const MarketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    /** Bulk‑set the entire meta map (useful on first load) */
    setMarketMeta: (_, action: PayloadAction<MarketState>) => action.payload,

    /** Update price for a single asset */
    updatePriceUsd: (
      state,
      action: PayloadAction<{ cToken: string; priceUsd: number }>
    ) => {
      const { cToken, priceUsd } = action.payload;
      if (state[cToken]) state[cToken].priceUsd = priceUsd;
    },

    /** Update collateral factor for a single asset (if protocol parameters change) */
    updateCollateralFactor: (
      state,
      action: PayloadAction<{ cToken: string; collateralFactor: number }>
    ) => {
      const { cToken, collateralFactor } = action.payload;
      if (state[cToken]) state[cToken].collateralFactor = collateralFactor;
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                               Selectors                                    */
/* -------------------------------------------------------------------------- */

export const selectMarketMeta = (s: RootState) => s.market as MarketState;

export const selectMetaByCToken = (cToken: string) => (s: RootState) =>
  (s.market as MarketState)[cToken];

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export const { setMarketMeta, updatePriceUsd, updateCollateralFactor } =
  MarketSlice.actions;

export default MarketSlice.reducer;
