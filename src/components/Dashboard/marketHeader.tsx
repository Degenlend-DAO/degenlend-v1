import React from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';

function MarketHeader() {
  // Dummy data, replace with real data as needed
  const supplyBalance = 0;
  const borrowBalance = 0;
  const netAPY = 0;
  const borrowLimit = 0;

  return (
    <Box sx={{ width: '90%', mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              Supply Balance
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ${supplyBalance}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              Net APY
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {netAPY}%
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" color="textSecondary">
              Borrow Balance
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ${borrowBalance}
            </Typography>
          </Grid>
        </Grid>
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
              {borrowLimit}%
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default MarketHeader;
