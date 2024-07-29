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

export default function SupplyMarkets() {

    const toggleWSXCollateral = () => {
        alert(`Toggling WSX from ${wsxCollateral} to ${!wsxCollateral}`)
        // This function will trigger a modal window for toggle 
        
    }

    const toggleUSDCCollateral = () => {
        alert(`Toggling USDC from ${usdcCollateral} to ${!usdcCollateral}`)
        // THis function will trigger a modal window for toggling collateral 
    }

    const usdcSupplyAPY = useSelector((state: RootState) => state.usdc.supplyRate);
    const usdcBorrowAPY = useSelector((state: RootState) => state.usdc.borrowRate);;
    const usdcWalletBalance = useSelector((state: RootState) => state.usdc.walletBalance);;
    const usdcCollateral = useSelector((state: RootState) => state.usdc.isCollateral);
    const usdcOraclePrice = useSelector((state: RootState) => state.usdc.oraclePrice);

    const wsxSupplyAPY = useSelector((state: RootState) => state.wsx.supplyRate);
    const wsxBorrowAPY = useSelector((state: RootState) => state.wsx.borrowRate);
    const wsxWalletBalance = useSelector((state: RootState) => state.wsx.walletBalance);
    const wsxCollateral = useSelector((state: RootState) => state.wsx.isCollateral);
    const wsxOraclePrice = useSelector((state: RootState) => state.wsx.oraclePrice);

    return(
        <>
        <TableContainer component={Paper}>
            <Table size='medium'>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant='h5'>Supply Markets</Typography>
                                <TextField
                                    placeholder="Search By Market"
                                    type="search"
                                    variant="filled"
                                    size='small'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <Search />
                                            </InputAdornment>
                                        )
                                    }} />
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
                        <TableCell> Supply / Withdraw </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Wrapped SX Market Details */}
<Button>
<TableRow>
                        <TableCell>
                            <Box
                                component="img"
                                sx={{ height: 30, width: 35 }}
                                alt={`Wrapped SX Logo`}
                                src={sxTokenLogo}>
                            </Box>
                            SX Token
                        </TableCell>
                        <TableCell>
                            {wsxSupplyAPY}%
                        </TableCell>
                        <TableCell>
                            {wsxWalletBalance} WSX
                        </TableCell>
                        <TableCell>
                                    <EnableMarketDialog /> 
                        </TableCell>
                        <TableCell>
                            {wsxOraclePrice}
                        </TableCell>
                        <TableCell>
                            <WSXMarketDialog />
                        </TableCell>
                    </TableRow>
</Button>
                    {/* USDC Market Details */}
                    <TableRow>
                        <Button>
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
                        <TableCell>
                            <Switch checked={usdcCollateral} onChange={toggleUSDCCollateral} />
                        </TableCell>
                        <TableCell>
                            {usdcOraclePrice}
                        </TableCell>
                        <TableCell>
                            {/* Dialog */}
                            <USDCMarketDialog />
                        </TableCell>
                        </Button>
                    </TableRow>
                </TableBody>
            </Table></>
    );
}