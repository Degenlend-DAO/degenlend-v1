import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Box, Paper, TableContainer, Typography } from "@mui/material";

// Token Logos
import sxTokenLogo from "../../../assets/img/sx_coin_token.png";
import usdcTokenLogo from "../../../assets/img/usdc_coin_token.png";

// Action Items
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";
import WSXBorrowMarketDialog from "./wsxBorrowMarketDialog";
import USDCBorrowMarketDialog from "./usdcBorrowMarketDialog";

export default function BorrowMarkets() {
  const [borrowSXDialogOpen, setBorrowSXDialogOpen] = React.useState(false);
  const [borrowUSDCDialogOpen, setBorrowUSDCDialogOpen] = React.useState(false);

  const usdcBorrowAPY = useSelector(
    (state: RootState) => state.usdc.borrowRate
  );
  const usdcWalletBalance = useSelector(
    (state: RootState) => state.usdc.balance
  );
  const usdcOraclePrice = useSelector(
    (state: RootState) => state.usdc.oraclePrice
  );

  const wsxBorrowAPY = useSelector((state: RootState) => state.wsx.borrowRate);
  const wsxWalletBalance = useSelector(
    (state: RootState) => state.wsx.balance
  );
  const wsxOraclePrice = useSelector(
    (state: RootState) => state.wsx.oraclePrice
  );

  function handleSXRowClick(event: React.MouseEvent) {
    setBorrowSXDialogOpen(true);
  }

  function handleUSDCRowClick(event: React.MouseEvent) {
    setBorrowUSDCDialogOpen(true);
  }

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
                  <Typography variant="h6">Borrow Markets</Typography>
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
              <TableCell> Liquidity </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Wrapped SX Market Details */}
            <TableRow
              hover
              sx={{ cursor: 'pointer' }}
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
              <TableCell>{wsxBorrowAPY}%</TableCell>
              <TableCell>{wsxWalletBalance} WSX</TableCell>
              <TableCell>{wsxOraclePrice}</TableCell>
            </TableRow>
            {/* USDC Market Details */}
            <TableRow
              hover
              sx={{ cursor: 'pointer' }}
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
              <TableCell>{usdcBorrowAPY}%</TableCell>
              <TableCell>{usdcWalletBalance} USDC</TableCell>
              <TableCell>{usdcOraclePrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <WSXBorrowMarketDialog open={borrowSXDialogOpen} onClose={() => { setBorrowSXDialogOpen(false) }} title={"Wrapped SX"} />
      <USDCBorrowMarketDialog open={borrowUSDCDialogOpen} onClose={() => { setBorrowUSDCDialogOpen(false) }} title={"USDC"} />
    </>
  );
}
