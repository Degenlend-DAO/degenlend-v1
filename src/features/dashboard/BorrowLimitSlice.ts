// ─────────────────────────────────────────────────────────────
//  BorrowLimitSlice.ts  ▸  Redux slice + pure selectors for risk
//
//  State here is empty: the metrics are derived entirely from other
//  slices (account & market). The slice exists so we can register a
//  reducer key (`borrowLimit`) while keeping memoised selectors in
//  one place.
// ─────────────────────────────────────────────────────────────

import { createSlice, createSelector } from '@reduxjs/toolkit';
import { formatUnits } from 'viem';
import type { RootState } from '../../app/Store';

/* -------------------------------------------------------------------------- */
/*                                 Types                                      */
/* -------------------------------------------------------------------------- */

export interface MarketMeta {
  cToken: string;
  priceUsd: number;
  collateralFactor: number; // 0‑1
  decimals: number;         // 6, 18, …
}

export interface Position { cToken: string; balance: bigint; }

/* -------------------------------------------------------------------------- */
/*                             Base selectors                                 */
/* -------------------------------------------------------------------------- */

const selectSupplies   = (s: RootState): Position[]             => s.account.netSupplyBalance;
const selectBorrows    = (s: RootState): Position[]             => s.account.netBorrowBalance;
const selectMarketMeta = (s: RootState): Record<string,MarketMeta> => s.market.meta;

/* -------------------------------------------------------------------------- */
/*                            Derived metrics                                 */
/* -------------------------------------------------------------------------- */

export const selectBorrowLimitUsd = createSelector(
  [selectSupplies, selectMarketMeta],
  (supplies, meta) => supplies.reduce((tot, pos) => {
    const m = meta[pos.cToken];
    if (!m) return tot;
    const val = Number(formatUnits(pos.balance, m.decimals)) * m.priceUsd;
    return tot + val * m.collateralFactor;
  }, 0)
);

export const selectBorrowedUsd = createSelector(
  [selectBorrows, selectMarketMeta],
  (borrows, meta) => borrows.reduce((tot, pos) => {
    const m = meta[pos.cToken];
    if (!m) return tot;
    return tot + Number(formatUnits(pos.balance, m.decimals)) * m.priceUsd;
  }, 0)
);

export const selectBorrowUtil = createSelector(
  [selectBorrowedUsd, selectBorrowLimitUsd],
  (borrowed, limit) => (limit === 0 ? 0 : borrowed / limit)
);

export const selectAvailableUsd = createSelector(
  [selectBorrowLimitUsd, selectBorrowedUsd],
  (limit, borrowed) => Math.max(limit - borrowed, 0)
);

export const selectRiskMetrics = createSelector(
  [selectBorrowLimitUsd, selectBorrowedUsd, selectAvailableUsd, selectBorrowUtil],
  (limit, borrowed, available, util) => ({ limit, borrowed, available, util })
);

export const selectHypotheticalUtil = (additionalUsd: number) => createSelector(
  [selectBorrowedUsd, selectBorrowLimitUsd],
  (borrowed, limit) => {
    const newBorrowed = borrowed + additionalUsd;
    return limit === 0 ? 0 : newBorrowed / limit;
  }
);

export const selectRiskColour = createSelector(
  [selectBorrowUtil],
  (util): 'safe' | 'warning' | 'danger' => {
    if (util >= 0.9) return 'danger';
    if (util >= 0.75) return 'warning';
    return 'safe';
  }
);

/* -------------------------------------------------------------------------- */
/*                                 Slice                                      */
/* -------------------------------------------------------------------------- */

const BorrowLimitSlice = createSlice({
  name: 'borrowLimit',
  initialState: {},   // purely derived slice – no local state
  reducers: {}
});

export default BorrowLimitSlice.reducer;
