import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Title } from '@mui/icons-material';

// Generate Markets Data
function createData (
    id: number,
    name: string,
    tokenString: string,
    amount: number
) {
    return {
        id,
        name,
        tokenString,
        amount
    }
};


function markets() {
    return (
        <React.Fragment>
            <Title> Markets </Title>
            <Table size='medium'>
            </Table>
        </React.Fragment>
    )
}


export default markets