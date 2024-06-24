import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Title } from '@mui/icons-material';
import { Box, Container, Switch, Typography } from '@mui/material';

// SX Token
import sxTokenLogo from '../../assets/img/sx_coin_token.png'
import usdcTokenLogo from '../../assets/img/usdc_coin_token.png'

// Generate Markets Data
function createData (
    id: number,
    name: string,
    img: string,
    tokenString: string,
    supplyAPY: number,
    borrowAPY: number,
    walletBalance: number,
    collateral: boolean,
) {
    return {
        id,
        name,
        img,
        tokenString,
        supplyAPY,
        borrowAPY,
        walletBalance,
        collateral
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
        false
    ),
    createData(
        0,
        'USDC Token',
        'usdcTokenLogo',
        '0x000000000000000000',
        2.00,
        5.00,
        100000,
        true
    )
];


function Markets() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
            }} >
        {/* <Title>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Markets
        </Typography>
        </Title> */}
        <Table size='medium'>
            <TableHead>
                <TableRow>
                    <TableCell> Asset </TableCell>
                    <TableCell> Supply APY </TableCell>
                    <TableCell> Borrow APY </TableCell>
                    <TableCell> Wallet Balance </TableCell>
                    <TableCell> Collateral </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                
                    {activeMarkets.map(market => (
                        <TableRow key={market.id}>
                            <TableCell>
                            <Box
                                component="img"
                                sx={{
                                    height: 20,
                                    width: 25,
                                }}
                                alt={`${market.name} Logo`}
                                src={sxTokenLogo}
                            /> {market.name}
                            </TableCell>
                            <TableCell>
                                {market.supplyAPY}
                            </TableCell>
                            <TableCell>
                                {market.borrowAPY}
                            </TableCell>
                            <TableCell>
                                {market.walletBalance}
                            </TableCell>
                            <TableCell>
                                <Switch />
                            </TableCell>
                        </TableRow>
                    ))}
                
            </TableBody>
        </Table>
            </Container>
    )
}


export default Markets