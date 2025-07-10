import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  LinearProgress, 
  Skeleton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/Store';
import { Position, updateNetAPY, updateNetBorrowBalance, updateNetSupplyBalance } from '../../features/dashboard/AccountSlice';
import { formatNumber } from '../../utils/constant';
import { selectBorrowLimitUsd, selectBorrowUtil, selectRiskColour } from '../../features/dashboard/BorrowLimitSlice';
import { createSelector } from '@reduxjs/toolkit';

function MarketHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch<AppDispatch>();

  const selectWSXSupplyBalance = (state: RootState) => state.wsx.supplyBalance;
  const selectWSXBorrowBalance = (state: RootState) => state.wsx.borrowBalance;
  const selectWSXSupplyAPY = (state: RootState) => state.wsx.supplyRate;
  const selectWSXBorrowAPY = (state: RootState) => state.wsx.borrowRate;
  
  const selectUSDCSupplyBalance = (state: RootState) => state.usdc.supplyBalance;
  const selectUSDCBorrowBalance = (state: RootState) => state.usdc.borrowBalance;
  const selectUSDCSupplyAPY = (state: RootState) => state.usdc.supplyRate;
  const selectUSDCBorrowAPY = (state: RootState) => state.usdc.borrowRate;

  const selectWSXOraclePrice = (state: RootState) => state.wsx.oraclePrice;
  const selectUSDCOraclePrice = (state: RootState) => state.usdc.oraclePrice;

  

  const supplyPositions = createSelector([selectWSXSupplyBalance, selectUSDCSupplyBalance, selectWSXOraclePrice, selectUSDCOraclePrice], (wsxSupplyBalance, usdcSupplyBalance, wsxOraclePrice, usdcOraclePrice) => {
    
    const wsxSupplyValue = wsxSupplyBalance * wsxOraclePrice;
    const usdcSupplyValue = usdcSupplyBalance * usdcOraclePrice;
    const netSupplyBalance = wsxSupplyValue + usdcSupplyValue;
    
    return netSupplyBalance;
  });
  const borrowPositions = createSelector([selectWSXBorrowBalance, selectUSDCBorrowBalance, selectWSXOraclePrice, selectUSDCOraclePrice], (wsxBorrowBalance, usdcBorrowBalance, wsxOraclePrice, usdcOraclePrice) => {
    const wsxBorrowValue = wsxBorrowBalance * wsxOraclePrice;
    const usdcBorrowValue = usdcBorrowBalance * usdcOraclePrice;
    const netBorrowBalance = wsxBorrowValue + usdcBorrowValue;
    return netBorrowBalance;
  });

  const netAPYPositions = createSelector([selectWSXBorrowAPY, selectWSXSupplyAPY, selectUSDCBorrowAPY, selectUSDCSupplyAPY], (wsxBorrowAPY, wsxSupplyAPY, usdcBorrowAPY, usdcSupplyAPY) => {
    const wsxNetAPY = wsxSupplyAPY - wsxBorrowAPY;
    const usdcNetAPY = usdcSupplyAPY - usdcBorrowAPY;
    return (wsxNetAPY + usdcNetAPY) / 2;
  });

  
  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil = useSelector(selectBorrowUtil) * 100;
  const riskColour = useSelector(selectRiskColour);
  
  const isLoading = !supplyPositions || !borrowPositions || netAPYPositions === undefined;


  const supplyBalance = supplyPositions(useSelector((state: RootState) => state)) || 0;
  const borrowBalance = borrowPositions(useSelector((state: RootState) => state)) || 0;
  const netAPY = netAPYPositions(useSelector((state: RootState) => state)) || 0;


  useEffect(() => {
    dispatch(updateNetSupplyBalance());
    dispatch(updateNetBorrowBalance());
    dispatch(updateNetAPY());
  }, [dispatch]);

  const getRiskColor = () => {
    switch(riskColour) {
      case 'danger': return theme.palette.error.main;
      case 'warning': return theme.palette.warning.main;
      default: return theme.palette.success.main;
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      mb: 4,
      px: isMobile ? 2 : 0
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 4,
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(to bottom, rgba(66, 165, 245, 0.05), rgba(66, 165, 245, 0.02))'
            : 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), rgba(10, 10, 10, 0.8))',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container spacing={isMobile ? 2 : 4} alignItems="center" justifyContent="center">
          {/* Supply Balance */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Supply Balance
            </Typography>
            {isLoading ? (
              <Skeleton variant="text" width={120} height={40} sx={{ mx: 'auto' }} />
            ) : (
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                color: theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light',
              }}>
                ${formatNumber(supplyBalance, 2)}
              </Typography>
            )}
          </Grid>

          {/* Net APY */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Net APY
            </Typography>
            {isLoading ? (
              <Skeleton variant="text" width={80} height={40} sx={{ mx: 'auto' }} />
            ) : (
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                color: netAPY >= 0 ? 'success.main' : 'error.main',
              }}>
                {netAPY >= 0 ? '+' : ''}{formatNumber(netAPY, 2)}%
              </Typography>
            )}
          </Grid>

          {/* Borrow Balance */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Borrow Balance
            </Typography>
            {isLoading ? (
              <Skeleton variant="text" width={120} height={40} sx={{ mx: 'auto' }} />
            ) : (
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                color: theme.palette.mode === 'light' ? 'secondary.dark' : 'secondary.light',
              }}>
                ${formatNumber(borrowBalance, 2)}
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Borrow Limit */}
        <Box sx={{ 
          width: '100%', 
          mt: 4,
          px: isMobile ? 0 : 4
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 1
          }}>
            <Typography variant="subtitle1" color="text.secondary">
              Borrow Limit
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {isLoading ? (
                <Skeleton variant="text" width={60} />
              ) : (
                `${formatNumber(borrowUtil, 2)}%`
              )}
            </Typography>
          </Box>
          
          {isLoading ? (
            <Skeleton variant="rounded" height={8} />
          ) : (
            <LinearProgress
              variant="determinate"
              value={borrowUtil > 100 ? 100 : borrowUtil}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: theme.palette.mode === 'light' 
                  ? 'rgba(66, 165, 245, 0.1)' 
                  : 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: getRiskColor(),
                }
              }}
            />
          )}
          
          {!isLoading && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 1
            }}>
              <Typography variant="caption" color="text.secondary">
                ${formatNumber(0, 2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ${formatNumber(borrowLimitUsd, 2)}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default MarketHeader;