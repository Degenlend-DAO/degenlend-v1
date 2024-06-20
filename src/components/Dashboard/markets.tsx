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


function Markets() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} >
                        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
            </Container>
    )
}


export default Markets