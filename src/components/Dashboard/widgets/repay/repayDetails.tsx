import { Box, Button, Stack, Divider, Typography } from "@mui/material";
import BorrowRates from "../borrow/borrowRates";
import RepayButton from "./repayButton";


interface DetailProps {
    type: string,
    borrowAPY: number,
    borrowBalance: number,
}

function RepayDetails(props: DetailProps) {
       const { type, borrowAPY, borrowBalance } = props
    return (
        <Box sx={{width: "100%", alignItems: "center", alignContent: "center" }}>
            
            {/* Borrow Rates */}
            
            <BorrowRates type={type} borrowAPY={borrowAPY}  />
            
            {/* Button */}

            <RepayButton type={type} borrowBalance={borrowBalance} />

        </Box>
    );
}

export default RepayDetails;