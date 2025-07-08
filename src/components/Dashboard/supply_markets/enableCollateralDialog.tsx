import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Alert,
  LinearProgress,
  Link,
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import {
  enterUSDCMarket,
  enterWSXMarket,
  exitWSXMarket,
  exitUSDCMarket,
} from "../../../features/dashboard/AccountSlice";
import { resetTx } from "../../../features/dashboard/transactionSlice";

// Components
import ConfirmTransactionDialog from "../widgets/confirmTransactionDialog";
import { Transition } from "../../../utils/Transition";

interface EnableMarketsProps {
  open: boolean;
  onClose: () => void;
  title: string;
  type: "sx" | "usdc";
  borrowLimit: number;
  borrowLimitUsed: number;
}

function EnableMarketDialog(props: EnableMarketsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch<AppDispatch>();
  const { onClose, type, open, title } = props;

  // Selectors
  const isUSDCCollateral = useSelector((state: RootState) => state.usdc.isCollateral);
  const isWSXCollateral = useSelector((state: RootState) => state.wsx.isCollateral);
  const transactionState = useSelector((state: RootState) => state.transactions);

  // State
  const [confirmTransactionOpen, setConfirmTransactionOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(type === "usdc" ? isUSDCCollateral : isWSXCollateral);
  const [isProcessing, setIsProcessing] = useState(false);

  // Derived values
  const actionText = isEnabled ? "Remove" : "Add";
  const newBorrowLimit = isEnabled 
    ? props.borrowLimit * 0.9 // Example calculation
    : props.borrowLimit * 1.1;
  const newBorrowLimitUsed = isEnabled 
    ? props.borrowLimitUsed * 1.1 
    : props.borrowLimitUsed * 0.9;

  useEffect(() => {
    setIsEnabled(type === "usdc" ? isUSDCCollateral : isWSXCollateral);
  }, [type, isUSDCCollateral, isWSXCollateral]);

  const handleConfirm = async () => {
    setIsProcessing(true);
    setConfirmTransactionOpen(false);
    
    try {
      if (type === "sx") {
        isEnabled ? dispatch(exitWSXMarket()) : dispatch(enterWSXMarket());
      } else {
        isEnabled ? dispatch(exitUSDCMarket()) : dispatch(enterUSDCMarket());
      }
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onClose();
    } finally {
      setIsProcessing(false);
      dispatch(resetTx());
    }
  };

  const getRiskColor = (percentage: number) => {
    if (percentage > 80) return theme.palette.error.main;
    if (percentage > 50) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        <DialogTitle sx={{ 
          position: 'relative',
          textAlign: 'center',
          pt: 4,
          pb: 2,
        }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {actionText} {title} as Collateral
          </Typography>
          
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <DialogContent sx={{ 
          px: isMobile ? 2 : 4,
          pt: 3,
          pb: isMobile ? 2 : 4,
        }}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            Using assets as collateral increases your borrowing limit but subjects them to potential liquidation.
            <Link href="#learn-more" underline="hover" sx={{ ml: 1 }}>
              Learn more
            </Link>
          </Alert>

          {/* Impact Preview */}
          <Box sx={{ 
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(66, 165, 245, 0.05)' 
              : 'rgba(255, 255, 255, 0.03)',
            borderRadius: 2,
            p: 3,
            mb: 3
          }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Impact on Your Position
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Borrow Limit</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  ${formatNumber(props.borrowLimit)} → ${formatNumber(newBorrowLimit)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, props.borrowLimitUsed)}
                sx={{ 
                  height: 6,
                  borderRadius: 3,
                  mb: 0.5,
                  backgroundColor: theme.palette.mode === 'light' 
                    ? 'rgba(66, 165, 245, 0.1)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    backgroundColor: getRiskColor(props.borrowLimitUsed),
                  }
                }}
              />
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Borrow Limit Used</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {formatNumber(props.borrowLimitUsed)}% → {formatNumber(newBorrowLimitUsed)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, newBorrowLimitUsed)}
                sx={{ 
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: theme.palette.mode === 'light' 
                    ? 'rgba(66, 165, 245, 0.1)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    backgroundColor: getRiskColor(newBorrowLimitUsed),
                  }
                }}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => setConfirmTransactionOpen(true)}
            disabled={isProcessing}
            sx={{
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              backgroundColor: isEnabled ? theme.palette.error.main : theme.palette.primary.main,
              '&:hover': {
                backgroundColor: isEnabled ? theme.palette.error.dark : theme.palette.primary.dark,
              }
            }}
          >
            {isProcessing ? 'Processing...' : `${actionText} ${title} as Collateral`}
          </Button>
        </DialogContent>
      </Dialog>

      <ConfirmTransactionDialog
        open={confirmTransactionOpen}
        onClose={() => setConfirmTransactionOpen(false)}
        onConfirm={handleConfirm}
        title={`Confirm ${actionText} Collateral`}
        description={`You are about to ${actionText.toLowerCase()} ${title} as collateral. This will affect your borrowing capacity.`}
      />
    </>
  );
}

export default EnableMarketDialog;

// Helper function for number formatting
function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}