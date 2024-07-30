import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import SupplyRates from "./supplyRates";

interface DetailsProps {
    type: String,
    supplyAPY: number
}

function SupplyDetails(props: DetailsProps) {
       const {type, supplyAPY } = props;
    return (
        <Box sx={{ width: "100%", padding: "3%"}}>

        {/* Supply Rates */}

        {/* Enable Button */}

        </Box>
    );
}

export default SupplyDetails;