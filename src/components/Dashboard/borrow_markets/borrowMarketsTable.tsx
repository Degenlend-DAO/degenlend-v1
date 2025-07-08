import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Paper, TableContainer, Typography, useTheme, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import WSXBorrowMarketDialog from "./wsxBorrowMarketDialog";
import USDCBorrowMarketDialog from "./usdcBorrowMarketDialog";
import { 
  updateUSDCBalance, 
  updateUSDCBorrowRate, 
  updateUSDCOraclePrice  
} from "../../../features/dashboard/USDCMarketSlice";
import { 
  updateWSXBalance, 
  updateWSXBorrowRate, 
  updateWSXOraclePrice, 
  updateWSXLiquidityInUSD 
} from "../../../features/dashboard/WSXMarketSlice";
import { formatNumber } from "../../../utils/constant";
import sxTokenLogo from "../../../assets/img/sx_coin_token.png";
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { selectBorrowLimitUsd, selectBorrowUtil, selectRiskColour } from "../../../features/dashboard/BorrowLimitSlice";

export default function BorrowMarkets() {
  const theme = useTheme();
  const [borrowSXDialogOpen, setBorrowSXDialogOpen] = React.useState(false);
  const [borrowUSDCDialogOpen, setBorrowUSDCDialogOpen] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const usdcBorrowAPY = useSelector((state: RootState) => state.usdc.borrowRate);
  const usdcWalletBalance = useSelector((state: RootState) => state.usdc.borrowBalance);
  const usdcLiquidity = useSelector((state: RootState) => state.usdc.liquidityInUSD);
  const wsxBorrowAPY = useSelector((state: RootState) => state.wsx.borrowRate);
  const wsxBorrowBalance = useSelector((state: RootState) => state.wsx.borrowBalance);
  const wsxLiquidity = useSelector((state: RootState) => state.wsx.liquidityInUSD);
  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil = useSelector(selectBorrowUtil) * 100;
  const riskColour = useSelector(selectRiskColour);

  function handleSXRowClick(event: React.MouseEvent) {
    setBorrowSXDialogOpen(true);
  }

  function handleUSDCRowClick(event: React.MouseEvent) {
    setBorrowUSDCDialogOpen(true);
  }

  useEffect(() => {
    // update borrow apys, wallet balances, and oracle prices
    dispatch(updateUSDCBorrowRate());
    dispatch(updateWSXBorrowRate());
    dispatch(updateWSXBalance());
    dispatch(updateUSDCBalance());
    dispatch(updateUSDCOraclePrice());
    dispatch(updateWSXOraclePrice());
    dispatch(updateWSXLiquidityInUSD());
  });

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 3,
          borderRadius: 4,
          overflow: 'hidden',
          background: theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(20, 20, 20, 0.8)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Table Header */}
        <Table size="medium">
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} sx={{ borderBottom: 'none', py: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" fontWeight={700}>
                    Borrow Markets
                  </Typography>
                  <Chip 
                    label={`Borrow Limit: $${formatNumber(borrowLimitUsd)}`}
                    color={
                      riskColour === "safe"
                        ? "success"
                        : riskColour === "danger"
                        ? "error"
                        : "warning"
                    }
                    variant="outlined"
                    sx={{ 
                      fontWeight: 600,
                      borderWidth: 2,
                      borderColor: theme.palette[
                        riskColour === "safe" ? "success" : 
                        riskColour === "danger" ? "error" : 
                        "warning"
                      ].main,
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Table Body */}
        <Table size="medium">
          <TableHead>
            <TableRow sx={{ 
              '& th': {
                fontWeight: 600,
                color: theme.palette.text.secondary,
                borderColor: theme.palette.divider,
              }
            }}>
              <TableCell>Asset</TableCell>
              <TableCell align="right">Borrow APY</TableCell>
              <TableCell align="right">Your Borrows</TableCell>
              <TableCell align="right">Available Liquidity</TableCell>
              <TableCell width={40}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Wrapped SX Market Details */}
            <TableRow
              hover
              sx={{ 
                cursor: "pointer",
                '&:last-child td': { borderBottom: 'none' },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
              onClick={handleSXRowClick}
            >
              <TableCell sx={{ py: 2.5 }}>
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    sx={{ 
                      height: 30, 
                      width: 30, 
                      mr: 2,
                      borderRadius: '50%',
                      boxShadow: theme.shadows[1]
                    }}
                    alt="Wrapped SX Logo"
                    src={sxTokenLogo}
                  />
                  <Typography variant="body1" fontWeight={500}>
                    Wrapped SX
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ color: theme.palette.error.main }}>
                <Typography fontWeight={600}>
                  {formatNumber(wsxBorrowAPY)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500}>
                  {formatNumber(wsxBorrowBalance)} WSX
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500}>
                  ${formatNumber(wsxLiquidity)}
                </Typography>
              </TableCell>
              <TableCell>
                <ArrowForwardIosIcon sx={{ 
                  fontSize: 16, 
                  color: theme.palette.text.secondary 
                }} />
              </TableCell>
            </TableRow>
            
            {/* USDC Market Details */}
            <TableRow
              hover
              sx={{ 
                cursor: "pointer",
                '&:last-child td': { borderBottom: 'none' },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
              onClick={handleUSDCRowClick}
            >
              <TableCell sx={{ py: 2.5 }}>
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    sx={{ 
                      height: 30, 
                      width: 30, 
                      mr: 2,
                      borderRadius: '50%',
                      boxShadow: theme.shadows[1]
                    }}
                    alt="USDC Logo"
                    src={usdcTokenLogo}
                  />
                  <Typography variant="body1" fontWeight={500}>
                    USD Coin
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ color: theme.palette.error.main }}>
                <Typography fontWeight={600}>
                  {formatNumber(usdcBorrowAPY)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500}>
                  {formatNumber(usdcWalletBalance)} USDC
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500}>
                  ${formatNumber(usdcLiquidity)}
                </Typography>
              </TableCell>
              <TableCell>
                <ArrowForwardIosIcon sx={{ 
                  fontSize: 16, 
                  color: theme.palette.text.secondary 
                }} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Market Dialogs */}
      <WSXBorrowMarketDialog 
        open={borrowSXDialogOpen} 
        onClose={() => setBorrowSXDialogOpen(false)} 
        title={"Wrapped SX"} 
      />
      <USDCBorrowMarketDialog 
        open={borrowUSDCDialogOpen} 
        onClose={() => setBorrowUSDCDialogOpen(false)} 
        title={"USDC"} 
      />
    </>
  );
}