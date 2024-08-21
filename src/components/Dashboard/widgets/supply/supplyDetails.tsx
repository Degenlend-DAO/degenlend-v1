import { Box } from "@mui/material";
import SupplyRates from "./supplyRates";
import SupplyButton from "./supplyButton";

interface DetailsProps {
    type: String,
    supplyAPY: number,
    supplyBalance: number,
}

function SupplyDetails(props: DetailsProps) {
       const {type, supplyAPY, supplyBalance } = props;
    return (
        <Box sx={{ width: "100%", padding: "3%"}}>

        {/* Supply Rates */}
        
        <SupplyRates type={type} supplyAPY={supplyAPY} />
        
        {/* Supply Button */}
        
        <SupplyButton type={type} supplyBalance={supplyBalance} />

        </Box>
    );
}

export default SupplyDetails;