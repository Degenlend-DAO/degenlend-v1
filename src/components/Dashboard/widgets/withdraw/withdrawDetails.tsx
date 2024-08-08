import { Box } from "@mui/material";
import SupplyRates from "../supply/supplyRates";
import BorrowLimit from "../borrow/borrowLimit";
import WithdrawButton from "./withdrawButton";


interface DetailProps {
    type: String,
    supplyAPY: number,
    borrowLimit: number,
    borrowLimitUsed: number,
    supplyBalance: number,
}

function WithdrawDetails(props: DetailProps) {

    const { type, supplyAPY, supplyBalance, borrowLimit, borrowLimitUsed } = props

    return (
        <Box sx={{width: "100%", alignContent: "center",}}>
            
        {/* Supply Rates */}

        <SupplyRates type={type} supplyAPY={supplyAPY} />

        {/* Borrow APY */}

        <BorrowLimit type={type} borrowLimit={borrowLimit} borrowLimitUsed={borrowLimitUsed}  />

        {/* Enable Button */}

        <WithdrawButton type={type} supplyBalance={supplyBalance} />

        </Box>
    );
}

export default WithdrawDetails;