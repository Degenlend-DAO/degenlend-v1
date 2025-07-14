import { useGlideDeposit } from '@paywithglide/glide-react';

import { Button, Box, useTheme, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/Store';




const WithdrawButton = () => {
  const theme = useTheme();
  const walletAddress = useSelector((state: RootState) => state.wallet.address);

  const { openGlideDeposit } = useGlideDeposit({
    app: "degenlend",
    mode: "withdraw",
    recipient: walletAddress, // Replace with the actual recipient address
  });

  const handleWithdraw = () => {
    openGlideDeposit();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleWithdraw}
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
      Withdraw
    </Button>
  );
};

export default WithdrawButton;