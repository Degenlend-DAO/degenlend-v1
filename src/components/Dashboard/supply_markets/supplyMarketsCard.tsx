import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import USDCMarketDialog from './usdcSupplyMarketDialog';
import WSXMarketDialog from './wsxSupplyMarketDialog';

import { Box, Button, Container, InputAdornment, Paper, Switch, TableContainer, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

// Token Logos
import sxTokenLogo from '../../../assets/img/sx_coin_token.png'
import usdcTokenLogo from '../../../assets/img/usdc_coin_token.png'

// Action Items
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/Store';

import EnableMarketDialog from './enableCollateralDialog'
import { MouseEvent } from 'react';

export default function SupplyMarkets() {


    // These values are grabbed directly from the blockchain
    const usdcSupplyAPY = useSelector((state: RootState) => state.usdc.supplyRate);
    const usdcWalletBalance = useSelector((state: RootState) => state.usdc.walletBalance);;
    const usdcOraclePrice = useSelector((state: RootState) => state.usdc.oraclePrice);

    const wsxSupplyAPY = useSelector((state: RootState) => state.wsx.supplyRate);
    const wsxWalletBalance = useSelector((state: RootState) => state.wsx.walletBalance);
    const wsxOraclePrice = useSelector((state: RootState) => state.wsx.oraclePrice);

    function handleRowClick(event:React.MouseEvent) {
        alert('Clicked on the row!')
    }
    const handleSwitchClick= (event: React.MouseEvent) => {
        event.stopPropagation();
        alert('Clicked on the switch!')

      };
    

    return(
        <>
        <TableContainer component={Paper}>
            <Table size='medium'>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant='h6'>Supply Markets</Typography>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer><Table size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell> Asset </TableCell>
                        <TableCell> Supply APY </TableCell>
                        <TableCell> Wallet Balance </TableCell>
                        <TableCell> Collateral </TableCell>
                        <TableCell> Oracle Price </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Wrapped SX Market Details */}
                    <TableRow  hover onClick={(event) => {handleRowClick(event)}}>
                        <TableCell>
                            <Box
                                component="img"
                                sx={{ height: 30, width: 35 }}
                                alt={`Wrapped SX Logo`}
                                src={sxTokenLogo}>
                            </Box>
                        </TableCell>
                        <TableCell>
                            {wsxSupplyAPY}%
                        </TableCell>
                        <TableCell>
                            {wsxWalletBalance} WSX
                        </TableCell>
                        <TableCell>
                            <Switch color='primary' onClick={(event) => {handleSwitchClick(event)}} /> 
                        </TableCell>
                        <TableCell>
                            {wsxOraclePrice}
                        </TableCell>
                    </TableRow>
                    {/* USDC Market Details */}
                    <TableRow hover onClick={(event) => {handleRowClick(event)}}>
                        <TableCell>
                            <Box
                                component="img"
                                sx={{ height: 35, width: 35 }}
                                alt={`USDC Logo`}
                                src={usdcTokenLogo}>
                            </Box>
                        </TableCell>
                        <TableCell>
                            {usdcSupplyAPY}%
                        </TableCell>
                        <TableCell>
                            {usdcWalletBalance} USDC
                        </TableCell>
                        <TableCell >
                        <Switch color='primary' onClick={(event) => {handleSwitchClick(event)}} /> 
                        </TableCell>
                        <TableCell>
                            {usdcOraclePrice}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table></>
    );
}