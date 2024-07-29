import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import USDCMarketDialog from './usdcBorrowMarketDialog';
import WSXMarketDialog from './wsxBorrowMarketDialog';

import { Box, Button, Container, InputAdornment, Paper, Switch, TableContainer, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

// Token Logos
import sxTokenLogo from '../../../assets/img/sx_coin_token.png'
import usdcTokenLogo from '../../../assets/img/usdc_coin_token.png'

// Action Items
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/Store';

export default function BorrowMarkets() {

    const usdcBorrowAPY = useSelector((state: RootState) => state.usdc.borrowRate);;
    const usdcWalletBalance = useSelector((state: RootState) => state.usdc.walletBalance);;
    const usdcOraclePrice = useSelector((state: RootState) => state.usdc.oraclePrice);

    const wsxBorrowAPY = useSelector((state: RootState) => state.wsx.borrowRate);
    const wsxWalletBalance = useSelector((state: RootState) => state.wsx.walletBalance);
    const wsxOraclePrice = useSelector((state: RootState) => state.wsx.oraclePrice);

    function handleRowClick(event:React.MouseEvent) {
        alert('Clicked on the row!')
    }

    return(
        <>
        <TableContainer component={Paper}>
            <Table size='medium'>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant='h6'>Borrow Markets</Typography>

                            </Box>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer><Table size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell> Asset </TableCell>
                        <TableCell> Borrow APY </TableCell>
                        <TableCell> Wallet Balance </TableCell>
                        <TableCell> Market Liquidity </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Wrapped SX Market Details */}
                    <TableRow hover onClick={(event) => {handleRowClick(event)}}>
                        <TableCell>
                            <Box
                                component="img"
                                sx={{ height: 30, width: 35 }}
                                alt={`Wrapped SX Logo`}
                                src={sxTokenLogo}>
                            </Box>
                        </TableCell>
                        <TableCell>
                            {wsxBorrowAPY}%
                        </TableCell>
                        <TableCell>
                            {wsxWalletBalance} WSX
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
                            {usdcBorrowAPY}%
                        </TableCell>
                        <TableCell>
                            {usdcWalletBalance} USDC
                        </TableCell>
                        <TableCell>
                            {usdcOraclePrice}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table></>
    );
}