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
  isInput?: boolean;
  isSupplyingEnabled?: boolean;
}

function SupplyMarketsHeader(props: SupplyMarketsHeaderProps) {

  const { type, isInput, isSupplyingEnabled } = props;

  let SupplyMarkets:JSX.Element = <Box></Box>;


  if (isInput === undefined || isInput === false) {
    SupplyMarkets = <EnableWarning type={type} />
}

if (isInput === true || isSupplyingEnabled === true) {
    SupplyMarkets = <NumberInput type={type} />
}

  return (
    <Box>
      {SupplyMarkets}
    </Box>
  );
}

export default SupplyMarketsHeader;
