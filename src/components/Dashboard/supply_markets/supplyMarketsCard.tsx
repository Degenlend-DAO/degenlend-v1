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
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";
import EnableMarketDialog from "./enableCollateralDialog";
import React from "react";
import USDCSupplyMarketDialog from "./usdcSupplyMarketDialog";

export default function SupplyMarkets() {
  // These values are grabbed directly from the blockchain

  const [open, setOpen] = React.useState(false);

  const usdcSupplyAPY = useSelector(
    (state: RootState) => state.usdc.supplyRate
  );
  const usdcWalletBalance = useSelector(
    (state: RootState) => state.usdc.walletBalance
  );
  const usdcOraclePrice = useSelector(
    (state: RootState) => state.usdc.oraclePrice
  );

  const wsxSupplyAPY = useSelector((state: RootState) => state.wsx.supplyRate);
  const wsxWalletBalance = useSelector(
    (state: RootState) => state.wsx.walletBalance
  );
  const wsxOraclePrice = useSelector(
    (state: RootState) => state.wsx.oraclePrice
  );

  function handleSXRowClick(event: React.MouseEvent) {
    alert("Clicked on the row!");
  }

  function handleUSDCRowClick(event: React.MouseEvent) {
    alert("Clicked on the row!");
  }

  const handleSXSwitchClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    <EnableMarketDialog title={"SX"} type='sx'/>
  };

  const handleUSDCSwitchClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    <EnableMarketDialog title="USDC" type='usdc' />
  };

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
            <TableCell>  APY </TableCell>
            <TableCell>  Balance </TableCell>
            <TableCell> Collateral </TableCell>
            <TableCell>  Price </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Wrapped SX Market Details */}
          <TableRow
            hover
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
            <TableCell>{wsxSupplyAPY}%</TableCell>
            <TableCell>{wsxWalletBalance} WSX</TableCell>
            <TableCell>
                <EnableMarketDialog type='sx' title='Wrapped SX' />
            </TableCell>
            <TableCell>{wsxOraclePrice}</TableCell>
          </TableRow>
          {/* USDC Market Details */}
          <TableRow
            hover
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
            <TableCell>{usdcSupplyAPY}%</TableCell>
            <TableCell>{usdcWalletBalance} USDC</TableCell>
            <TableCell>
            <Box display="flex" alignItems="center">
            </Box>
            </TableCell>
            <TableCell>{usdcOraclePrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>

      {/* Market Dialogs */}
      <EnableMarketDialog type='sx' title='Wrapped SX' />
      <WSXSupplyMarketDialog type='sx'/>
      <USDCSupplyMarketDialog />
    </>
  );
}
