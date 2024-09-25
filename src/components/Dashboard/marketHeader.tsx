import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/Store';
import { updateBorrowLimit, updateNetAPY, updateNetBorrowBalance, updateNetSupplyBalance } from '../../features/dashboard/AccountSlice';
import { formatNumber } from '../../utils/constant';

function MarketHeader() {
  const supplyBalance = useSelector((state: RootState) => state.account.netSupplyBalance);
  const borrowBalance = useSelector((state: RootState) => state.account.netBorrowBalance);
  const netAPY = useSelector((state: RootState) => state.account.netAPY);
  const borrowLimit = useSelector((state: RootState) => state.account.borrowLimit);
  const loading = useSelector((state: RootState) => state.account.loading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateNetSupplyBalance());
    dispatch(updateNetBorrowBalance());
    dispatch(updateBorrowLimit());
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
              {loading ? <Skeleton width={100} height={30} /> : `$${formatNumber(supplyBalance)}`}
            </Typography>
          </Grid>

          {/* Net APY */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              Net APY
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {loading ? <Skeleton width={100} height={30} /> : `${formatNumber(netAPY)}%`}
            </Typography>
          </Grid>

          {/* Borrow Balance */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              Borrow Balance (in USD)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {loading ? <Skeleton width={100} height={30} /> : `$${formatNumber(borrowBalance)}`}
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
              value={borrowLimit}
              sx={{ height: 8, borderRadius: 5 }}
            />
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold', color: 'primary.main' }}>
              {loading ? <Skeleton width={50} height={20} /> : `${formatNumber(borrowLimit)}%`}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MarketHeader;
