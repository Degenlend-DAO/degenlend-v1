import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Title } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';

// Generate Markets Data
function createData (
    id: number,
    name: string,
    tokenString: string,
    supplyAPY: number,
    borrowAPY: number,
    walletBalance: number,
    collateral: boolean,
) {
    return {
        id,
        name,
        tokenString,
        supplyAPY,
        borrowAPY,
        walletBalance,
        collateral
    }
};

const activeMarkets = [
    createData(
        0,
        'SX Token',
        '0x0000000000000000',
        0.00,
        0.00,
        0.00,
        false
    ),
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
        <Title>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
        </Title>
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
                                {market.name}
                            </TableCell>
                            <TableCell>
                                {market.tokenString}
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
                                {market.collateral}
                            </TableCell>
                        </TableRow>
                    ))}
                
            </TableBody>
        </Table>
            </Container>
    )
}


export default Markets