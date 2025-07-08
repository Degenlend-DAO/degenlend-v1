import * as React from "react";
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
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

// Token Information
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";
import SupplyDetails from "../widgets/supply/supplyDetails";
import WithdrawDetails from "../widgets/withdraw/withdrawDetails";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import EnableWarning from "../widgets/enableWarning";
import {
  updateUSDCSupplyBalance,
  updateUSDCSupplyRate,
  updateUSDCBalance,
} from "../../../features/dashboard/USDCMarketSlice";
import { useEffect } from "react";
import { Transition } from "../../../utils/Transition";
import SupplyMarketsHeader from "../widgets/supply/supplyMarketsHeader";
import { 
  selectBorrowLimitUsd, 
  selectBorrowUtil, 
  selectRiskColour 
} from "../../../features/dashboard/BorrowLimitSlice";

interface SupplyMarketDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

function USDCSupplyMarketDialog(props: SupplyMarketDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = React.useState("supply");
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const isUSDCTokenEnabled = useSelector((state: RootState) => state.usdc.isEnabled);
  const usdcSupplyAPY = useSelector((state: RootState) => state.usdc.supplyRate);
  const usdcSupplyBalance = useSelector((state: RootState) => state.usdc.supplyBalance);
  const usdcWalletBalance = useSelector((state: RootState) => state.usdc.balance);
  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil = useSelector(selectBorrowUtil) * 100;
  const riskColour = useSelector(selectRiskColour);

  const isLoading = usdcWalletBalance === undefined || usdcSupplyAPY === undefined;

  useEffect(() => {
    // Add any necessary data fetching here
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
            {activeTab === 'supply' ? 'Supply USDC to earn interest' : 'Withdraw your supplied USDC'}
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
                label="Supply" 
                value="supply" 
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  minHeight: 48,
                  color: activeTab === 'supply' 
                    ? theme.palette.text.primary 
                    : theme.palette.text.secondary,
                }}
              />
              <Tab 
                label="Withdraw" 
                value="withdraw" 
                sx={{
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  minHeight: 48,
                  color: activeTab === 'withdraw' 
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
              <SupplyMarketsHeader 
                type="usdc" 
                isInput={activeTab === 'supply' ? isUSDCTokenEnabled : true} 
              />
            )}
          </Box>

          {activeTab === 'supply' ? (
            <TabPanel value="supply" sx={{ p: 0 }}>
              {isLoading ? (
                <Skeleton variant="rounded" height={200} />
              ) : (
                <SupplyDetails
                  type="usdc"
                  supplyAPY={usdcSupplyAPY}
                  supplyBalance={usdcWalletBalance}
                  isSupplyingEnabled={isUSDCTokenEnabled}
                />
              )}
            </TabPanel>
          ) : (
            <TabPanel value="withdraw" sx={{ p: 0 }}>
              {isLoading ? (
                <Skeleton variant="rounded" height={200} />
              ) : (
                <WithdrawDetails
                  type="usdc"
                  supplyAPY={usdcSupplyAPY}
                  supplyBalance={usdcSupplyBalance}
                  borrowLimit={borrowLimitUsd}
                  borrowLimitUsed={borrowUtil}
                />
              )}
            </TabPanel>
          )}
        </TabContext>
      </DialogContent>
    </Dialog>
  );
}

export default USDCSupplyMarketDialog;