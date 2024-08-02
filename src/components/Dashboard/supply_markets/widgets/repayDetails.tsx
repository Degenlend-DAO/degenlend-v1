import { Box, Button, Stack, Divider, Typography } from "@mui/material";
import BorrowRates from "./borrow/borrowRates";


interface DetailProps {
    type: String,
    borrowAPY: number
}

function RepayDetails(props: DetailProps) {
       const { type, borrowAPY } = props
    return (
        <Box sx={{width: "100%", alignItems: "center", textAlign: 'center', padding: "3%"}}>
            
            {/* Borrow Rates */}
            <BorrowRates type={props.type} borrowAPY={props.borrowAPY}  />
            {/* Button */}

        </Box>
    );
}

export default RepayDetails;