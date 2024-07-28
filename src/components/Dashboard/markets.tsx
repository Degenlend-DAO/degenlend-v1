import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Container, InputAdornment, Paper, Switch, TableContainer, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

// Token Logos
import sxTokenLogo from '../../assets/img/sx_coin_token.png'
import usdcTokenLogo from '../../assets/img/usdc_coin_token.png'
import CustomBarChart from './MarketSupplyChart';

// Action Items
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/Store';
import USDCMarketDialog from './supply_markets/usdcSupplyMarketDialog';
import WSXMarketDialog from './supply_markets/wsxSupplyMarketDialog';
import BorrowMarkets from './borrow_markets/borrowMarketsCard';
import SupplyMarkets from './supply_markets/supplyMarketsCard';


function Markets() {

    const dispatch = useDispatch<AppDispatch>();
    // Generate Markets Data

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
            {/* <CustomBarChart /> */}
            <SupplyMarkets />
            <BorrowMarkets />
        </Container>
    )
}

export default Markets