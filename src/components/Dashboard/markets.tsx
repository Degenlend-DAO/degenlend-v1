import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Container, Switch } from '@mui/material';

// Token Logos
import sxTokenLogo from '../../assets/img/sx_coin_token.png'
import usdcTokenLogo from '../../assets/img/usdc_coin_token.png'
import CustomBarChart from './MarketSupplyChart';

// Action Items
import { useDispatch, useSelector } from 'react-redux';

// Generate Markets Data
function createData(
    id: number,
    name: string,
    img: string,
    tokenString: string,
    supplyAPY: number,
    borrowAPY: number,
    walletBalance: number,
    collateral: boolean,
    oraclePrice: number,
) {
    return {
        id,
        name,
        img,
        tokenString,
        supplyAPY,
        borrowAPY,
        walletBalance,
        collateral,
        oraclePrice,
    }
};

// New market details have to be listed here
const activeMarkets = [
    createData(
        0,
        'SX Token',
        'sxTokenLogo',
        '0x0000000000000000',
        2.00,
        5.00,
        4000,
        false,
        0.10
    ),
    createData(
        0,
        'USDC Token',
        'usdcTokenLogo',
        '0x000000000000000000',
        2.00,
        5.00,
        100000,
        true,
        1.00
    )
];


function Markets() {

    const usdcSupplyAPY = 0;
    const usdcBorrowAPY = 0;
    const usdcWalletBalance = 0;
    const usdcCollateral = true;
    const usdcOraclePrice = 0;

    const wsxSupplyAPY = 0;
    const wsxBorrowAPY = 0;
    const wsxWalletBalance = 0;
    const wsxCollateral = false;
    const wsxOraclePrice = 0;

    const toggleWSXCollateral = () => {
        alert(`Toggling WSX from ${wsxCollateral} to ${!wsxCollateral}`)
    }

    const toggleUSDCCollateral = () => {
        alert(`Toggling USDC from ${usdcCollateral} to ${!usdcCollateral}`)
    }

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
            }} >
            <CustomBarChart />
            <Table size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell> Asset </TableCell>
                        <TableCell> Supply APY </TableCell>
                        <TableCell> Borrow APY </TableCell>
                        <TableCell> Wallet Balance </TableCell>
                        <TableCell> Collateral </TableCell>
                        <TableCell> Oracle Price </TableCell>
                        <TableCell> Supply / Borrow</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>


                    {/* Wrapped SX Market Details */}
                    <TableRow>
                        <TableCell>
                            <Box 
                                component="img"
                                sx={{ height: 30, width: 35}}
                                alt={`Wrapped SX Logo`}
                                src={sxTokenLogo}>  
                            </Box>
                        </TableCell>
                        <TableCell>
                            {wsxSupplyAPY}%
                        </TableCell>
                        <TableCell>
                            {wsxBorrowAPY}%
                        </TableCell>
                        <TableCell>
                            {wsxWalletBalance} WSX
                        </TableCell>
                        <TableCell>
                            <Switch checked={wsxCollateral} onChange={toggleWSXCollateral}/>
                        </TableCell>
                        <TableCell>
                            {wsxOraclePrice}
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => alert(`Supplying and borrowing!`)}>
                                Supply/Borrow
                            </Button>
                        </TableCell>
                    </TableRow>

                    {/* USDC Market Details */}
                    <TableRow>
                    <TableCell>
                            <Box 
                                component="img"
                                sx={{ height: 35, width: 35}}
                                alt={`USDC Logo`}
                                src={usdcTokenLogo}>  
                            </Box>
                        </TableCell>
                        <TableCell>
                            {usdcSupplyAPY}%
                        </TableCell>
                        <TableCell>
                            {usdcBorrowAPY}%
                        </TableCell>
                        <TableCell>
                            {usdcWalletBalance} USDC
                        </TableCell>
                        <TableCell>
                            <Switch checked={usdcCollateral} onChange={toggleUSDCCollateral}/>
                        </TableCell>
                        <TableCell>
                            {usdcOraclePrice}
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => alert(`Supplying and borrowing!`)}>
                                Supply/Borrow
                            </Button>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </Container>
    )
}


export default Markets