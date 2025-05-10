import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box, Paper, Switch, TableContainer, Typography } from "@mui/material";

// Token Logos
import sxTokenLogo from "../../../assets/img/sx_coin_token.png";
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";

// Action Items
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
import { updateBorrowLimit } from "../../../features/dashboard/AccountSlice";
import { formatNumber } from "../../../utils/constant";

export default function SupplyMarkets() {
  const [enableSXDialogOpen, setEnableSXDialogOpen] = useState(false);
  const [enableUSDCDialogOpen, setEnableUSDCDialogOpen] = useState(false);
  const [supplySXDialogOpen, setSupplySXDialogOpen] = useState(false);
  const [supplyUSDCDialogOpen, setSupplyUSDCDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const isUSDCCollateral = useSelector(
    (state: RootState) => state.usdc.isCollateral
  );

  const isWSXCollateral = useSelector(
    (state: RootState) => state.wsx.isCollateral
  );

  const usdcSupplyAPY = useSelector(
    (state: RootState) => state.usdc.supplyRate
  );
  const usdcSupplyBalance = useSelector(
    (state: RootState) => state.usdc.supplyBalance
  );
  const usdcOraclePrice = useSelector(
    (state: RootState) => state.usdc.oraclePrice
  );

  const wsxSupplyAPY = useSelector((state: RootState) => state.wsx.supplyRate);
  const wsxSupplyBalance = useSelector((state: RootState) => state.wsx.supplyBalance);
  const wsxOraclePrice = useSelector(
    (state: RootState) => state.wsx.oraclePrice
  );

  const borrowLimit = useSelector(
    (state: RootState) => state.account.borrowLimit
  );

  const borrowLimitUsed = useSelector(
    (state: RootState) => state.account.borrowLimitUsed
  );

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
    // update collateral, supply apys, wallet balances, and oracle prices
    dispatch(updateWSXSupplyBalance())
  });

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        {/* Table Header */}
        <Table size="medium">
          <TableBody>
            <TableRow>
              <TableCell colSpan={5}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">Supply Markets</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Table Body */}
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell> Asset </TableCell>
              <TableCell> APY </TableCell>
              <TableCell> Balance </TableCell>
              <TableCell> Collateral </TableCell>
              <TableCell> Price </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Wrapped SX Market Details */}
            <TableRow
              hover
              sx={{ cursor: "pointer" }}
              onClick={(event) => {
                handleSXRowClick(event);
              }}
            >
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    sx={{ height: 25, width: 25, marginRight: 1 }}
                    alt="Wrapped SX Logo"
                    src={sxTokenLogo}
                  />
                  <Typography variant="body1">Wrapped SX</Typography>
                </Box>
              </TableCell>
              <TableCell>{formatNumber(wsxSupplyAPY)}%</TableCell>
              <TableCell>{formatNumber(wsxSupplyBalance)} WSX</TableCell>
              <TableCell>
                <Switch
                  onClick={(event) => {
                    handleSXSwitchClick(event);
                  }}
                  checked={isWSXCollateral}
                />
              </TableCell>
              <TableCell>${formatNumber(wsxOraclePrice)}</TableCell>
            </TableRow>
            {/* USDC Market Details */}
            <TableRow
              hover
              sx={{ cursor: "pointer" }}
              onClick={(event) => {
                handleUSDCRowClick(event);
              }}
            >
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    sx={{ height: 25, width: 25, marginRight: 1 }}
                    alt="USDC Logo"
                    src={usdcTokenLogo}
                  />
                  <Typography variant="body1">USD Coin</Typography>
                </Box>
              </TableCell>
              <TableCell>{formatNumber(usdcSupplyAPY)}%</TableCell>
              <TableCell>{formatNumber(usdcSupplyBalance)} USDC</TableCell>
              <TableCell>
                <Switch
                  onClick={(event) => {
                    handleUSDCSwitchClick(event);
                  }}
                  checked={isUSDCCollateral}
                />
              </TableCell>
              <TableCell>${formatNumber(usdcOraclePrice)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Market Dialogs */}
      <EnableMarketDialog
        type="sx"
        title="Wrapped SX"
        open={enableSXDialogOpen}
        onClose={() => {
          setEnableSXDialogOpen(false);
        }}
        borrowLimit={borrowLimit}
        borrowLimitUsed={borrowLimitUsed}
      />
      <EnableMarketDialog
        type="usdc"
        title="USDC"
        open={enableUSDCDialogOpen}
        onClose={() => {
          setEnableUSDCDialogOpen(false);
        }}
        borrowLimit={borrowLimit}
        borrowLimitUsed={borrowLimitUsed}
      />
      <WSXSupplyMarketDialog
        open={supplySXDialogOpen}
        onClose={() => {
          setSupplySXDialogOpen(false);
        }}
        title={"Wrapped SX"}
      />
      <USDCSupplyMarketDialog
        open={supplyUSDCDialogOpen}
        onClose={() => {
          setSupplyUSDCDialogOpen(false);
        }}
        title={"USDC"}
      />
    </>
  );
}
