import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { getTokenDetails } from "../../../utils/TokenType";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";

interface SupplyHeaderProps {
  type: string;
}

function SupplyHeader(props: SupplyHeaderProps) {
  let tokenLogo;
  let tokenText;
  let isEnabled;

  const isUSDCEnabled = useSelector(
    (state: RootState) => state.usdc.isEnabled
  );

  const isWSXEnabled = useSelector(
    (state: RootState) => state.wsx.isEnabled
  );;


  const details = getTokenDetails(props.type);

  if (details) {
    tokenLogo = details.logo;
    tokenText = details.text;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "40%",
        alignItems: "center",
        textAlign: "center",
        padding: "3%",
      }}
    >
      <Stack
        direction="column"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            sx={{ height: 50, width: 50, marginRight: 1 }}
            alt={`${props.type} Logo`}
            src={tokenLogo}
          />
          {/* <Typography variant="body1">WSX Token</Typography> */}
        </Box>
        <Typography color="text.secondary" variant="body2">
          Enter the amount of {tokenText} you'd like to supply / repay to the
          Degenlend Protocol.
        </Typography>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Input
            id="standard-adornment-amount"
            endAdornment={
              <InputAdornment position="end">{props.type}</InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
      </Stack>
    </Box>
  );
}

export default SupplyHeader;
