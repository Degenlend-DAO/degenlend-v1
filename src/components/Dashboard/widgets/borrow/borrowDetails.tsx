import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import BorrowRates from "./borrowRates";
import BorrowLimit from "./borrowLimit";
import BorrowButton from "./borrowButton";

interface DetailsProps {
    type: String,
    borrowAPY: number,
    borrowBalance: number,
    borrowLimit: number,
    borrowLimitUsed: number
}

function BorrowDetails(props:DetailsProps) {

    const { type, borrowAPY, borrowBalance, borrowLimit, borrowLimitUsed } = props;

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        <Stack direction="column" alignItems={"center"} justifyContent={"space-between"}>

        {/* Borrow Rates */}

        <BorrowRates type={type} borrowAPY={borrowAPY} />

        {/* Borrow Limit */}

        <BorrowLimit type={type} borrowLimit={borrowLimit} borrowLimitUsed={borrowLimitUsed} />

        {/* Borrow Button */}

        <BorrowButton type={type} BorrowBalance={borrowBalance} />

        </Stack>
      </Box>
    );
}

export default BorrowDetails;