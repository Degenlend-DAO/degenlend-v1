import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { 
  Box, 
  Divider, 
  IconButton, 
  Typography, 
  useTheme, 
  useMediaQuery, 
  Skeleton, 
  Tab
} from "@mui/material";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

// Token Information
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";
import BorrowDetails from "../widgets/borrow/borrowDetails";
import RepayDetails from "../widgets/repay/repayDetails";
import EnableWarning from "../widgets/enableWarning";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../app/Store";
import {
  updateUSDCBalance,
  updateUSDCBorrowBalance,
  updateUSDCBorrowRate,
} from "../../../features/dashboard/USDCMarketSlice";
import { useEffect } from "react";
import { Transition } from "../../../utils/Transition";
import BorrowMarketsHeader from "../widgets/borrow/borrowMarketsHeader";
import { 
  selectBorrowLimitUsd, 
  selectBorrowUtil, 
  selectRiskColour 
} from "../../../features/dashboard/BorrowLimitSlice";

interface BorrowMarketDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function USDCBorrowMarketDialog(props: BorrowMarketDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = React.useState("borrow");
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const isUSDCEnabled = useSelector((state: RootState) => state.usdc.isEnabled);
  const usdcBorrowAPY = useSelector((state: RootState) => state.usdc.borrowRate);
  const usdcBorrowBalance = useSelector((state: RootState) => state.usdc.borrowBalance);
  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil = useSelector(selectBorrowUtil) * 100;
  const riskColour = useSelector(selectRiskColour);

  const isLoading = usdcBorrowBalance === undefined || usdcBorrowAPY === undefined;

  // When the dialog is opened, update information
  useEffect(() => {
    dispatch(updateUSDCBorrowBalance());
    dispatch(updateUSDCBorrowRate());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.96), rgba(245, 245, 245, 0.96))'
            : 'linear-gradient(to bottom, rgba(30, 30, 30, 0.98), rgba(20, 20, 20, 0.98))',
          backdropFilter: 'blur(12px)',
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
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}>
          <Box
            component="img"
            src={usdcTokenLogo}
            alt="USDC Logo"
            sx={{ 
              height: 48, 
              width: 48,
              borderRadius: '50%',
              boxShadow: theme.shadows[1],
              mb: 1
            }}
          />
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activeTab === 'borrow' ? 'Borrow USDC against your collateral' : 'Repay your borrowed USDC'}
          </Typography>
        </Box>
        
        <IconButton
          aria-label="close"
          onClick={props.onClose}
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
        <TabContext value={activeTab}>
          <Box sx={{ 
            width: '100%',
            mb: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}>
            <TabList 
              onChange={handleTabChange} 
              variant="fullWidth"
              centered
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                  backgroundColor: theme.palette.mode === 'light' 
                    ? theme.palette.primary.main 
                    : theme.palette.secondary.main,
                }
              }}
            >
              <Tab 
                label="Borrow" 
                value="borrow" 
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  minHeight: 48,
                  color: activeTab === 'borrow' 
                    ? theme.palette.text.primary 
                    : theme.palette.text.secondary,
                }}
              />
              <Tab 
                label="Repay" 
                value="repay" 
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  minHeight: 48,
                  color: activeTab === 'repay' 
                    ? theme.palette.text.primary 
                    : theme.palette.text.secondary,
                }}
              />
            </TabList>
          </Box>

          <Box sx={{ mb: 3 }}>
            {isLoading ? (
              <Skeleton variant="rounded" height={120} />
            ) : (
              <BorrowMarketsHeader 
                type="usdc" 
                input={activeTab === 'borrow'} 
              />
            )}
          </Box>

          {activeTab === 'borrow' ? (
            <TabPanel value="borrow" sx={{ p: 0 }}>
              {isLoading ? (
                <Skeleton variant="rounded" height={200} />
              ) : (
                <BorrowDetails
                  type="usdc"
                  borrowAPY={usdcBorrowAPY}
                  borrowBalance={usdcBorrowBalance}
                  borrowLimit={borrowLimitUsd}
                  borrowLimitUsed={borrowUtil}
                />
              )}
            </TabPanel>
          ) : (
            <TabPanel value="repay" sx={{ p: 0 }}>
              {isLoading ? (
                <Skeleton variant="rounded" height={200} />
              ) : (
                <RepayDetails
                  type="usdc"
                  borrowAPY={usdcBorrowAPY}
                  borrowBalance={usdcBorrowBalance}
                  isRepayingEnabled={isUSDCEnabled}
                />
              )}
            </TabPanel>
          )}
        </TabContext>
      </DialogContent>
    </Dialog>
  );
}

export default USDCBorrowMarketDialog;