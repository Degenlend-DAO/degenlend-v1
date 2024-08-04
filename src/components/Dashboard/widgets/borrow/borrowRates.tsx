import { Box, Divider, Stack, Typography } from "@mui/material";
import sxTokenLogo from "../../../../assets/img/sx_coin_token.png";
import usdcTokenLogo from "../../../../assets/img/usdc_coin_token.png";


interface BorrowRatesProps {
    type: String;      // The Borrow Rates type
    borrowAPY: number; // The APY rate to display
    // walletBalance: number; // The wallet balance to display
}

function BorrowRates(props:BorrowRatesProps) {
    let tokenLogo;
    if (props.type === "sx" || props.type === "SX")
        { tokenLogo = sxTokenLogo } else
    if (props.type === "usdc" || props.type === "USDC")
        { tokenLogo = usdcTokenLogo }

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Borrow Rates</Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
              component="img"
              src={tokenLogo}
              alt={`${props.type} Logo`}
              sx={{ height: 24, width: 24 }}
            ></Box>
                    <Typography variant="body2" color="textSecondary">Borrow APY</Typography>
                </Stack>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{props.borrowAPY.toFixed(2)}%</Typography>
            </Stack>
      </Box>
    );
}

export default BorrowRates;