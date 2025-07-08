import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet, disconnectWallet } from '../features/wallet/walletSlice';
import { AppDispatch, RootState } from "../app/Store";
import { useEffect, useState } from 'react';
import { Menu, MenuItem, styled, useTheme } from '@mui/material';
import { isUSDCListedAsCollateral, updateUSDCSupplyRate, updateUSDCBalance, updateUSDCOraclePrice, updateUSDCBorrowBalance, updateUSDCSupplyBalance, updateUSDCBorrowRate } from '../features/dashboard/USDCMarketSlice';
import { isWSXListedAsCollateral, updateWSXSupplyRate, updateWSXBalance, updateWSXOraclePrice, updateWSXBorrowBalance, updateWSXSupplyBalance, updateWSXBorrowRate } from '../features/dashboard/WSXMarketSlice';
import { updateNetAPY, updateNetBorrowBalance, updateNetSupplyBalance } from '../features/dashboard/AccountSlice';

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '12px',
  padding: '10px 16px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.palette.mode === 'light' 
      ? theme.palette.primary.dark 
      : theme.palette.secondary.dark,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '10px 16px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(66, 165, 245, 0.08)' 
      : 'rgba(255, 255, 255, 0.04)',
  },
}));

const ConnectWallet = () => {
    const [anchorElement, setAnchorElement] = useState<EventTarget & HTMLButtonElement | null>(null)
    const isWalletConnected = useSelector((state: RootState) => state.wallet.isConnected);
    const walletAddress = useSelector((state: RootState) => state.wallet.address);
    const theme = useTheme();

    const filteredWalletAddress = (address: string | undefined) => {
        if (!address) return '';
        const size = address.length;
        const prefix = address.substring(0, 5);
        const suffix = address.substring(size - 5);
        return `${prefix}...${suffix}`;
    }
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

    const onConnectWallet = () => {
        dispatch(connectWallet());
    }

    const onDisconnectWallet = () => {
        dispatch(disconnectWallet());
    }

    useEffect(() => {
        if (isWalletConnected) {
          dispatch(isWSXListedAsCollateral());
          dispatch(isUSDCListedAsCollateral());
      
          dispatch(updateUSDCSupplyRate());
          dispatch(updateWSXSupplyRate());
      
          dispatch(updateUSDCBorrowRate());
          dispatch(updateWSXBorrowRate());
      
          dispatch(updateWSXBalance());
          dispatch(updateUSDCBalance());
      
          dispatch(updateUSDCSupplyBalance());
          dispatch(updateWSXSupplyBalance());
      
          dispatch(updateUSDCBorrowBalance());
          dispatch(updateWSXBorrowBalance());
      
          dispatch(updateUSDCOraclePrice());
          dispatch(updateWSXOraclePrice());
      
          dispatch(updateNetSupplyBalance());
          dispatch(updateNetBorrowBalance());
          dispatch(updateNetAPY());

          const priceInterval = setInterval(() => {
            dispatch(updateUSDCOraclePrice());
            dispatch(updateWSXOraclePrice());
            dispatch(isWSXListedAsCollateral());
            dispatch(isUSDCListedAsCollateral());
          }, 15_000);
        
          return () => {
            clearInterval(priceInterval);
          };
        }
      }, [dispatch, isWalletConnected]);
      

    return (
        <Box sx={{ 
          maxWidth: '200px',
          width: '100%',
        }}>
            {
                isWalletConnected ? (
                    <>
                        <StyledButton
                            variant='contained'
                            onClick={handleClick}
                            size='medium'
                            aria-label="button to open dropdown"
                            fullWidth
                            sx={{
                              backgroundColor: theme.palette.mode === 'light' 
                                ? theme.palette.primary.main 
                                : theme.palette.secondary.main,
                            }}
                        >
                            {filteredWalletAddress(walletAddress)}
                        </StyledButton>
                        <Menu
                            anchorEl={anchorElement}
                            open={Boolean(anchorElement)}
                            onClose={handleClose}
                            PaperProps={{
                              elevation: 2,
                              sx: {
                                borderRadius: '12px',
                                minWidth: '200px',
                                marginTop: '8px',
                                border: `1px solid ${theme.palette.divider}`,
                                backgroundColor: theme.palette.mode === 'light' 
                                  ? theme.palette.background.paper 
                                  : theme.palette.background.default,
                              }
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <StyledMenuItem 
                              onClick={() => { handleClose(); onDisconnectWallet(); }}
                              sx={{
                                color: theme.palette.mode === 'light' 
                                  ? theme.palette.error.main 
                                  : theme.palette.error.light,
                              }}
                            >
                                Disconnect Wallet
                            </StyledMenuItem>
                        </Menu>
                    </>
                ) : (
                    <StyledButton
                        variant='contained'
                        onClick={onConnectWallet}
                        size='medium'
                        aria-label="button to connect wallet"
                        fullWidth
                        sx={{
                          backgroundColor: theme.palette.mode === 'light' 
                            ? theme.palette.primary.main 
                            : theme.palette.secondary.main,
                        }}
                    >
                        Connect Wallet
                    </StyledButton>
                )
            }
        </Box>
    );
}

export default ConnectWallet;