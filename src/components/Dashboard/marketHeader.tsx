import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/Store';
import { Position, updateNetAPY, updateNetBorrowBalance, updateNetSupplyBalance } from '../../features/dashboard/AccountSlice';
import { formatNumber } from '../../utils/constant';
import { selectBorrowLimitUsd, selectBorrowUtil, selectRiskColour } from '../../features/dashboard/BorrowLimitSlice';

function MarketHeader() {
  const supplyPositions:Position[] = useSelector((state: RootState) => state.account.netSupplyBalance);
  const borrowPositions:Position[] = useSelector((state: RootState) => state.account.netBorrowBalance);
  const supplyBalance = supplyPositions.reduce((s, p) => s + Number(p.balance), 0);
  const borrowBalance = borrowPositions.reduce((s, p) => s + Number(p.balance), 0);
  const netAPY = useSelector((state: RootState) => state.account.netAPY);
  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil     = useSelector(selectBorrowUtil) * 100;   // 0‑1
  const riskColour     = useSelector(selectRiskColour);   // 'safe' | 'warning' | 'danger'

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateNetSupplyBalance());
    dispatch(updateNetBorrowBalance());
    dispatch(updateNetAPY());
  }, [dispatch]);


  return (
    <Box sx={{ width: '90%', mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Supply Balance */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              Supply Balance (in USD)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {`$${formatNumber(supplyBalance)}`}
            </Typography>
          </Grid>

          {/* Net APY */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              Net APY
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {`${formatNumber(netAPY)}%`}
            </Typography>
          </Grid>

          {/* Borrow Balance */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              Borrow Balance (in USD)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {`$${formatNumber(borrowBalance)}`}
            </Typography>
          </Grid>
        </Grid>

        {/* Borrow Limit */}
        <Box sx={{ width: '100%', mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Borrow Limit
          </Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={borrowUtil}
              sx={{ height: 8, borderRadius: 5 }}
            />
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold', color: 'primary.main' }}>
              {`${formatNumber(borrowUtil)}%`}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MarketHeader;
