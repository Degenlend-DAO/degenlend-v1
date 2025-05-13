import { Box, Button, Stack, Divider, Typography } from "@mui/material";
import BorrowRates from "../borrow/borrowRates";
import RepayButton from "./repayButton";


interface DetailProps {
    type: "usdc" | "sx",
    borrowAPY: number,
    borrowBalance: number,
    isRepayingEnabled: boolean,
}

function RepayDetails(props: DetailProps) {
       const { type, borrowAPY, borrowBalance, isRepayingEnabled } = props
       let enabled;
       isRepayingEnabled ? enabled = true : enabled = false;
    return (
        <Box sx={{width: "100%", alignItems: "center", alignContent: "center" }}>
            
            {/* Borrow Rates */}
            
            <BorrowRates type={type} borrowAPY={borrowAPY}  />
            
            {/* Button */}

            <RepayButton type={type} borrowBalance={borrowBalance} isRepayingEnabled={false} />

        </Box>
    );
}

export default RepayDetails;