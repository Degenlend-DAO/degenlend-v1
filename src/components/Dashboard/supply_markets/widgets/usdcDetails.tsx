import * as React from "react";
import Button from "@mui/material/Button";
import { Box, Stack, Typography } from "@mui/material";
import usdcTokenLogo from "../../../../assets/img/usdc_coin_token.png";


function USDCDetails() {

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center" , textAlign: 'center', padding: '3%'}}>
        <Stack direction="column" alignItems={"center"} justifyContent={"space-between"}>
          <Box display="flex" alignItems="center">
                <Box
                  component="img"
                  sx={{ height: 50, width: 50, marginRight: 1 }}
                  alt="Wrapped SX Logo"
                  src={usdcTokenLogo}
                />
                {/* <Typography variant="body1">USDC Token</Typography> */}
          </Box>
          <Typography color="text.secondary" variant="body2">
             To Supply or Repay USDC to the Degenlend Protocol, you need to enable it first.
          </Typography>
        </Stack>
      </Box>
    );
}

export default USDCDetails;