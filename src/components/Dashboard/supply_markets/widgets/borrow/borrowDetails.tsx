import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import BorrowRates from "./borrowRates";

interface DetailsProps {
    type: String,
    borrowAPY: number,
    borrowBalance: number
}

function BorrowDetails(props:DetailsProps) {

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        <Stack direction="column" alignItems={"center"} justifyContent={"space-between"}>

        {/* Borrow Rates */}

        <BorrowRates type={props.type} borrowAPY={props.borrowAPY} />

        {/* Borrow Limit */}

        <Typography> Borrow Balance </Typography>
        <Divider></Divider>
        <Typography> Borrow Limit Used </Typography>

        <Button variant="contained" disabled>Borrow Limit Reached</Button>
        <Typography>Currently Borrowing: </Typography>
        </Stack>
      </Box>
    );
}

export default BorrowDetails;