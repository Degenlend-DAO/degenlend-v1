import React, { useState, useEffect } from 'react';

import { Button, Menu, MenuItem, Box, useTheme, styled } from '@mui/material';

import { useGlideDeposit } from '@paywithglide/glide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/Store';



const DepositButton = () => {
  const theme = useTheme();
  const walletAddress = useSelector((state: RootState) => state.wallet.address);

  const { openGlideDeposit } = useGlideDeposit({
    app: "degenlend",
    mode: "deposit",
   
    /* The wallet address that will receive the deposit.
     * This is usually the user's connected wallet addres.
     */
    recipient: walletAddress,
  });

  const handleDeposit = () => {
    openGlideDeposit();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleDeposit}
      sx={{
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: '12px',
        padding: '8px 16px',
        boxShadow: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      Deposit
    </Button>
  );
}

export default DepositButton