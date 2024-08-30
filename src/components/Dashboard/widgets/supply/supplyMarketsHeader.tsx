import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { getTokenDetails } from "../../../../utils/TokenType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/Store";
import EnableWarning from "../enableWarning";
import NumberInput from "../numberinput";


interface SupplyMarketsHeaderProps {
  type: string;
  input?: boolean;
  isSupplyingEnabled?: boolean;
}

function SupplyMarketsHeader(props: SupplyMarketsHeaderProps) {

  const { type, input, isSupplyingEnabled } = props;

  let SupplyMarkets:JSX.Element = <Box></Box>;


  if (input === undefined || input === false) {
    SupplyMarkets = <EnableWarning type={type} />
}

if (input === true || isSupplyingEnabled === true) {
    SupplyMarkets = <NumberInput type={type} />
}

  return (
    <Box>
      {SupplyMarkets}
    </Box>
  );
}

export default SupplyMarketsHeader;
