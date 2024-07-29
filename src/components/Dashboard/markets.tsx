import { Box, Button, Container, InputAdornment, Paper, Switch, TableContainer, TextField, Typography } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

// Action Items
import BorrowMarkets from './borrow_markets/borrowMarketsCard';
import SupplyMarkets from './supply_markets/supplyMarketsCard';


function Markets() {

    //  This react fragment holds the supply & borrow markets tables in one container

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                // pb: { xs: 8, sm: 12 },
            }} >
            {/* <CustomBarChart /> */}
            <Grid container spacing={6} columns={16} justifyContent="space-evenly" alignItems="stretch">
            <Grid xs>
                <SupplyMarkets />
            </Grid>
            <Grid xs>
                <BorrowMarkets />
            </Grid>
            </Grid>
        </Container>
    )
}

export default Markets