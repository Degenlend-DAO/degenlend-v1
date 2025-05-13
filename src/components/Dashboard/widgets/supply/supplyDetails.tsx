import { Box } from "@mui/material";
import SupplyRates from "./supplyRates";
import SupplyButton from "./supplyButton";

interface DetailsProps {
    type: "usdc" | "sx",
    supplyAPY: number,
    supplyBalance: number,
    isSupplyingEnabled: boolean | undefined,
}

function SupplyDetails(props: DetailsProps) {
       const {type, supplyAPY, supplyBalance, isSupplyingEnabled } = props;

       let enabledValue;
       isSupplyingEnabled ?  enabledValue = true : enabledValue = false;
    return (
        <Box sx={{ width: "100%", padding: "3%"}}>

        {/* Supply Rates */}
        
        <SupplyRates type={type} supplyAPY={supplyAPY} />
        
        {/* Supply Button */}
        
        <SupplyButton type={type} walletBalance={supplyBalance} isEnabled={enabledValue} />

        </Box>
    );
}

export default SupplyDetails;