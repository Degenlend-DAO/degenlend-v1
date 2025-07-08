import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Paper, Switch, TableContainer, Typography, useTheme, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import EnableMarketDialog from "./enableCollateralDialog";
import React, { useEffect, useState } from "react";
import USDCSupplyMarketDialog from "./usdcSupplyMarketDialog";
import WSXSupplyMarketDialog from "./wsxSupplyMarketDialog";
import {
  isUSDCListedAsCollateral,
  updateUSDCSupplyRate,
  updateUSDCOraclePrice,
  updateUSDCBalance,
} from "../../../features/dashboard/USDCMarketSlice";
import {
  isWSXListedAsCollateral,
  updateWSXSupplyRate,
  updateWSXOraclePrice,
  updateWSXBalance,
  updateWSXSupplyBalance,
} from "../../../features/dashboard/WSXMarketSlice";
import { formatNumber } from "../../../utils/constant";
import { selectBorrowLimitUsd, selectBorrowUtil, selectRiskColour } from "../../../features/dashboard/BorrowLimitSlice";
import sxTokenLogo from "../../../assets/img/sx_coin_token.png";
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function SupplyMarkets() {
  const theme = useTheme();
  const [enableSXDialogOpen, setEnableSXDialogOpen] = useState(false);
  const [enableUSDCDialogOpen, setEnableUSDCDialogOpen] = useState(false);
  const [supplySXDialogOpen, setSupplySXDialogOpen] = useState(false);
  const [supplyUSDCDialogOpen, setSupplyUSDCDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const isUSDCCollateral = useSelector((state: RootState) => state.usdc.isCollateral);
  const isWSXCollateral = useSelector((state: RootState) => state.wsx.isCollateral);
  const usdcSupplyAPY = useSelector((state: RootState) => state.usdc.supplyRate);
  const usdcSupplyBalance = useSelector((state: RootState) => state.usdc.supplyBalance);
  const usdcOraclePrice = useSelector((state: RootState) => state.usdc.oraclePrice);
  const wsxSupplyAPY = useSelector((state: RootState) => state.wsx.supplyRate);
  const wsxSupplyBalance = useSelector((state: RootState) => state.wsx.supplyBalance);
  const wsxOraclePrice = useSelector((state: RootState) => state.wsx.oraclePrice);
  const borrowLimitUsd = useSelector(selectBorrowLimitUsd);
  const borrowUtil = useSelector(selectBorrowUtil) * 100;
  const riskColour = useSelector(selectRiskColour);

  function handleSXRowClick(event: React.MouseEvent) {
    setSupplySXDialogOpen(true);
  }

  function handleUSDCRowClick(event: React.MouseEvent) {
    setSupplyUSDCDialogOpen(true);
  }

  const handleSXSwitchClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEnableSXDialogOpen(true);
  };

  const handleUSDCSwitchClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEnableUSDCDialogOpen(true);
  };

  useEffect(() => {
    dispatch(updateWSXSupplyBalance());
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
                    Supply Markets
                  </Typography>
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
              <TableCell align="right">APY</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="center">Collateral</TableCell>
              <TableCell align="right">Price</TableCell>
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
              <TableCell align="right" sx={{ color: theme.palette.success.main }}>
                <Typography fontWeight={600}>
                  {formatNumber(wsxSupplyAPY)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500}>
                  {formatNumber(wsxSupplyBalance)} WSX
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Switch
                  onClick={handleSXSwitchClick}
                  checked={isWSXCollateral}
                  color="primary"
                  sx={{
                    '& .MuiSwitch-thumb': {
                      boxShadow: theme.shadows[1],
                    },
                    '& .Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                    '& .Mui-checked + .MuiSwitch-track': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500}>
                  ${formatNumber(wsxOraclePrice)}
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
              <TableCell align="right" sx={{ color: theme.palette.success.main }}>
                <Typography fontWeight={600}>
                  {formatNumber(usdcSupplyAPY)}%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500}>
                  {formatNumber(usdcSupplyBalance)} USDC
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Switch
                  onClick={handleUSDCSwitchClick}
                  checked={isUSDCCollateral}
                  color="primary"
                  sx={{
                    '& .MuiSwitch-thumb': {
                      boxShadow: theme.shadows[1],
                    },
                    '& .Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                    '& .Mui-checked + .MuiSwitch-track': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500}>
                  ${formatNumber(usdcOraclePrice)}
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
      <EnableMarketDialog
        type="sx"
        title="Wrapped SX"
        open={enableSXDialogOpen}
        onClose={() => setEnableSXDialogOpen(false)}
        borrowLimit={borrowLimitUsd}
        borrowLimitUsed={borrowUtil}
      />
      <EnableMarketDialog
        type="usdc"
        title="USDC"
        open={enableUSDCDialogOpen}
        onClose={() => setEnableUSDCDialogOpen(false)}
        borrowLimit={borrowLimitUsd}
        borrowLimitUsed={borrowUtil}
      />
      <WSXSupplyMarketDialog
        open={supplySXDialogOpen}
        onClose={() => setSupplySXDialogOpen(false)}
        title={"Wrapped SX"}
      />
      <USDCSupplyMarketDialog
        open={supplyUSDCDialogOpen}
        onClose={() => setSupplyUSDCDialogOpen(false)}
        title={"USDC"}
      />
    </>
  );
}