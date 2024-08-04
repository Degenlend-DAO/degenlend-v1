import { Box } from "@mui/material";
import SupplyRates from "../supply/supplyRates";
import BorrowLimit from "../borrow/borrowLimit";
import WithdrawButton from "./withdrawButton";


interface DetailProps {
    type: String,
    supplyAPY: number,
    borrowAPY: number,
    supplyBalance: number,
}

function WithdrawDetails(props: DetailProps) {

    const { type, supplyAPY, supplyBalance } = props

    return (
        <Box sx={{width: "100%", alignContent: "center",}}>
            
        {/* Supply Rates */}

        <SupplyRates type={type} supplyAPY={supplyAPY} />

        {/* Borrow APY */}

        <BorrowLimit type={type} borrowLimit={"0"} borrowLimitUsed={"0"}  />

        {/* Enable Button */}

        <WithdrawButton type={type} supplyBalance={supplyBalance} />

        </Box>
    );
}

export default WithdrawDetails;