import { Box, Stack, Typography } from "@mui/material";
import { getTokenDetails } from "../../../utils/TokenType";

interface EnableWarningProps {
    type: string,
}

function EnableWarning(props: EnableWarningProps) {
    let tokenLogo;
    let tokenText;

    const details = getTokenDetails(props.type)

    if (details) {
        tokenLogo = details.logo
        tokenText = details.text
    }

    return (
        <Box sx={{ width: "100%", height: "40%", alignItems: "center", textAlign: 'center', padding: '3%' }}>
            <Stack direction="column" alignItems={"center"} justifyContent={"space-between"}>
                <Box display="flex" alignItems="center">
                    <Box
                        component="img"
                        sx={{ height: 50, width: 50, marginRight: 1 }}
                        alt="Wrapped SX Logo"
                        src={tokenLogo}
                    />
                    {/* <Typography variant="body1">WSX Token</Typography> */}
                </Box>
                <Typography color="text.secondary" variant="body2">
                    To Supply or Repay {tokenText} to the Degenlend Protocol, you need to enable it first.
                </Typography>
            </Stack>
        </Box>
    );
}

export default EnableWarning;